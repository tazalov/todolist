import { Task } from './Task'

import { TaskStatus, TaskPriority, UpdatedTaskT } from '../../model/types/TasksSchema'

import type { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof Task> = {
  title: 'entities/Task/Priorities',
  component: Task,
  parameters: {
    layout: 'centered',
  },
}

export default meta
type Story = StoryObj<typeof Task>

const createTask = (priority: TaskPriority): UpdatedTaskT => ({
  id: '1',
  title: 'Todo something',
  status: TaskStatus.NEW,
  startDate: new Date(),
  todoListId: 'todolistId1',
  order: 0,
  priority,
  description: '',
  deadline: new Date(),
  addedDate: new Date(),
  entityStatus: 'idle',
})

export const Low: Story = {
  args: {
    task: createTask(TaskPriority.LOW),
    todoId: '1',
  },
}

export const Middle: Story = {
  args: {
    task: createTask(TaskPriority.MIDDLE),
    todoId: '1',
  },
}

export const High: Story = {
  args: {
    task: createTask(TaskPriority.HIGH),
    todoId: '1',
  },
}

export const Urgently: Story = {
  args: {
    task: createTask(TaskPriority.URGENTLY),
    todoId: '1',
  },
}

export const Later: Story = {
  args: {
    task: createTask(TaskPriority.LATER),
    todoId: '1',
  },
}
