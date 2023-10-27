import type { Meta, StoryObj } from '@storybook/react'
import { TaskMenu } from './TaskMenu'
import { TaskStatus, TaskPriority } from '../../model/types/TasksSchema'

const meta: Meta<typeof TaskMenu> = {
  title: 'entities/Task/TaskMenu',
  component: TaskMenu,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    task: {
      description: 'Object with task info',
      control: 'object',
    },
    remove: {
      description: 'Callback for delete task',
      action: 'Task deleted!',
    },
  },
}

export default meta
type Story = StoryObj<typeof TaskMenu>

export const Demo: Story = {
  args: {
    task: {
      id: '1',
      title: 'Todo something',
      status: TaskStatus.NEW,
      startDate: new Date(),
      todoListId: 'todolistId1',
      order: 0,
      priority: TaskPriority.LOW,
      description: '',
      deadline: new Date(),
      addedDate: new Date(),
      entityStatus: 'idle',
    },
  },
}
