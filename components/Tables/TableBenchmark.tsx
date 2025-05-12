import '@/code/global.css'


import { config } from '@/code/tamaguiConfig'
import { ThemeProvider } from '@emotion/react'
import React, { useEffect, useMemo, useRef, useState } from 'react'
import { Button, Platform, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native'
import { ThemeProvider as StyledProvider } from 'styled-components/native'
import { TamaguiProvider } from 'tamagui'

import { lightTheme } from '@/code/objectTheme'
import Clipboard from '@react-native-clipboard/clipboard'
import { SafeAreaView } from 'react-native-safe-area-context'
import { UAParser } from 'ua-parser-js'
import ManualProfiler from '../ManualProfiler'
import dataset from './education_costs.json'
import { TableEmotion } from './TableEmotion'
import { TableNativeWind } from './TableNativeWind'
import { TableReactNative } from './TableReactNative'
import { TableStyledComponents } from './TableStyledComponents'
import { TableTamagui } from './TableTamagui'
import { TableTwrnc } from './TableTwrnc'
import { TableUnistyles } from './TableUnistyles'
import { TableWeb } from './TableWeb'
import { eduColumns } from './utils'

const RUNS_PER_TABLE = 30;

const getEnvironmentInfo = () => {
  const result = UAParser();
  
  if (Platform.select({ web: true, default: false })) {
    return `Browser: ${result.browser.name} ${result.browser.version}, OS: ${result.os.name} ${result.os.version}, Env: ${__DEV__ ? 'DEV' : 'PROD'}`;
  }

  return `Platform: ${Platform.OS}, Version: ${Platform.Version}, Env: ${process.env.NODE_ENV}`;
};


const nativeTableVariants = {
  'react-native': TableReactNative,
  tamagui: TableTamagui,
  unistyles: TableUnistyles,
  emotion: TableEmotion,
  'styled-components': TableStyledComponents,
  nativewind: TableNativeWind,
  twrnc: TableTwrnc,
}

const webTableVariants = {
  web: TableWeb,
  ...nativeTableVariants,
}

const tableVariants = Platform.OS === 'web' ? webTableVariants : nativeTableVariants

const baseVariant = 'react-native'

type Result = Record<string, number>

export const TableBenchmark = () => {
 

  return (
    <StyledProvider theme={lightTheme}>
      <ThemeProvider theme={lightTheme}>
        <TamaguiProvider config={config}>
          <SafeAreaView style={{ flex: 1}}>
            <ScrollView style={{ flex: 1 }} contentContainerStyle={{ flexDirection: 'column', gap: 10 }}>
              <MultiRunBenchmark />
              <SingleRunBenchmark />
            </ScrollView>
          </SafeAreaView>
        </TamaguiProvider>
      </ThemeProvider>
    </StyledProvider>
  )
}

export const SingleRunBenchmark = () => {
  const [variant, setVariant] = useState<keyof typeof tableVariants | null>(null)
  const [renderInfo, setRenderInfo] = useState<string>('')

  let TableVariant: typeof TableReactNative = () => (<></>)
  if (variant) {
    TableVariant = tableVariants[variant]
  }

  const rows = useMemo(() => dataset.slice(0, 100), [])

  const profilerRender = useMemo(() => {
    if (!variant) return null
    return (
      <ManualProfiler
        id={variant}
        onMeasure={(id, duration) => {
          setRenderInfo(`id: ${id} time: ${duration.toFixed(2)}ms`)
        }}
      >
        <ScrollView style={{ flex: 1 }}>
          <TableVariant dataset={rows} />
        </ScrollView>
      </ManualProfiler>
    )
  }, [variant])

  return (
    <>
      <View style={{ flexDirection: 'column', gap: 10 }}>
        {
          Object.keys(tableVariants).map((t) => (
            <Button key={t} onPress={() => setVariant(t as any)} title={t} />
          ))
        }
        <Text style={{ marginBottom: 10 }}>
          {renderInfo}
        </Text>
        {profilerRender}

      </View>
    </>
  )
}

export const MultiRunBenchmark = ({
  runsPerTableVariant = RUNS_PER_TABLE,
}: {
  runsPerTableVariant?: number
}) => {
  const [statusLine, setStatusLine] = useState<string>('Waiting for first render...')
  const [result, setResult] = useState<Result | null>(null)
  const [start, setStart] = useState(false)
  const ROWS = 100
  const COLUMNS = eduColumns.length
  const profilerConfig = useMemo(() => {
    const rows = dataset.slice(0, 100)
    const ret: MultiRunConfig = {}
    for (const [id, TableVariant] of Object.entries(tableVariants)) {
      ret[id] = () => <TableVariant dataset={rows} />
    }
    return ret
  }, [])

  const profilerRender = useMemo(() => {
    if (!start) return null
    return (
      <ProfilerMultiRun
        config={profilerConfig}
        maxRuns={runsPerTableVariant}
        onStatus={(status) => setStatusLine(status)}
        onFinish={(avgMsById) => {
          setStatusLine('')
          setResult(avgMsById)
        }}
      >
      </ProfilerMultiRun>
    )
  }, [start])

  return (
    <View style={{ flex: 1, flexDirection: 'column', gap: 10 }}>
      <Text>
        {`Env: ${__DEV__ ? 'DEV' : 'PROD'}`}
      </Text>
      {!start && <Button title={`Start Multi Run Benchmark`} onPress={() => setStart(true)} />}
      {start && (
        <Text>
          {statusLine}
        </Text>
      )}
      {result && (
        <MarkdownTable
          avgMsById={result}
          description={`${runsPerTableVariant} runs of each table variant at size ${ROWS} x ${COLUMNS}.`}
        />
      )}
      {profilerRender}
    </View>
  )
}

type MultiRunConfig = {
  [id: string]: () => React.ReactNode
}

const ProfilerMultiRun = ({
  config,
  maxRuns,
  onFinish,
  onStatus,
}: {
  config: MultiRunConfig;
  maxRuns: number;
  onFinish: (avgMsById: Result) => void;
  onStatus?: (status: string) => void;
}) => {
  const resultsRef = useRef<Record<string, number[]>>({}); // Store all durations for an ID
  const [currentRunIndex, setCurrentRunIndex] = useState(0);
  const [currentPhase, setCurrentPhase] = useState<'profiling' | 'resetting' | 'finished'>('profiling');
  const [activeId, setActiveId] = useState<string | null>(null);

  // Prepare the sequence of operations
  const runSequence = useMemo(() => {
    const sequence: Array<{ id: string; type: 'profile' | 'reset' }> = [];
    Object.keys(config).forEach((id) => {
      for (let i = 0; i < maxRuns; i++) {
        sequence.push({ id, type: 'profile' });
        sequence.push({ id, type: 'reset' }); // Reset by rendering null
      }
    });
    if (sequence.length > 0) {
        setActiveId(sequence[0].id);
    }
    return sequence;
  }, [config, maxRuns]);

  const currentOp = runSequence[currentRunIndex];

  const handleMeasure = (id: string, duration: number) => {
    if (!resultsRef.current[id]) {
      resultsRef.current[id] = [];
    }
    resultsRef.current[id].push(duration);
    // console.log(`Measured ${id}: ${duration.toFixed(2)}ms`);

    // Move to next operation (which will be a reset or next ID)
    // We need a slight delay to ensure the current render cycle completes
    // and state updates propagate before triggering the next one.
    setTimeout(() => {
        setCurrentRunIndex((prev) => prev + 1);
        setCurrentPhase('resetting'); // Signal that next render is a reset
    }, 0); // Small delay, can be adjusted. 50-100ms might be safer for complex UIs.
  };

  useEffect(() => {
    if (!currentOp) {
      if (currentPhase !== 'finished') {
        // All runs complete, calculate averages
        const avgMsById: Result = {};
        for (const id in resultsRef.current) {
          const durations = resultsRef.current[id];
          avgMsById[id] = durations.reduce((sum, d) => sum + d, 0) / durations.length;
        }
        onFinish(avgMsById);
        setCurrentPhase('finished');
        onStatus?.('Benchmark finished.');
      }
      return;
    }

    const { id, type } = currentOp;
    setActiveId(id); // Update activeId for the view

    if (type === 'profile') {
      onStatus?.(`Profiling ${id} (${(resultsRef.current[id]?.length || 0) + 1}/${maxRuns})...`);
      setCurrentPhase('profiling');
      // The ManualProfiler will render its child and call handleMeasure
    } else if (type === 'reset') {
      // The view will render null, then we schedule the next run.
      // The timeout helps ensure the unmount/null render has a chance to occur.
      setTimeout(() => {
        setCurrentRunIndex((prev) => prev + 1);
        // The next op will set the phase to 'profiling' if it's a profile op
      }, 50); // Delay for reset, adjust as needed
    }
  }, [currentRunIndex, runSequence, onFinish, onStatus, config]); // Re-run when index changes

  if (!currentOp || currentPhase === 'finished') {
    return null; // Or some finished message
  }

  const { id: currentIdToProfile, type: currentType } = currentOp;
  const componentToRender = config[currentIdToProfile]();

  if (currentType === 'profile' && currentPhase === 'profiling') {
    return (
      <ScrollView style={{ height: 200 }}>
        <ManualProfiler id={currentIdToProfile} onMeasure={handleMeasure}>
          {componentToRender}
        </ManualProfiler>
      </ScrollView>
    );
  } else {
    // This renders 'null' during the reset phase effectively, or if not profiling
    // It also covers the brief moment between a measurement and the next run.
    return (
      <ScrollView style={{ height: 200 }}>
        {null}
      </ScrollView>
    );
  }
}

const MarkdownTable = ({ avgMsById, description = '' }: { avgMsById: Record<string, number>, description?: string }) => {
  const baseTime = avgMsById[baseVariant] ?? 1;
  const markdownText = Object.entries(avgMsById)
    .map(([id, avgMs]) => {
      const relative = Math.round(100 * avgMs / baseTime);
      return `| ${padStr(id, 20)} | ${padStr(avgMs.toFixed(2), 15)} | ${padStr(`${relative}%`, 15)} |`;
    })
    .join('\n');

  const environmentInfo = getEnvironmentInfo();
  const fullMarkdownText = `${environmentInfo}\n${description}\n\n`
  + `| ${padStr('Variant', 20)} | ${padStr('Avg (ms)', 15)} | ${padStr('Relative to RN', 15)} |\n`
  + `|${padStr('', 22, '-')}|${padStr('', 17, '-')}|${padStr('', 17, '-')}|\n` + markdownText;

  return (
    <View style={styles.container}>
      <TextInput
        multiline
        editable={false}
        style={styles.textInput}
        value={fullMarkdownText}
      />
      <Button
        onPress={() => Clipboard.setString(fullMarkdownText)}
        title="Copy to clipboard"
      />
    </View>
  );
};

const padStr = (str: string, len: number, padChar = ' ') => {
  const reps = len - str.length
  return str + padChar.repeat(reps > 0 ? reps : 0);
};

const styles = StyleSheet.create({
  header: {
    fontWeight: 'bold',
    flex: 1,
    flexBasis: 0,
  },
  cell: {
    marginBottom: 10,
    flex: 1,
    flexBasis: 0,
  },
  textInput: {
    fontFamily: 'monospace',
    minWidth: 300,
    minHeight: 200,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    padding: 8,
    marginBottom: 16,
    backgroundColor: '#f9f9f9',
  },
  container: {
    position: 'relative',
    padding: 16,
  },
})
