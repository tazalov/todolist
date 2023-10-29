import { Task } from './Task'

import { TaskStatus, TaskPriority } from '../../model/types/TasksSchema'

import type { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof Task> = {
  title: 'entities/Task/Task',
  component: Task,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    task: {
      description: 'Object with task info',
      control: 'object',
    },
    todoId: {
      description: 'Todolist id for current change status task',
      control: false,
    },
  },
}

export default meta
type Story = StoryObj<typeof Task>

const createTask = (status: CurrentStatus) => ({
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
  entityStatus: status,
})

export const Demo: Story = {
  args: {
    task: createTask('idle'),
    todoId: '1',
  },
}

export const Disabled: Story = {
  args: {
    task: createTask('loading'),
    todoId: '1',
  },
}
