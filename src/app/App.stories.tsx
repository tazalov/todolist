import type { Meta, StoryObj } from '@storybook/react'

import { App } from './App'

const meta: Meta<typeof App> = {
  title: 'app/App',
  component: App,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  argTypes: {
    todolist: {
      description: 'Object with todolist info',
      control: 'object',
    },
  },
}

export default meta
type Story = StoryObj<typeof App>

export const Demo: Story = {}
