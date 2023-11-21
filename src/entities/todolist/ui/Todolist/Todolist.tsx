import CloseIcon from '@mui/icons-material/Close'
import { ButtonGroup, IconButton, Stack, Button, Typography } from '@mui/material'
import { FC, memo } from 'react'

import { useTranslation } from 'react-i18next'

import { useTodolist } from '../../model/hooks/useTodolist/useTodolist'
import { UpdatedTodoT } from '../../model/types/TodolistsSchema'
import { getStyleFilterButton } from '../../model/utils/getStyleFilterButton'

import { TaskList, CreateTaskForm } from 'entities/task'
import { EditableSpan } from 'shared/ui/EditableSpan/EditableSpan'

const options: Intl.DateTimeFormatOptions = {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
  weekday: 'long',
}

interface TodolistPT {
  todolist: UpdatedTodoT
  demo?: boolean
}

export const Todolist: FC<TodolistPT> = memo(({ todolist, demo = false }) => {
  const { id, title, addedDate, filter, entityStatus } = todolist

  const { t, i18n } = useTranslation()

  const { remove, changeTitle, changeFilter } = useTodolist(id, demo)

  return (
    <Stack
      spacing={3}
      alignItems='center'
      sx={{ p: 1.5, bgcolor: 'background.blocks', position: 'relative', boxShadow: 5 }}
    >
      <IconButton
        color='primary'
        sx={{ position: 'absolute', right: '0', top: '0', display: 'inline-flex' }}
        onClick={remove}
        disabled={entityStatus === 'loading'}
      >
        <CloseIcon fontSize='medium' />
      </IconButton>
      <EditableSpan variant='h4' title={title} textAlign={'center'} changeTitle={changeTitle} />
      <CreateTaskForm todoId={id} disabled={entityStatus === 'loading'} />
      <TaskList todoId={id} filter={filter} />
      <ButtonGroup size='small' variant='contained' disableElevation>
        <Button sx={getStyleFilterButton(filter, 'all')} onClick={changeFilter('all')}>
          {t('ALL')}
        </Button>
        <Button sx={getStyleFilterButton(filter, 'active')} onClick={changeFilter('active')}>
          {t('ACTIVE')}
        </Button>
        <Button sx={getStyleFilterButton(filter, 'completed')} onClick={changeFilter('completed')}>
          {t('COMPLETED')}
        </Button>
      </ButtonGroup>
      <Typography>
        {new Date(addedDate).toLocaleDateString(i18n.language === 'en' ? 'en-US' : 'ru-RU', options)}
      </Typography>
    </Stack>
  )
})
