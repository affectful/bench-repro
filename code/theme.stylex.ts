import { css } from 'react-strict-dom'

export const colors = css.defineVars({
  primary: {
    default: '#ff1ff4',
  },
  secondary: {
    default: '#1ff4ff',
  },
  green: {
    default: 'darkgreen',
  },
  grayBg: {
    default: '#eee',
  },
  grayBgHover: {
    default: '#ccc',
  },
  border: {
    default: '#ccc',
  },
})

export const space = css.defineVars({
  rowPadding: {
    default: '16px',
  },
})

export const radii = css.defineVars({
  '$2_5': {
    default: '6px',
  },
})

export const fontSize = css.defineVars({
  '$0.5': {
    default: 5,
  },
  '$1': {
    default: 10,
  },
  '$2': {
    default: 12,
  },
  '$3': {
    default: 14,
  },
  '$4': {
    default: 16,
  },
  '$5': {
    default: 18,
  },
  '$6': {
    default: 20,
  },
  '$7': {
    default: 22,
  },
  '$8': {
    default: 26,
  },
  '$9': {
    default: 32,
  },
  '$10': {
    default: 38,
  },
})
