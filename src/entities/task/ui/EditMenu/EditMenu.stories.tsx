import { EditMenu } from './EditMenu'

import { TaskStatus, TaskPriority, UpdatedTaskT } from '../../model/types/TasksSchema'

import type { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof EditMenu> = {
  title: 'entities/Task/EditMenu',
  component: EditMenu,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    task: {
      description: 'Object with task info',
      control: 'object',
    },
    open: {
      description: 'Flag to hide/show menu',
      control: false,
    },
    onClose: {
      description: 'Callback for close menu',
      action: 'Menu closed!',
    },
  },
}

export default meta
type Story = StoryObj<typeof EditMenu>

const task: UpdatedTaskT = {
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
}

export const Demo: Story = {
  args: {
    task,
    open: true,
  },
}
