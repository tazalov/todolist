import { FC } from 'react'
import { CreateTodolistForm, TodolistList } from 'entities/todolist'
import { styled, Container } from '@mui/material'

const ResponsiveContainer = styled(Container)(({ theme }) => ({
  [theme.breakpoints.down('sm')]: {
    paddingLeft: 10,
    paddingRight: 10,
  },
}))

type TodoListsPagePT = {
  // add props type
}

const TodoListsPage: FC<TodoListsPagePT> = ({}) => {
  return (
    <ResponsiveContainer fixed>
      <CreateTodolistForm />
      <TodolistList />
    </ResponsiveContainer>
  )
}

export default TodoListsPage
