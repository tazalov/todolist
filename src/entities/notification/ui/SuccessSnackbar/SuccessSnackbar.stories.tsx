import { SuccessSnackbar } from './SuccessSnackbar'

import { StoreDecorator } from 'shared/config/storybook/decorators/StoreDecorator'

import type { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof SuccessSnackbar> = {
  title: 'entities/Notifications/SuccessSnackbar',
  component: SuccessSnackbar,
  parameters: {
    layout: 'centered',
  },
  decorators: [
    StoreDecorator({
      notification: {
        status: 'succeed',
      },
    }),
  ],
}

export default meta
type Story = StoryObj<typeof SuccessSnackbar>

export const Demo: Story = {}
