import type { Preview } from '@storybook/react'
import { StoreDecorator } from 'shared/config/storybook/decorators/StoreDecorator'
import { withThemeFromJSXProvider } from '@storybook/addon-themes'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { getDesignTokens } from 'app/styles/Theme'
import CssBaseline from '@mui/material/CssBaseline'

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
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
  // @ts-ignore
  decorators: [StoreDecorator, ThemeDecorator],
}

export default preview
