import { useCallback } from 'react'
import { Typography, Stack } from '@mui/material'
import { AddItemForm } from 'components'
import { useAppDispatch } from 'app/providers/store'
import { createTodolist } from '../../model/services/createTodolist/createTodolist'

export const CreateTodolistForm = () => {
  const dispatch = useAppDispatch()

  const handleCreateTodolist = useCallback((title: string) => {
    dispatch(createTodolist(title))
  }, [])

  return (
    <Stack direction={{ xs: 'column', sm: 'row' }} justifyContent="center" alignItems="center" spacing={2}>
      <Typography variant="h6">CREATE NEW TODOLIST</Typography>
      <AddItemForm addItem={handleCreateTodolist} />
    </Stack>
  )
}
