import { styled, Container } from '@mui/material'
import { FC } from 'react'
import { Navigate } from 'react-router-dom'

import { useAppSelector } from 'app/providers/store'
import { CreateTodolistForm, TodolistList } from 'entities/todolist'
import { getUserData } from 'features/auth'

const ResponsiveContainer = styled(Container)(({ theme }) => ({
  [theme.breakpoints.down('sm')]: {
    paddingLeft: 10,
    paddingRight: 10,
  },
}))

interface TodoListsPagePT {
  demo?: boolean
}

const TodoListsPage: FC<TodoListsPagePT> = ({ demo = false }) => {
  const userData = useAppSelector(getUserData)

  if (!userData) {
    return <Navigate to={'/login'} />
  }

  return (
    <ResponsiveContainer fixed>
      <CreateTodolistForm />
      <TodolistList demo={demo} />
    </ResponsiveContainer>
  )
}

export default TodoListsPage
