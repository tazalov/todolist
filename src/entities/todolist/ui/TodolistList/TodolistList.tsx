import { useEffect, memo } from 'react'
import { useSelector } from 'react-redux'
import { getTodolists } from '../../model/selectors/todolists'
import { useAppDispatch } from 'app/providers/store'
import { fetchTodoLists } from '../../model/services/fetchTodoLists/fetchTodoLists'
import Grid from '@mui/material/Unstable_Grid2'
import { Todolist } from '../Todolist/Todolist'

export const TodolistList = memo(() => {
  const todoLists = useSelector(getTodolists)

  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(fetchTodoLists())
  }, [])

  const todoListsArray = todoLists.map(el => {
    return (
      <Grid key={el.id} lg={4} md={6} sm={12}>
        <Todolist todolist={el} />
      </Grid>
    )
  })
  return (
    <Grid container spacing={2}>
      {todoListsArray}
    </Grid>
  )
})
