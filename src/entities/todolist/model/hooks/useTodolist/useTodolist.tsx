import { useCallback, useEffect } from 'react'

import { deleteTodolist } from '../../services/deleteTodolist/deleteTodolist'
import { updateTitleTodolist } from '../../services/updateTitleTodolist/updateTitleTodolist'
import { changeTodoList } from '../../slice/todolist.slice'
import { FilterT } from '../../types/TodolistsSchema'

import { useAppDispatch } from 'app/providers/store'
import { fetchTasksByTodolistId, createTask } from 'entities/task'

export const useTodolist = (todoId: string, demo: boolean) => {
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (!demo) {
      dispatch(fetchTasksByTodolistId(todoId))
    }
  }, [])

  const remove = () => {
    dispatch(deleteTodolist(todoId))
  }

  const changeTitle = useCallback(
    (title: string) => {
      dispatch(updateTitleTodolist({ todoId, title }))
    },
    [todoId, dispatch],
  )

  const changeFilter = useCallback(
    (filter: FilterT) => () => {
      const model = { filter }
      dispatch(changeTodoList({ todoId, model }))
    },
    [dispatch, todoId],
  )

  const addTask = useCallback(
    (title: string) => {
      dispatch(createTask({ todoId, title }))
    },
    [todoId, dispatch],
  )

  return {
    remove,
    changeTitle,
    changeFilter,
    addTask,
  }
}
