import { useSelector } from 'react-redux'
import { useAppDispatch } from 'app/providers/store'
import { useCallback, useMemo, useEffect } from 'react'
import {
  ChangeTitleTodolist,
  ChangeFilterTodolist,
  RemoveTodolist,
} from '../../actions/todolist.actions'
import { FilterT } from '../../types/TodolistsSchema'
import {
  getSpecificTasks,
  TaskStatus,
  Task,
  fetchTasksByTodolistId,
  createTask,
} from 'entities/task'

export const useTodolist = (todoListId: string, filter: FilterT) => {
  const tasks = useSelector(getSpecificTasks(todoListId))

  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(fetchTasksByTodolistId(todoListId))
  }, [])

  const remove = () => {
    dispatch(RemoveTodolist(todoListId))
  }
  const changeTitle = useCallback(
    (title: string) => {
      dispatch(ChangeTitleTodolist(todoListId, title))
    },
    [todoListId, dispatch],
  )

  const changeFilter = useCallback(
    (filter: FilterT) => () => {
      dispatch(ChangeFilterTodolist(todoListId, filter))
    },
    [dispatch, todoListId],
  )

  const addTask = useCallback(
    (title: string) => {
      dispatch(createTask(todoListId, title))
    },
    [todoListId, dispatch],
  )

  const tasksArray = useMemo(() => {
    switch (filter) {
      case 'active': {
        return tasks.filter(el => el.status === TaskStatus.NEW)
      }
      case 'completed': {
        return tasks.filter(el => el.status === TaskStatus.COMPLETED)
      }
      default: {
        return tasks
      }
    }
  }, [tasks, filter])

  const tasksList = tasksArray.map(el => <Task key={el.id} todoListId={todoListId} task={el} />)

  return {
    tasks: tasksList,
    remove,
    changeTitle,
    changeFilter,
    addTask,
  }
}
