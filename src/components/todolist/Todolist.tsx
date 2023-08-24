import CloseIcon from '@mui/icons-material/Close'
import { IconButton, List, Typography } from '@mui/material'
import Button from '@mui/material/Button'
import ButtonGroup from '@mui/material/ButtonGroup'
import Paper from '@mui/material/Paper'
import Stack from '@mui/material/Stack'
import { FC } from 'react'
import { FilterT, TaskT } from '../../App'
import { AddItemForm } from '../common/addItemForm/AddItemForm'
import { EditableSpan } from '../common/editableSpan/EditableSpan'
import { Todo } from '../todo/Todo'

type TodolistPT = {
  id: string
  name: string
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
  name,
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
  //! ---------- callback for addItemForm
  const addNewTask = (title: string) => {
    addTask(id, title)
  }

  //! ---------- callback for editableSpan
  const changeCurrentTitle = (title: string) => {
    changeTitle(id, title)
  }

  //! ---------- remove current todolist
  const removeCurrent = () => {
    removeTodolist(id)
  }

  //! ---------- change filter for tasks
  const changeFilterForTasks = (filter: FilterT) => () => changeFilter(id, filter)

  //! ---------- array Todo components
  const tasksList = tasks.map(el => {
    const changeIsDoneCurrentTask = (isDone: boolean) => changeTaskIsDone(id, el.id, isDone)
    const changeTitleCurrentTask = (title: string) => changeTaskTitle(id, el.id, title)
    const removeCurrentTask = () => removeTask(id, el.id)

    return (
      <Todo
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
    <Paper elevation={3} style={{ position: 'relative' }}>
      <IconButton
        size={'medium'}
        color="primary"
        aria-label="remove todolist"
        style={{ position: 'absolute', right: '0', top: '0', display: 'inline-block' }}
        onClick={removeCurrent}
      >
        <CloseIcon fontSize="medium" />
      </IconButton>
      <Stack spacing={2} alignItems="center" style={{ padding: '1.5em 0.5em 1em' }}>
        <Typography
          variant="h4"
          style={{
            height: '1.5em',
            display: 'inline-flex',
            alignItems: 'center',
            width: '100%',
          }}
          aria-label="edit title todolist"
        >
          <EditableSpan title={name} titleAlign={'center'} changeTitle={changeCurrentTitle} />
        </Typography>
        <AddItemForm addItem={addNewTask} />
        <List dense component="div" role="list" sx={{ width: '100%' }}>
          {tasksList}
        </List>
        <ButtonGroup size="small" variant="contained" disableElevation>
          <Button
            aria-label="change filter"
            sx={{ backgroundColor: filterValue === 'all' ? 'primary.dark' : 'primary.main' }}
            onClick={changeFilterForTasks('all')}
          >
            ALL
          </Button>
          <Button
            aria-label="change filter"
            sx={{ backgroundColor: filterValue === 'active' ? 'primary.dark' : 'primary.main' }}
            onClick={changeFilterForTasks('active')}
          >
            ACTIVE
          </Button>
          <Button
            aria-label="change filter"
            sx={{ backgroundColor: filterValue === 'completed' ? 'primary.dark' : 'primary.main' }}
            onClick={changeFilterForTasks('completed')}
          >
            COMPLETED
          </Button>
        </ButtonGroup>
      </Stack>
    </Paper>
  )
}
