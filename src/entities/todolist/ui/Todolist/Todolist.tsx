import CloseIcon from '@mui/icons-material/Close'
import { ButtonGroup, IconButton, Stack, Button, Typography } from '@mui/material'
import { FC, memo } from 'react'

import { TaskList } from '../../../task/ui/TaskList/TaskList'
import { useTodolist } from '../../model/hooks/useTodolist/useTodolist'
import { UpdatedTodoListT } from '../../model/types/TodolistsSchema'

import { getStyleFilterButton } from 'entities/todolist/model/utils/getStyleFilterButton'
import { AddItemForm } from 'shared/ui/AddItemForm/AddItemForm'
import { EditableSpan } from 'shared/ui/EditableSpan/EditableSpan'

const options: Intl.DateTimeFormatOptions = {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
  weekday: 'long',
}

const styleClose = { position: 'absolute', right: '0', top: '0', display: 'inline-flex' }
const styleTodolist = { p: 1.5, bgcolor: 'background.blocks', position: 'relative', boxShadow: 5 }

interface TodolistPT {
  todolist: UpdatedTodoListT
  demo?: boolean
}

export const Todolist: FC<TodolistPT> = memo(({ todolist, demo = false }) => {
  const { id, title, addedDate, filter, entityStatus } = todolist

  const { remove, changeTitle, changeFilter, addTask } = useTodolist(id, demo)

  return (
    <Stack spacing={3} alignItems='center' sx={styleTodolist}>
      <IconButton color='primary' sx={styleClose} onClick={remove} disabled={entityStatus === 'loading'}>
        <CloseIcon fontSize='medium' />
      </IconButton>
      <EditableSpan variant='h4' title={title} textAlign={'center'} changeTitle={changeTitle} />
      <AddItemForm addItem={addTask} disabled={entityStatus === 'loading'} />
      <TaskList todoId={id} filter={filter} />
      <ButtonGroup size='small' variant='contained' disableElevation>
        <Button sx={getStyleFilterButton(filter, 'all')} onClick={changeFilter('all')}>
          ALL
        </Button>
        <Button sx={getStyleFilterButton(filter, 'active')} onClick={changeFilter('active')}>
          ACTIVE
        </Button>
        <Button sx={getStyleFilterButton(filter, 'completed')} onClick={changeFilter('completed')}>
          COMPLETED
        </Button>
      </ButtonGroup>
      <Typography>{new Date(addedDate).toLocaleDateString('en-US', options)}</Typography>
    </Stack>
  )
})
