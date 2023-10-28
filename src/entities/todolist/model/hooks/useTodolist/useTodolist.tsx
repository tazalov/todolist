import { useCallback, useEffect } from 'react'

import { ChangeTodolist } from '../../actions/todolist.actions'

import { deleteTodolist } from '../../services/deleteTodolist/deleteTodolist'
import { updateTitleTodolist } from '../../services/updateTitleTodolist/updateTitleTodolist'
import { FilterT } from '../../types/TodolistsSchema'

import { useAppDispatch } from 'app/providers/store'
import { fetchTasksByTodolistId, createTask } from 'entities/task'

export const useTodolist = (todoListId: string, demo: boolean) => {
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

  return {
    remove,
    changeTitle,
    changeFilter,
    addTask,
  }
}
