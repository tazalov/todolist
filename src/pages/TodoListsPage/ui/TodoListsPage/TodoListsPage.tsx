import { styled, Container } from '@mui/material'
import { FC, useEffect } from 'react'

import { useAppSelector, useAppDispatch } from 'app/providers/store'
import { taskReducer } from 'entities/task'
import { getTodolistsItems, getTodolistsIsLoading, fetchTodoLists } from 'entities/todolist'
import { CreateTodolistForm, TodolistList, todoListReducer } from 'entities/todolist'
import { DynamicReducerLoader } from 'shared/lib/DynamicReducerLoader/DynamicReducerLoader'

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
  const todoLists = useAppSelector(getTodolistsItems)
  const isLoading = useAppSelector(getTodolistsIsLoading)

  const dispatch = useAppDispatch()

  useEffect(() => {
    if (!demo) {
      dispatch(fetchTodoLists())
    }
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
