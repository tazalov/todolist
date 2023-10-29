import LoginPage from './LoginPage'

import { StoreDecorator } from 'shared/config/storybook/decorators/StoreDecorator'

import type { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof LoginPage> = {
  title: 'pages/LoginPage',
  component: LoginPage,
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [
    StoreDecorator({
      auth: {
        data: null,
      },
    }),
  ],
}

export default meta
type Story = StoryObj<typeof LoginPage>

export const Demo: Story = {}
