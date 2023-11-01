import { StoryFn } from '@storybook/react'
import { DeepPartial } from 'redux'

import { StateSchema, StoreProvider } from 'app/providers/store'
import { taskReducer } from 'entities/task'
import { todoListReducer } from 'entities/todolist'

const asyncReducers = {
  tasks: taskReducer,
  todoList: todoListReducer,
}

export const StoreDecorator = (initialState?: DeepPartial<StateSchema>) => (Story: StoryFn) => (
  <StoreProvider initialState={initialState} asyncReducers={asyncReducers}>
    <Story />
  </StoreProvider>
)
