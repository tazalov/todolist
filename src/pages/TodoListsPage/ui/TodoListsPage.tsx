import { styled, Container } from '@mui/material'

import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

import { CreateTodolistForm, TodolistList } from 'entities/todolist'
import { getUserData } from 'features/auth'

const ResponsiveContainer = styled(Container)(({ theme }) => ({
  [theme.breakpoints.down('sm')]: {
    paddingLeft: 10,
    paddingRight: 10,
  },
}))

const TodoListsPage = () => {
  const userData = useSelector(getUserData)

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
