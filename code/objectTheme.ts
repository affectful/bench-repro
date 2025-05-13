
export const lightTheme = {
  colors: {
    primary: '#ff1ff4',
    secondary: '#1ff4ff',
    green: 'darkgreen',
    grayBg: '#eee',
    grayBgHover: '#ccc',
    border: '#ccc',
    // any nesting, spreading, arrays, etc.
  },
  space: {
    rowPadding: 16,
    '$0.5': 2,
    '$1': 4,
    '$2': 6,
    '$3': 8,
    '$4': 10,
    '$5': 12,
    '$6': 14,
    '$7': 16,
    '$8': 18,
    '$9': 20,
    '$10': 22,
  },
  radii: {
    '$2_5': 6,
  },
  fonts: {
    size: {
      '$0.5': 5,
      '$1': 10,
      '$2': 12,
      '$3': 14,
      '$4': 16,
      '$5': 18,
      '$6': 20,
      '$7': 22,
      '$8': 26,
      '$9': 32,
      '$10': 38,
    }
  },
  // functions, external imports, etc.
  gap: (v: number) => v * 8,
}

export type Theme = typeof lightTheme
export type BaseTheme = typeof lightTheme


declare module '@emotion/react' {
  export interface Theme extends BaseTheme {}
}

declare module 'styled-components/native' {
  export interface DefaultTheme extends BaseTheme {}
}

declare module 'styled-components' {
  export interface DefaultTheme extends BaseTheme {}
}

declare module 'rn-css' {
  export interface DefaultTheme extends BaseTheme {}
}