import type { Meta, StoryObj } from '@storybook/react'
import { Todolist } from './Todolist'

const meta: Meta<typeof Todolist> = {
  title: 'entities/Todolist',
  component: Todolist,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    todolist: {
      description: 'Object with todolist info',
      control: 'object',
    },
    demo: {
      description: 'Flag for render in storybook',
      control: false,
    },
  },
}

export default meta
type Story = StoryObj<typeof Todolist>

export const FilterAll: Story = {
  args: {
    todolist: {
      id: '1',
      title: 'New todolist',
      filter: 'all',
      order: 0,
      addedDate: new Date(),
      entityStatus: 'idle',
    },
    demo: true,
  },
}

export const FilterActive: Story = {
  args: {
    todolist: {
      id: '1',
      title: 'New todolist',
      filter: 'active',
      order: 0,
      addedDate: new Date(),
      entityStatus: 'idle',
    },
    demo: true,
  },
}

export const FilterCompleted: Story = {
  args: {
    todolist: {
      id: '1',
      title: 'New todolist',
      filter: 'completed',
      order: 0,
      addedDate: new Date(),
      entityStatus: 'idle',
    },
    demo: true,
  },
}
