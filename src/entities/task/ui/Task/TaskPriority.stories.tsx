import type { Meta, StoryObj } from '@storybook/react'
import { Task } from './Task'
import { TaskStatus, TaskPriority } from '../../model/types/TasksSchema'

const meta: Meta<typeof Task> = {
  title: 'entities/Task/Priorities',
  component: Task,
  parameters: {
    layout: 'centered',
  },
}

export default meta
type Story = StoryObj<typeof Task>

const createTask = (priority: TaskPriority) => ({
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
})

export const Low: Story = {
  args: {
    task: createTask(TaskPriority.LOW),
    todoListId: '1',
  },
}

export const Middle: Story = {
  args: {
    task: createTask(TaskPriority.MIDDLE),
    todoListId: '1',
  },
}

export const High: Story = {
  args: {
    task: createTask(TaskPriority.HIGH),
    todoListId: '1',
  },
}

export const Urgently: Story = {
  args: {
    task: createTask(TaskPriority.URGENTLY),
    todoListId: '1',
  },
}

export const Later: Story = {
  args: {
    task: createTask(TaskPriority.LATER),
    todoListId: '1',
  },
}
