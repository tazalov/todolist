import { Container, styled } from '@mui/material'
import { CreateTodolistForm, TodolistList } from 'entities/todolist'
import { Header } from 'widgets/Header'
import { ErrorSnackbar, SuccessSnackbar } from 'entities/notification'

const ResponsiveContainer = styled(Container)(({ theme }) => ({
  [theme.breakpoints.down('sm')]: {
    paddingLeft: 10,
    paddingRight: 10,
  },
}))

export const App = () => {
  return (
    <>
      <Header />
      <ResponsiveContainer fixed>
        <CreateTodolistForm />
        <TodolistList />
      </ResponsiveContainer>
      <ErrorSnackbar />
      <SuccessSnackbar />
    </>
  )
}
