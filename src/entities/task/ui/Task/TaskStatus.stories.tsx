import type { Meta, StoryObj } from '@storybook/react'
import { Task } from './Task'
import { TaskStatus, TaskPriority, UpdatedTaskT } from '../../model/types/TasksSchema'

const meta: Meta<typeof Task> = {
  title: 'entities/Task/Statuses',
  component: Task,
  parameters: {
    layout: 'centered',
  },
}

export default meta
type Story = StoryObj<typeof Task>

const createTask = (status: TaskStatus): UpdatedTaskT => ({
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
    todoListId: '1',
  },
}

export const InProgress: Story = {
  args: {
    task: createTask(TaskStatus.IN_PROGRESS),
    todoListId: '1',
  },
}

export const Completed: Story = {
  args: {
    task: createTask(TaskStatus.COMPLETED),
    todoListId: '1',
  },
}

export const Draft: Story = {
  args: {
    task: createTask(TaskStatus.DRAFT),
    todoListId: '1',
  },
}
