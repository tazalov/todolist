import TodoListsPage from './TodoListsPage'

import { TaskStatus, TaskPriority } from '../../../../entities/task'
import { StoreDecorator } from '../../../../shared/config/storybook/decorators/StoreDecorator'

import type { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof TodoListsPage> = {
  title: 'pages/TodoListsPage',
  component: TodoListsPage,
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [
    StoreDecorator({
      auth: { data: { userId: 1 } },
      todoList: [
        { id: '1', filter: 'all', title: 'todolist1', order: 0, addedDate: new Date(), entityStatus: 'idle' },
        { id: '2', filter: 'all', title: 'todolist2', order: 1, addedDate: new Date(), entityStatus: 'loading' },
        { id: '3', filter: 'all', title: 'todolist3', order: 2, addedDate: new Date(), entityStatus: 'idle' },
      ],
      tasks: {
        isLoading: false,
        items: {
          '1': [
            {
              id: '1',
              title: 'new task1',
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
              title: 'new task2',
              status: TaskStatus.IN_PROGRESS,
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
              id: '3',
              title: 'new task3',
              status: TaskStatus.COMPLETED,
              startDate: new Date(),
              todoListId: '1',
              order: 0,
              priority: TaskPriority.HIGH,
              description: '',
              deadline: new Date(),
              addedDate: new Date(),
              entityStatus: 'idle',
            },
          ],
          '2': [
            {
              id: '1',
              title: 'new task1',
              status: TaskStatus.IN_PROGRESS,
              startDate: new Date(),
              todoListId: '2',
              order: 0,
              priority: TaskPriority.MIDDLE,
              description: '',
              deadline: new Date(),
              addedDate: new Date(),
              entityStatus: 'idle',
            },
          ],
          '3': [
            {
              id: '1',
              title: 'new task1',
              status: TaskStatus.COMPLETED,
              startDate: new Date(),
              todoListId: '3',
              order: 0,
              priority: TaskPriority.HIGH,
              description: '',
              deadline: new Date(),
              addedDate: new Date(),
              entityStatus: 'idle',
            },
          ],
        },
      },
    }),
  ],
}

export default meta
type Story = StoryObj<typeof TodoListsPage>

export const Demo: Story = {
  args: {
    demo: true,
  },
}
