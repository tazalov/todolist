import { PaletteMode } from '@mui/material'

export const theme = {
  primary: {
    main: '#018786',
  },
  secondary: {
    main: '#e054b8',
  },
  error: {
    main: '#b00020',
  },
  warning: {
    main: '#FFC846',
  },
  info: {
    main: '#008fff',
  },
  success: {
    main: '#309054',
  },
  background: {
    paper: '#F5F8FF',
    default: '#eefffe',
    blocks: '#F5F8FF',
    header: '#018786',
  },
}

export const darkTheme = {
  primary: {
    main: '#03dac6',
    contrastText: '#fff',
  },
  secondary: {
    main: '#ff74d9',
  },
  error: {
    main: '#cf6679',
  },
  warning: {
    main: '#FFC846',
  },
  info: {
    main: '#45adff',
  },
  success: {
    main: '#44CC77',
  },
  background: {
    paper: '#2c3f50',
    default: '#14212A',
    blocks: '#2c3f50',
    header: '#2c3f50',
  },
}

export const getDesignTokens = (mode: PaletteMode) => ({
  palette: {
    mode,
    ...(mode === 'light' ? theme : darkTheme),
  },
})
