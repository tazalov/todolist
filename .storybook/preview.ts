import type { Preview } from '@storybook/react'
import { StoreDecorator } from '../src/utils/storybook/decorators/StoreDecorator'

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
  decorators: [StoreDecorator]
}

export default preview
