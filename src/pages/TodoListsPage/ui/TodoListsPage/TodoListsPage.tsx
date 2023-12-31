import { styled, Container } from '@mui/material'
import { useEffect } from 'react'

import { taskReducer } from 'entities/task'
import {
  CreateTodolistForm,
  TodolistList,
  todoListReducer,
  selectorsTodo,
  getTodolistLoading,
  todoListThunks,
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

interface Props {
  demo?: boolean
}

const TodoListsPage = ({ demo = false }: Props) => {
  const todoLists = useAppSelector(selectorsTodo.selectAll)
  const isLoading = useAppSelector(getTodolistLoading)

  const { fetchTodoLists } = useAction(todoListThunks)

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
