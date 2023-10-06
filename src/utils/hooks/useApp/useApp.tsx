import { useSelector } from 'react-redux'
import { getTodoListsState, AddTodoList, Todolist } from '../../../entities/todolist'
import { useAppDispatch } from '../../../app/providers/store'
import { useCallback } from 'react'
import Grid from '@mui/material/Unstable_Grid2'

export const useApp = () => {
  const todoLists = useSelector(getTodoListsState)

  const dispatch = useAppDispatch()

  const addTodoList = useCallback(
    (title: string) => {
      dispatch(AddTodoList(title))
    },
    [dispatch],
  )

  const todoListsArray = todoLists.map(el => {
    return (
      <Grid key={el.id} xl={3} lg={3} md={4} sm={6} xs={12}>
        <Todolist todolist={el} />
      </Grid>
    )
  })

  return { todoListsArray, addTodoList }
}
