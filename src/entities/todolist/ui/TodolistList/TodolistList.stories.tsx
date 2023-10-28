import { TodolistList } from './TodolistList'

import type { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof TodolistList> = {
  title: 'entities/Todolist/TodolistList',
  component: TodolistList,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  argTypes: {
    demo: {
      description: 'Flag for render in storybook',
      control: false,
    },
  },
}

export default meta
type Story = StoryObj<typeof TodolistList>

export const Demo: Story = {
  args: {
    demo: true,
  },
}
