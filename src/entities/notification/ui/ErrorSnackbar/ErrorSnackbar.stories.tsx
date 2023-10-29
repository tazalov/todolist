import { ErrorSnackbar } from './ErrorSnackbar'

import { StoreDecorator } from 'shared/config/storybook/decorators/StoreDecorator'

import type { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof ErrorSnackbar> = {
  title: 'entities/Notifications/ErrorSnackbar',
  component: ErrorSnackbar,
  parameters: {
    layout: 'centered',
  },
  decorators: [
    StoreDecorator({
      notification: {
        error: 'some error message (autohide 6s)',
      },
    }),
  ],
}

export default meta
type Story = StoryObj<typeof ErrorSnackbar>

export const Demo: Story = {}
