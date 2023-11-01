import { styled, Container } from '@mui/material'
import { FC } from 'react'
import { Navigate } from 'react-router-dom'

import { useAppSelector } from 'app/providers/store'
import { taskReducer } from 'entities/task'
import { CreateTodolistForm, TodolistList, todoListReducer } from 'entities/todolist'
import { getUserData } from 'features/auth'
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
  const userData = useAppSelector(getUserData)

  if (!userData) {
    return <Navigate to={'/login'} />
  }

  return (
    <DynamicReducerLoader reducers={initialReducers}>
      <ResponsiveContainer fixed>
        <CreateTodolistForm />
        <TodolistList demo={demo} />
      </ResponsiveContainer>
    </DynamicReducerLoader>
  )
}

export default TodoListsPage
