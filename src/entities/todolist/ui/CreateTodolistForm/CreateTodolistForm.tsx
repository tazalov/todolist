import { Typography, Stack, Box, Chip } from '@mui/material'
import Grid from '@mui/material/Unstable_Grid2'
import { useCallback, memo } from 'react'

import { createTodolist } from '../../model/services/createTodolist/createTodolist'

import { useAppDispatch } from 'app/providers/store'

import { AddItemForm } from 'shared/ui/AddItemForm/AddItemForm'

const hints = [
  { value: 'New', color: 'background.paper' },
  { value: 'In progress', color: 'IN_PROGRESS.main' },
  { value: 'Completed', color: 'COMPLETED.main' },
  { value: 'Draft', color: 'DRAFT.main' },
]

export const CreateTodolistForm = memo(() => {
  const dispatch = useAppDispatch()

  const handleCreateTodolist = useCallback((title: string) => {
    dispatch(createTodolist(title))
  }, [])

  return (
    <Grid container sx={{ pt: '40px', pb: '40px' }}>
      <Box sx={{ bgcolor: 'background.blocks', boxShadow: 5, width: '100%' }}>
        <Stack direction={{ xs: 'column', sm: 'row' }} justifyContent='center' alignItems='center' spacing={2}>
          <Typography variant='h6'>CREATE NEW TODOLIST</Typography>
          <AddItemForm addItem={handleCreateTodolist} />
        </Stack>
        <Stack gap={1} direction={{ xs: 'column', sm: 'row' }} justifyContent={'center'} sx={{ p: 1 }}>
          {hints.map((el) => (
            <Chip
              key={el.value}
              label={el.value}
              sx={{
                backgroundColor: el.color,
                border: '1px solid',
                borderColor: 'text.primary',
                opacity: el.value === 'Draft' ? 0.5 : 1,
              }}
            />
          ))}
        </Stack>
      </Box>
    </Grid>
  )
})
