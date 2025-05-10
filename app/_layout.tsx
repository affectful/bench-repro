import { DefaultTheme, ThemeProvider } from '@react-navigation/native'
import { StatusBar } from 'expo-status-bar'
import 'react-native-reanimated'
import { Benchmark } from '@/components/Tables/TableBenchmark'
import { View } from 'react-native'

export default function RootLayout() {
  return (
    <ThemeProvider value={DefaultTheme}>
      <View style={{ padding: 20, flex: 1, backgroundColor: 'white' }}>
        <Benchmark />
      </View>
      <StatusBar style="auto" />
    </ThemeProvider>
  )
}
