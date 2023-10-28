import { CreateTodolistForm } from './CreateTodolistForm'

import type { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof CreateTodolistForm> = {
  title: 'entities/Todolist/CreateTodolistForm',
  component: CreateTodolistForm,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {},
}

export default meta
type Story = StoryObj<typeof CreateTodolistForm>

export const Demo: Story = {}
