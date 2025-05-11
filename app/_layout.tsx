import { TableBenchmark } from '@/components/Tables/TableBenchmark'
import { DefaultTheme, ThemeProvider } from '@react-navigation/native'
import { StatusBar } from 'expo-status-bar'
import { View } from 'react-native'
import 'react-native-reanimated'

export default function RootLayout() {
  return (
    <ThemeProvider value={DefaultTheme}>
      <View style={{ padding: 20, flex: 1, backgroundColor: 'white' }}>
        <TableBenchmark />
      </View>
      <StatusBar style="auto" />
    </ThemeProvider>
  )
}
