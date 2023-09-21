import CloseIcon from '@mui/icons-material/Close'
import { Box, Button, ButtonGroup, IconButton, List, Stack, Typography } from '@mui/material'
import { AddItemForm, EditableSpan } from 'components'
import { Task, TaskT } from 'entities/task'
import { FC } from 'react'
import { useSelector } from 'react-redux'
import { useAppDispatch } from '../../../app/providers'
import { AddTask } from '../../task/model/actions/tasks.actions'
import { getSpecificTasks } from '../../task/model/selectors/getSpecificTasks'
import {
  ChangeFilterTodolist,
  ChangeTitleTodolist,
  RemoveTodolist,
} from '../model/actions/todolist.actions'
import { FilterT, TodoListT } from '../model/types/todolist.reducer'

type TodolistPT = {
  todolist: TodoListT
}

export const Todolist: FC<TodolistPT> = ({ todolist }) => {
  const { id, title, filter } = todolist

  const tasks = useSelector(getSpecificTasks(id))

  const dispatch = useAppDispatch()

  const remove = () => {
    dispatch(RemoveTodolist(id))
  }
  const changeTitle = (title: string) => {
    dispatch(ChangeTitleTodolist(id, title))
  }
  const changeFilter = (filter: FilterT) => () => {
    dispatch(ChangeFilterTodolist(id, filter))
  }
  const addTask = (title: string) => {
    dispatch(AddTask(id, title))
  }

  //! ---------- array Task components
  const filterOptions = {
    all: (tasks: TaskT[]) => tasks,
    completed: (tasks: TaskT[]) => tasks.filter(el => el.isDone),
    active: (tasks: TaskT[]) => tasks.filter(el => !el.isDone),
  }

  const tasksList = filterOptions[filter](tasks).map(el => (
    <Task key={el.id} todoListId={id} task={el} />
  ))

  return (
    <Box sx={{ bgcolor: 'background.blocks', position: 'relative', boxShadow: 5, p: 1 }}>
      <IconButton
        color="primary"
        sx={{ position: 'absolute', right: '0', top: '0', display: 'inline-flex' }}
        onClick={remove}
      >
        <CloseIcon fontSize="medium" />
      </IconButton>
      <Stack spacing={2} alignItems="center" sx={{ p: '1.5em 0.5em 1em' }}>
        <Typography
          variant="h4"
          sx={{
            height: '1.6em',
            display: 'inline-flex',
            alignItems: 'center',
            width: '100%',
          }}
        >
          <EditableSpan title={title} titleAlign={'center'} changeTitle={changeTitle} />
        </Typography>
        <AddItemForm addItem={addTask} />
        <List sx={{ width: '100%' }}>{tasksList}</List>
        <ButtonGroup size="small" variant="contained" disableElevation>
          <Button
            sx={{
              backgroundColor: filter === 'all' ? 'primary.dark' : 'primary.main',
              color: 'secondary.contrastText',
            }}
            onClick={changeFilter('all')}
          >
            ALL
          </Button>
          <Button
            sx={{
              backgroundColor: filter === 'active' ? 'primary.dark' : 'primary.main',
              color: 'secondary.contrastText',
            }}
            onClick={changeFilter('active')}
          >
            ACTIVE
          </Button>
          <Button
            sx={{
              backgroundColor: filter === 'completed' ? 'primary.dark' : 'primary.main',
              color: 'secondary.contrastText',
            }}
            onClick={changeFilter('completed')}
          >
            COMPLETED
          </Button>
        </ButtonGroup>
      </Stack>
    </Box>
  )
}
