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
    <Paper elevation={3}>
      <Stack spacing={2} justifyContent="center" alignItems="center" sx={{ p: 1, width: '100%' }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
            <EditableSpan title={name} changeTitle={changeCurrentTitle} />
          </Typography>
          <IconButton size={'medium'} aria-label="delete" color="primary" onClick={removeCurrent}>
            <CloseIcon fontSize="medium" />
          </IconButton>
        </div>
        <AddItemForm addItem={addNewTask} />
        <List dense component="div" role="list">
          {tasksList}
        </List>
        <ButtonGroup
          size="small"
          variant="contained"
          aria-label="outlined primary button group"
          disableElevation
        >
          <Button
            color={filterValue === 'all' ? 'success' : 'primary'}
            onClick={changeFilterForTasks('all')}
          >
            ALL
          </Button>
          <Button
            color={filterValue === 'active' ? 'success' : 'primary'}
            onClick={changeFilterForTasks('active')}
          >
            ACTIVE
          </Button>
          <Button
            color={filterValue === 'completed' ? 'success' : 'primary'}
            onClick={changeFilterForTasks('completed')}
          >
            COMPLETED
          </Button>
        </ButtonGroup>
      </Stack>
    </Paper>
  )
}
