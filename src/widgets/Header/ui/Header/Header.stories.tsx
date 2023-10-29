import { Header } from './Header'

import { StoreDecorator } from 'shared/config/storybook/decorators/StoreDecorator'

import type { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof Header> = {
  title: 'widgets/Header',
  component: Header,
  parameters: {
    layout: 'fullscreen',
  },
}

export default meta
type Story = StoryObj<typeof Header>

export const Demo: Story = {
  decorators: [
    StoreDecorator({
      auth: { data: { email: 'some email user' } },
      notification: { status: 'idle' },
    }),
  ],
}
export const Loading: Story = {
  decorators: [
    StoreDecorator({
      auth: { data: { email: 'some email user' } },
      notification: { status: 'loading' },
    }),
  ],
}
