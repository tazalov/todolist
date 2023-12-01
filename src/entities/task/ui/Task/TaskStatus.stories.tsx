import { Task } from './Task'

import { TaskStatus, TaskPriority, UpdatedTask } from '../../model/types/TasksSchema'

import type { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof Task> = {
  title: 'entities/Task/Statuses',
  component: Task,
  parameters: {
    layout: 'centered',
  },
}

export default meta
type Story = StoryObj<typeof Task>

const createTask = (status: TaskStatus): UpdatedTask => ({
  id: '1',
  title: 'Todo something',
  status,
  startDate: new Date(),
  todoListId: 'todolistId1',
  order: 0,
  priority: TaskPriority.LOW,
  description: '',
  deadline: new Date(),
  addedDate: new Date(),
  entityStatus: 'idle',
})

export const New: Story = {
  args: {
    task: createTask(TaskStatus.NEW),
    todoId: '1',
  },
}

export const InProgress: Story = {
  args: {
    task: createTask(TaskStatus.IN_PROGRESS),
    todoId: '1',
  },
}

export const Completed: Story = {
  args: {
    task: createTask(TaskStatus.COMPLETED),
    todoId: '1',
  },
}

export const Draft: Story = {
  args: {
    task: createTask(TaskStatus.DRAFT),
    todoId: '1',
  },
}
