import { LoginForm } from './LoginForm'

import type { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof LoginForm> = {
  title: 'features/LoginForm',
  component: LoginForm,
  parameters: {
    layout: 'centered',
  },
}

export default meta
type Story = StoryObj<typeof LoginForm>

export const Demo: Story = {}
