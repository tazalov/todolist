import { styled, Container } from '@mui/material'
import { FC, useEffect } from 'react'

import { taskReducer } from 'entities/task'
import {
  todolistSelectors,
  CreateTodolistForm,
  TodolistList,
  todoListReducer,
  todoListActions,
} from 'entities/todolist'
import { DynamicReducerLoader } from 'shared/lib/DynamicReducerLoader/DynamicReducerLoader'
import { useAppSelector, useAction } from 'shared/lib/hooks'

const ResponsiveContainer = styled(Container)(({ theme }) => ({
  [theme.breakpoints.down('sm')]: {
    paddingLeft: 10,
    paddingRight: 10,
  },
}))

const initialReducers = {
  tasks: taskReducer,
  todoList: todoListReducer,
}

interface TodoListsPagePT {
  demo?: boolean
}

const TodoListsPage: FC<TodoListsPagePT> = ({ demo = false }) => {
  const todoLists = useAppSelector(todolistSelectors.items)
  const isLoading = useAppSelector(todolistSelectors.isLoading)

  const { fetchTodoLists } = useAction(todoListActions)

  useEffect(() => {
    if (!demo) fetchTodoLists()
  }, [])

  return (
    <DynamicReducerLoader reducers={initialReducers}>
      <ResponsiveContainer fixed>
        <CreateTodolistForm />
        <TodolistList demo={demo} todoLists={todoLists} isLoading={isLoading} />
      </ResponsiveContainer>
    </DynamicReducerLoader>
  )
}

export default TodoListsPage
