import { StoryFn } from '@storybook/react'
import { Provider } from 'react-redux'
import { legacy_createStore } from 'redux'
import { rootReducer } from 'app/providers/store/config/store'
import { TaskStatus, TaskPriority } from 'entities/task'

const store = legacy_createStore(rootReducer, {
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
})

export const StoreDecorator = (Story: StoryFn) => (
  <Provider store={store}>
    <Story />
  </Provider>
)
