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
  NEW: {
    main: 'rgba(0,0,0,0)',
  },
  IN_PROGRESS: {
    main: 'rgba(48,144,84,0.5)',
  },
  COMPLETED: {
    main: 'rgba(224,84,184,0.3)',
  },
  DRAFT: {
    main: 'rgba(128,128,128,0.3)',
  },
  background: {
    paper: '#F5F8FF',
    default: '#eefffe',
    blocks: '#F5F8FF',
    header: '#018786',
  },
  LOW: {
    main: '#008000',
  },
  MIDDLE: {
    main: '#0000FF',
  },
  HIGH: {
    main: '#FFA500',
  },
  URGENTLY: {
    main: '#FF0000',
  },
  LATER: {
    main: '#808080',
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
  NEW: {
    main: 'rgba(0,0,0,0)',
  },
  IN_PROGRESS: {
    main: 'rgba(68,204,119,0.5)',
  },
  COMPLETED: {
    main: 'rgba(255,116,217,0.3)',
  },
  DRAFT: {
    main: 'rgba(128,128,128,0.3)',
  },
  background: {
    paper: '#2c3f50',
    default: '#14212A',
    blocks: '#2c3f50',
    header: '#2c3f50',
  },
  LOW: {
    main: '#147914',
  },
  MIDDLE: {
    main: '#1e1e9b',
  },
  HIGH: {
    main: '#966712',
  },
  URGENTLY: {
    main: '#a81010',
  },
  LATER: {
    main: '#808080',
  },
}

export const getDesignTokens = (mode: PaletteMode) => ({
  palette: {
    mode,
    ...(mode === 'light' ? theme : darkTheme),
  },
  breakpoints: {
    values: {
      xs: 320,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },
})
