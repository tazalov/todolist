import { Typography, Stack, Box, Chip } from '@mui/material'
import Grid from '@mui/material/Unstable_Grid2'
import { memo, useCallback } from 'react'
import { useTranslation } from 'react-i18next'

import { todoListThunks } from '../../model/services'

import { useAppDispatch } from 'shared/lib/hooks'
import { AddItemForm } from 'shared/ui/AddItemForm/AddItemForm'

export const CreateTodolistForm = memo(() => {
  const { t, i18n } = useTranslation()

  const dispatch = useAppDispatch()

  const createTodolist = useCallback(
    (title: string) => dispatch(todoListThunks.createTodolist(title)).unwrap(),
    [dispatch],
  )

  const createHints = useCallback((locale: string) => {
    return [
      { value: locale === 'en' ? 'New' : 'Новая', color: 'background.paper' },
      { value: locale === 'en' ? 'In progress' : 'В процессе', color: 'IN_PROGRESS.main' },
      { value: locale === 'en' ? 'Completed' : 'Завершена', color: 'COMPLETED.main' },
      { value: locale === 'en' ? 'Draft' : 'Устарела', color: 'DRAFT.main' },
    ]
  }, [])

  return (
    <Grid container sx={{ pt: '40px', pb: '40px' }}>
      <Box sx={{ bgcolor: 'background.blocks', boxShadow: 5, width: '100%' }}>
        <Stack direction={{ xs: 'column', sm: 'row' }} justifyContent='center' alignItems='center' spacing={2}>
          <Typography variant='h6'>{t('CREATE TODOLIST')}</Typography>
          <AddItemForm addItemAsync={createTodolist} />
        </Stack>
        <Stack gap={1} direction={{ xs: 'column', sm: 'row' }} justifyContent={'center'} sx={{ p: 1 }}>
          {createHints(i18n.language).map((el) => (
            <Chip
              key={el.value}
              label={el.value}
              sx={{
                backgroundColor: el.color,
                border: '1px solid',
                borderColor: 'text.primary',
                opacity: el.value === 'Draft' || el.value === 'Устарела' ? 0.5 : 1,
              }}
            />
          ))}
        </Stack>
      </Box>
    </Grid>
  )
})
