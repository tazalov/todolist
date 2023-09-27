import CloseIcon from '@mui/icons-material/Close'
import { Box, ButtonGroup, IconButton, List, Stack, Typography } from '@mui/material'
import { AddItemForm, EditableSpan } from 'components'
import { Task } from 'entities/task'
import { FC, memo, useCallback, useMemo } from 'react'
import { useSelector } from 'react-redux'
import { useAppDispatch } from '../../../app/providers'
import { FilterButton } from '../../../components/button/FilterButton'
import { AddTask } from '../../task/model/actions/tasks.actions'
import { getSpecificTasks } from '../../task/model/selectors/getSpecificTasks'
import {
  ChangeFilterTodolist,
  ChangeTitleTodolist,
  RemoveTodolist,
} from '../model/actions/todolist.actions'
import { TodoListT } from '../model/types/todolist.reducer'

type TodolistPT = {
  todolist: TodoListT
}

export const Todolist: FC<TodolistPT> = memo(({ todolist }) => {
  const { id, title, filter } = todolist

  const tasks = useSelector(getSpecificTasks(id))

  const dispatch = useAppDispatch()

  const remove = () => {
    dispatch(RemoveTodolist(id))
  }
  const changeTitle = useCallback(
    (title: string) => {
      dispatch(ChangeTitleTodolist(id, title))
    },
    [id, dispatch],
  )

  const changeFilterAll = useCallback(() => {
    dispatch(ChangeFilterTodolist(id, 'all'))
  }, [id, dispatch])

  const changeFilterActive = useCallback(() => {
    dispatch(ChangeFilterTodolist(id, 'active'))
  }, [id, dispatch])

  const changeFilterCompleted = useCallback(() => {
    dispatch(ChangeFilterTodolist(id, 'completed'))
  }, [id, dispatch])

  const addTask = useCallback(
    (title: string) => {
      dispatch(AddTask(id, title))
    },
    [id, dispatch],
  )

  //! ---------- array Task components
  const tasksArray = useMemo(() => {
    switch (filter) {
      case 'active': {
        return tasks.filter(el => !el.isDone)
      }
      case 'completed': {
        return tasks.filter(el => el.isDone)
      }
      default: {
        return tasks
      }
    }
  },[tasks, filter])
  
  const tasksList = tasksArray.map(el => (
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
          <FilterButton
            activeBg={filter === 'all' ? 'primary.dark' : 'primary.main'}
            onClick={changeFilterAll}
          >
            ALL
          </FilterButton>
          <FilterButton
            activeBg={filter === 'active' ? 'primary.dark' : 'primary.main'}
            onClick={changeFilterActive}
          >
            ACTIVE
          </FilterButton>
          <FilterButton
            activeBg={filter === 'completed' ? 'primary.dark' : 'primary.main'}
            onClick={changeFilterCompleted}
          >
            COMPLETED
          </FilterButton>
        </ButtonGroup>
      </Stack>
    </Box>
  )
})
