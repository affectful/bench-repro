
import { TableEmotion } from './TableEmotion'
import { TableReactNative } from './TableReactNative'
import { TableReactStrictDom } from './TableReactStrictDom'
import { TableRnCss } from './TableRnCss'
import { TableStyledComponents } from './TableStyledComponents'
import { TableTamagui } from './TableTamagui'

export const tableVariants = {
  'react-strict-dom': TableReactStrictDom,
  'react-native': TableReactNative,
  tamagui: TableTamagui,
  // unistyles: TableUnistyles,
  emotion: TableEmotion,
  'styled-components': TableStyledComponents,
  'rn-css': TableRnCss,
  // 'styled-components-wr': TableStyledComponentsWrapped,
}

