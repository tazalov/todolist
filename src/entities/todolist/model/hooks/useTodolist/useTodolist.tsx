import { useSelector } from 'react-redux'
import { useAppDispatch } from 'app/providers/store'
import { useCallback, useMemo, useEffect } from 'react'
import { ChangeTodolist } from '../../actions/todolist.actions'
import { FilterT } from '../../types/TodolistsSchema'
import { getSpecificTasks, TaskStatus, Task, fetchTasksByTodolistId, createTask } from 'entities/task'
import { deleteTodolist } from '../../services/deleteTodolist/deleteTodolist'
import { updateTitleTodolist } from '../../services/updateTitleTodolist/updateTitleTodolist'

export const useTodolist = (todoListId: string, filter: FilterT, demo: boolean) => {
  const tasks = useSelector(getSpecificTasks(todoListId))

  const dispatch = useAppDispatch()

  useEffect(() => {
    if (!demo) {
      dispatch(fetchTasksByTodolistId(todoListId))
    }
  }, [])

  const remove = () => {
    dispatch(deleteTodolist(todoListId))
  }

  const changeTitle = useCallback(
    (title: string) => {
      dispatch(updateTitleTodolist(todoListId, title))
    },
    [todoListId, dispatch],
  )

  const changeFilter = useCallback(
    (filter: FilterT) => () => {
      const model = { filter }
      dispatch(ChangeTodolist(todoListId, model))
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
