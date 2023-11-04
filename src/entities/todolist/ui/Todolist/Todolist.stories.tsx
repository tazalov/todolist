import { Todolist } from './Todolist'

import { UpdatedTaskT, TaskStatus, TaskPriority } from 'entities/task'

import { StoreDecorator } from 'shared/config/storybook/decorators/StoreDecorator'

import type { Meta, StoryObj } from '@storybook/react'

const tasks: UpdatedTaskT[] = [
  {
    id: '10',
    title: 'Todo something1',
    status: TaskStatus.NEW,
    startDate: new Date(),
    todoListId: '10',
    order: 0,
    priority: TaskPriority.LOW,
    description: '',
    deadline: new Date(),
    addedDate: new Date(),
    entityStatus: 'idle',
  },
  {
    id: '20',
    title: 'Todo something2',
    status: TaskStatus.NEW,
    startDate: new Date(),
    todoListId: '10',
    order: 0,
    priority: TaskPriority.URGENTLY,
    description: '',
    deadline: new Date(),
    addedDate: new Date(),
    entityStatus: 'idle',
  },
  {
    id: '30',
    title: 'Todo something2',
    status: TaskStatus.COMPLETED,
    startDate: new Date(),
    todoListId: '10',
    order: 0,
    priority: TaskPriority.LOW,
    description: '',
    deadline: new Date(),
    addedDate: new Date(),
    entityStatus: 'idle',
  },
]

const meta: Meta<typeof Todolist> = {
  title: 'entities/Todolist/Todolist',
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
  decorators: [
    StoreDecorator({
      tasks: {
        items: {
          '10': tasks,
        },
        isLoading: false,
      },
    }),
  ],
}

export default meta
type Story = StoryObj<typeof Todolist>

export const FilterAll: Story = {
  args: {
    todolist: {
      id: '10',
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
      id: '10',
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
      id: '10',
      title: 'New todolist',
      filter: 'completed',
      order: 0,
      addedDate: new Date(),
      entityStatus: 'idle',
    },
    demo: true,
  },
}
