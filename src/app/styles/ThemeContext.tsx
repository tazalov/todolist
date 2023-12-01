import CssBaseline from '@mui/material/CssBaseline'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { createContext, ReactNode, useMemo, useState } from 'react'

import { getDesignTokens } from './Theme'

export const ColorModeContext = createContext({ toggleColorMode: () => {} })

type Props = {
  children: ReactNode
}

export const ThemeContext = ({ children }: Props) => {
  const [mode, setMode] = useState<'light' | 'dark'>('light')
  //! ---------- useMemo return object with key - toggleColorMode and value - callback with setMode
  const colorMode = useMemo(
    () => ({ toggleColorMode: () => setMode((prev) => (prev === 'light' ? 'dark' : 'light')) }),
    [],
  )

  const appTheme = useMemo(() => createTheme(getDesignTokens(mode)), [mode])
  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={appTheme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ColorModeContext.Provider>
  )
}
