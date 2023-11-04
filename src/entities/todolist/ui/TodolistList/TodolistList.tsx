import Grid from '@mui/material/Unstable_Grid2'
import { useEffect, memo, FC } from 'react'

import { getTodolists } from '../../model/selectors/todolists'
import { fetchTodoLists } from '../../model/services/fetchTodoLists/fetchTodoLists'
import { Todolist } from '../Todolist/Todolist'

import { useAppDispatch, useAppSelector } from 'app/providers/store'

interface TodolistListPT {
  demo?: boolean
}

export const TodolistList: FC<TodolistListPT> = memo(({ demo = false }) => {
  const todoLists = useAppSelector(getTodolists)

  const dispatch = useAppDispatch()

  useEffect(() => {
    if (!demo) {
      dispatch(fetchTodoLists())
    }
  }, [])

  const todoListsArray = (todoLists || []).map((el) => {
    return (
      <Grid key={el.id} lg={4} md={6} sm={12}>
        <Todolist todolist={el} demo={demo} />
      </Grid>
    )
  })
  return (
    <Grid container spacing={2}>
      {todoListsArray}
    </Grid>
  )
})
