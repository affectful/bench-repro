
import { TableEmotionWeb } from './TableEmotionWeb'
import { TableReactWeb } from './TableReactWeb'
import { TableStyledComponentsWeb } from './TableStyledComponentsWeb'
import { tableVariants as nativeVariants } from './tableVariants.native'


export const tableVariants = {
  'react-web': TableReactWeb,
  'emotion-web': TableEmotionWeb,
  'styled-components-web': TableStyledComponentsWeb,

  ...nativeVariants,
}