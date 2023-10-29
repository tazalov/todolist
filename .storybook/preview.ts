import type { Preview } from '@storybook/react'
import { withThemeFromJSXProvider } from '@storybook/addon-themes'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { getDesignTokens } from 'app/styles/Theme'
import CssBaseline from '@mui/material/CssBaseline'
import { StoreDecorator } from '../src/shared/config/storybook/decorators/StoreDecorator'
import { RouterDecorator } from '../src/shared/config/storybook/decorators/RouterDecorator'

const ThemeDecorator = withThemeFromJSXProvider({
  themes: {
    light: createTheme(getDesignTokens('light')),
    dark: createTheme(getDesignTokens('dark')),
  },
  defaultTheme: 'light',
  Provider: ThemeProvider,
  GlobalStyles: CssBaseline,
})

const preview: Preview = {
  // @ts-ignore
  decorators: [StoreDecorator({}), RouterDecorator, ThemeDecorator],
}

export default preview
