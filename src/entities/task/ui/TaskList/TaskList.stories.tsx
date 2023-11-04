import { TaskList } from './TaskList'

import { UpdatedTaskT, TaskStatus, TaskPriority } from '../../model/types/TasksSchema'

import { StoreDecorator } from 'shared/config/storybook/decorators/StoreDecorator'

import type { Meta, StoryObj } from '@storybook/react'

const tasks: UpdatedTaskT[] = [
  {
    id: '1',
    title: 'Todo something1',
    status: TaskStatus.NEW,
    startDate: new Date(),
    todoListId: '1',
    order: 0,
    priority: TaskPriority.LOW,
    description: '',
    deadline: new Date(),
    addedDate: new Date(),
    entityStatus: 'idle',
  },
  {
    id: '2',
    title: 'Todo something2',
    status: TaskStatus.NEW,
    startDate: new Date(),
    todoListId: '1',
    order: 0,
    priority: TaskPriority.URGENTLY,
    description: '',
    deadline: new Date(),
    addedDate: new Date(),
    entityStatus: 'idle',
  },
  {
    id: '2',
    title: 'Todo something2',
    status: TaskStatus.COMPLETED,
    startDate: new Date(),
    todoListId: '1',
    order: 0,
    priority: TaskPriority.LOW,
    description: '',
    deadline: new Date(),
    addedDate: new Date(),
    entityStatus: 'idle',
  },
]

const meta: Meta<typeof TaskList> = {
  title: 'entities/Task/TaskList',
  component: TaskList,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    todoId: {
      description: 'Current todoListId',
      control: false,
    },
    filter: {
      description: 'Current filter for tasks',
      control: 'select',
    },
  },
  decorators: [
    StoreDecorator({
      tasks: {
        items: {
          '1': tasks,
        },
        isLoading: false,
      },
    }),
  ],
}

export default meta
type Story = StoryObj<typeof TaskList>

export const Demo: Story = {
  args: {
    todoId: '1',
    filter: 'all',
  },
}
