import { StyleSheet } from "react-native-unistyles"
import { lightTheme } from "./objectTheme"

type AppThemes = {
  light: typeof lightTheme
}

declare module 'react-native-unistyles' {
  export interface UnistylesThemes extends AppThemes {}
}

StyleSheet.configure({
  settings: {
    initialTheme: 'light'
  },
  themes: {
    light: lightTheme,
    // you can add more themes here
  }
})