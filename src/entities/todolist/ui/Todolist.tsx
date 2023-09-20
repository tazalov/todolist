import CloseIcon from '@mui/icons-material/Close'
import { Box, Button, ButtonGroup, IconButton, List, Stack, Typography } from '@mui/material'
import { AddItemForm, EditableSpan } from 'components'
import { Task, TaskT } from 'entities/task'
import { FC } from 'react'
import { FilterT } from '../model/types/todolist.reducer'

type TodolistPT = {
  id: string
  title: string
  tasks: TaskT[]
  filterValue: FilterT
  addTask: (todolistId: string, title: string) => void
  removeTask: (todolistId: string, taskId: string) => void
  changeTaskIsDone: (todolistId: string, taskId: string, isDone: boolean) => void
  changeTaskTitle: (todolistId: string, taskId: string, title: string) => void
  changeFilter: (todolistId: string, filter: FilterT) => void
  removeTodolist: (todolistId: string) => void
  changeTitle: (todoListId: string, name: string) => void
}

export const Todolist: FC<TodolistPT> = ({
  id,
  title,
  tasks,
  filterValue,
  addTask,
  removeTask,
  changeTaskIsDone,
  changeTaskTitle,
  changeFilter,
  removeTodolist,
  changeTitle,
}) => {
  //! ---------- callback for add-item-form
  const addNewTask = (title: string) => {
    addTask(id, title)
  }

  //! ---------- callback for editable-span
  const changeCurrentTitle = (title: string) => {
    changeTitle(id, title)
  }

  //! ---------- remove current todolist
  const removeCurrent = () => {
    removeTodolist(id)
  }

  //! ---------- change filter for tasks
  const changeFilterForTasks = (filter: FilterT) => () => changeFilter(id, filter)

  //! ---------- array Index components
  const tasksList = tasks.map(el => {
    const changeIsDoneCurrentTask = (isDone: boolean) => changeTaskIsDone(id, el.id, isDone)
    const changeTitleCurrentTask = (title: string) => changeTaskTitle(id, el.id, title)
    const removeCurrentTask = () => removeTask(id, el.id)

    return (
      <Task
        key={el.id}
        title={el.title}
        isDone={el.isDone}
        changeIsDone={changeIsDoneCurrentTask}
        changeTitle={changeTitleCurrentTask}
        remove={removeCurrentTask}
      />
    )
  })

  return (
    <Box sx={{ bgcolor: 'background.blocks', position: 'relative', boxShadow: 5, p: 1 }}>
      <IconButton
        color="primary"
        sx={{ position: 'absolute', right: '0', top: '0', display: 'inline-flex' }}
        onClick={removeCurrent}
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
          <EditableSpan title={title} titleAlign={'center'} changeTitle={changeCurrentTitle} />
        </Typography>
        <AddItemForm addItem={addNewTask} />
        <List sx={{ width: '100%' }}>{tasksList}</List>
        <ButtonGroup size="small" variant="contained" disableElevation>
          <Button
            sx={{
              backgroundColor: filterValue === 'all' ? 'primary.dark' : 'primary.main',
              color: 'secondary.contrastText',
            }}
            onClick={changeFilterForTasks('all')}
          >
            ALL
          </Button>
          <Button
            sx={{
              backgroundColor: filterValue === 'active' ? 'primary.dark' : 'primary.main',
              color: 'secondary.contrastText',
            }}
            onClick={changeFilterForTasks('active')}
          >
            ACTIVE
          </Button>
          <Button
            sx={{
              backgroundColor: filterValue === 'completed' ? 'primary.dark' : 'primary.main',
              color: 'secondary.contrastText',
            }}
            onClick={changeFilterForTasks('completed')}
          >
            COMPLETED
          </Button>
        </ButtonGroup>
      </Stack>
    </Box>
  )
}
