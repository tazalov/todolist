import { StoryFn } from '@storybook/react'

import { DeepPartial } from 'redux'

import { StateSchema, StoreProvider } from 'app/providers/store'
import { TaskStatus, TaskPriority } from 'entities/task'

const state: StateSchema = {
  auth: {
    data: null,
    captcha: null,
    _inited: true,
  },
  notification: {
    status: 'idle',
    error: null,
  },
  todoList: [
    { id: '1', filter: 'all', title: 'new todolist1', order: 0, addedDate: new Date(), entityStatus: 'idle' },
    {
      id: '2',
      filter: 'all',
      title: 'new todolist2',
      order: 1,
      addedDate: new Date(),
      entityStatus: 'loading',
    },
    { id: '3', filter: 'all', title: 'new todolist3', order: 2, addedDate: new Date(), entityStatus: 'idle' },
  ],
  tasks: {
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
}

export const StoreDecorator = (initialState?: DeepPartial<StateSchema>) => (Story: StoryFn) => (
  <StoreProvider initialState={initialState}>
    <Story />
  </StoreProvider>
)
