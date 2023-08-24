import { PaletteMode } from '@mui/material'

export const theme = {
  primary: {
    main: '#6e4738',
  },
  secondary: {
    main: '#FFC107',
  },
  success: {
    main: '#CDDC39',
  },
  background: {
    paper: '#fff',
    default: '#fff',
  },
}

export const darkTheme = {
  primary: {
    main: '#ffe4da',
  },
  secondary: {
    main: '#FFC107',
  },
  success: {
    main: '#CDDC39',
  },
  background: {
    paper: 'transparent',
    default: '#6e4738',
  },
}

export const getDesignTokens = (mode: PaletteMode) => ({
  palette: {
    mode,
    ...(mode === 'light' ? theme : darkTheme),
  },
})
