export const lightTheme = {
  colors: {
    primary: '#ff1ff4',
    secondary: '#1ff4ff',
    green: 'darkgreen',
    grayBg: '#eee',
    border: '#ccc',
    // any nesting, spreading, arrays, etc.
  },
  space: {
    rowPadding: 16,
  },
  radii: {
    '$2_5': 6,
  },
  // functions, external imports, etc.
  gap: (v: number) => v * 8,
}

export type Theme = typeof lightTheme
export type BaseTheme = typeof lightTheme


declare module '@emotion/react' {
  export interface Theme extends BaseTheme {}
}