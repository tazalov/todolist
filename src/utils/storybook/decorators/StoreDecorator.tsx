import { StoryFn } from '@storybook/react'
import { Provider } from 'react-redux'
import { legacy_createStore } from 'redux'
import { rootReducer } from '../../../app/providers/store/config/store'

const store = legacy_createStore(rootReducer, {
  todoList: [
    { id: '1', filter: 'all', title: 'new todolist1' },
    { id: '2', filter: 'all', title: 'new todolist2' },
  ],
  tasks: {
    '1': [
      { id: '1', title: 'new task1', isDone: false },
      { id: '2', title: 'new task2', isDone: true },
      { id: '3', title: 'new task3', isDone: false },
    ],
    '2': [{ id: '1', title: 'new task1', isDone: false }],
  },
})

export const StoreDecorator = (Story: StoryFn) => (
  <Provider store={store}>
    <Story />
  </Provider>
)
