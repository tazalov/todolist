import { StoryFn } from '@storybook/react'
import { TaskStatus, TaskPriority } from 'entities/task'
import { StateSchema, StoreProvider } from 'app/providers/store'

const state: StateSchema = {
  todoList: [
    { id: '1', filter: 'all', title: 'new todolist1', order: 0, addedDate: new Date() },
    { id: '2', filter: 'all', title: 'new todolist2', order: 0, addedDate: new Date() },
  ],
  tasks: {
    '1': [
      {
        id: '1',
        title: 'new task1',
        status: TaskStatus.NEW,
        startDate: new Date(),
        todoListId: 'todolistId1',
        order: 0,
        priority: TaskPriority.LOW,
        description: '',
        deadline: new Date(),
        addedDate: new Date(),
      },
      {
        id: '2',
        title: 'new task2',
        status: TaskStatus.COMPLETED,
        startDate: new Date(),
        todoListId: 'todolistId1',
        order: 0,
        priority: TaskPriority.LOW,
        description: '',
        deadline: new Date(),
        addedDate: new Date(),
      },
      {
        id: '3',
        title: 'new task3',
        status: TaskStatus.NEW,
        startDate: new Date(),
        todoListId: 'todolistId1',
        order: 0,
        priority: TaskPriority.LOW,
        description: '',
        deadline: new Date(),
        addedDate: new Date(),
      },
    ],
    '2': [
      {
        id: '1',
        title: 'new task1',
        status: TaskStatus.NEW,
        startDate: new Date(),
        todoListId: 'todolistId1',
        order: 0,
        priority: TaskPriority.LOW,
        description: '',
        deadline: new Date(),
        addedDate: new Date(),
      },
    ],
  },
}

export const StoreDecorator = (Story: StoryFn) => (
  <StoreProvider initialState={state}>
    <Story />
  </StoreProvider>
)
