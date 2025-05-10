import { TableReactNative } from './TableReactNative'
import { memo, Profiler, useMemo, useState } from 'react'
import { Button, View, Text, ScrollView } from 'react-native'
import React from 'react'
import { TableWeb } from './TableWeb'
import { TamaguiProvider } from 'tamagui'
import { config } from '@/code/tamaguiConfig'
import { TableTamagui } from './TableTamagui'
import { TableEmotion } from './TableEmotion'
import { TableUnistyles } from './TableUnistyles'

const stringifyProfilerArray = (
  renderData: Parameters<React.ProfilerProps['onRender']>
) => {
  const [id, phase, actualDuration, baseDuration, startTime, commitTime] =
    renderData.map((d) => (typeof d === 'number' ? d.toFixed(0) : d))
  return `${id}: ${phase} (ms), actual: ${actualDuration}, base: ${baseDuration}` // start: ${startTime}, commit: ${commitTime}`
}

const tableVariants = {
  web: memo(TableWeb),
  native: memo(TableReactNative),
  tamagui: memo(TableTamagui),
  unistyles: memo(TableUnistyles),
  emotion: memo(TableEmotion),
}

type TableVariantKey = keyof typeof tableVariants

export const Benchmark = () => {
  const tableTypes = Object.keys(tableVariants) as unknown as TableVariantKey[]

  const [variant, setVariant] = useState<keyof typeof tableVariants>('native')
  const [benchLines, setBenchLines] = useState<string[]>([])

  const TableVariant = tableVariants[variant]

  const profilerRender = useMemo(() => {
    return (
      <Profiler
        id={variant}
        onRender={(...data) => {
          setBenchLines((lines) => [...lines, stringifyProfilerArray(data)])
        }}
      >
        <ScrollView style={{ flex: 1 }}>
          <TableVariant />
        </ScrollView>
      </Profiler>
    )
  }, [variant])

  return (
    <TamaguiProvider config={config}>
      <View style={{ flex: 1 }}>
        <View style={{ flexDirection: 'column', gap: 8 }}>
          {tableTypes.map((t) => (
            <Button key={t} onPress={() => setVariant(t)} title={t} />
          ))}
        </View>
        {benchLines.map((line, i) => (
          <Text key={i} style={{ marginBottom: 10 }}>
            {line}
          </Text>
        ))}
        {profilerRender}
      </View>
    </TamaguiProvider>
  )
}
