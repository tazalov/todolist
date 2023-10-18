import { useSelector } from 'react-redux'
import { getTodolists, AddTodoList, Todolist } from 'entities/todolist'
import { useAppDispatch } from 'app/providers/store'
import { useCallback, useEffect } from 'react'
import Grid from '@mui/material/Unstable_Grid2'
import { fetchTodoLists } from 'entities/todolist'

export const useApp = () => {
  const todoLists = useSelector(getTodolists)

  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(fetchTodoLists())
  }, [])

  const addTodoList = useCallback(
    (title: string) => {
      dispatch(AddTodoList(title))
    },
    [dispatch],
  )

  const todoListsArray = todoLists.map(el => {
    return (
      <Grid key={el.id} lg={4} md={6} sm={12}>
        <Todolist todolist={el} />
      </Grid>
    )
  })

  return { todoListsArray, addTodoList }
}
