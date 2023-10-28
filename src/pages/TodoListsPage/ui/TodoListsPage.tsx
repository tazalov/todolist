import { styled, Container } from '@mui/material'
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

const TodoListsPage = () => {
  const userData = useAppSelector(getUserData)

  if (!userData) {
    return <Navigate to={'/login'} />
  }

  return (
    <ResponsiveContainer fixed>
      <CreateTodolistForm />
      <TodolistList />
    </ResponsiveContainer>
  )
}

export default TodoListsPage
