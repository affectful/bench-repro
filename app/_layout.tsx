import '@/code/global.css'

import { TableBenchmark } from '@/components/Tables/TableBenchmark'
import { DefaultTheme, ThemeProvider } from '@react-navigation/native'
import { StatusBar } from 'expo-status-bar'
import { verifyInstallation } from 'nativewind'
import { View } from 'react-native'
import 'react-native-reanimated'

export default function RootLayout() {
  verifyInstallation()
  return (
    <ThemeProvider value={DefaultTheme}>
      <View style={{ padding: 20, flex: 1, backgroundColor: 'white' }}>
        <TableBenchmark />
      </View>
      <StatusBar style="auto" />
    </ThemeProvider>
  )
}
