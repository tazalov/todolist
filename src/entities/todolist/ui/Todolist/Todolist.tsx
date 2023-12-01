import CloseIcon from '@mui/icons-material/Close'
import { IconButton, Stack, Typography } from '@mui/material'
import { memo } from 'react'
import { useTranslation } from 'react-i18next'

import { useTodolist } from '../../model/hooks/useTodolist/useTodolist'
import { UpdatedTodo } from '../../model/types/TodolistsSchema'
import { FilterButtonGroup } from '../FilterButtonGroup/FilterButtonGroup'

import { TaskList, CreateTaskForm } from 'entities/task'
import { EditableSpan } from 'shared/ui/EditableSpan/EditableSpan'

const options: Intl.DateTimeFormatOptions = {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
  weekday: 'long',
}

interface Props {
  todolist: UpdatedTodo
  demo?: boolean
}

export const Todolist = memo(({ todolist, demo = false }: Props) => {
  const { id, title, addedDate, filter, entityStatus } = todolist

  const { i18n } = useTranslation()

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
      <FilterButtonGroup filter={filter} changeFilter={changeFilter} />
      <Typography>
        {new Date(addedDate).toLocaleDateString(i18n.language === 'en' ? 'en-US' : 'ru-RU', options)}
      </Typography>
    </Stack>
  )
})
