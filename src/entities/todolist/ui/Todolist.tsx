import CloseIcon from '@mui/icons-material/Close'
import { ButtonGroup, IconButton, List, Stack, Button } from '@mui/material'
import { AddItemForm, EditableSpan } from 'components'
import { FC, memo } from 'react'
import { TodoListT } from '../model/types/todolist.reducer'
import { useTodolist } from '../../../utils/hooks'
import { getStyleFilterButton } from '../../../utils/getStyles/getStyleFilterButton/getStyleFilterButton'

interface TodolistPT {
  todolist: TodoListT
}

export const Todolist: FC<TodolistPT> = memo(({ todolist }) => {
  const { id, title, filter } = todolist

  const { tasks, remove, changeTitle, changeFilter, addTask } = useTodolist(id, filter)

  const styleClose = { position: 'absolute', right: '0', top: '0', display: 'inline-flex' }

  const styleTodolist = { p: 1.5, bgcolor: 'background.blocks', position: 'relative', boxShadow: 5 }

  return (
    <Stack spacing={3} alignItems="center" sx={styleTodolist}>
      <IconButton color="primary" sx={styleClose} onClick={remove}>
        <CloseIcon fontSize="medium" />
      </IconButton>
      <EditableSpan variant="h4" title={title} textAlign={'center'} changeTitle={changeTitle} />
      <AddItemForm addItem={addTask} />
      <List sx={{ width: '100%' }}>{tasks.length ? tasks : 'Not found'}</List>
      <ButtonGroup size="small" variant="contained" disableElevation>
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
    </Stack>
  )
})
