import { useCallback, useEffect } from 'react'

import { todoListActions } from '../../services'
import { FilterT } from '../../types/TodolistsSchema'

import { taskActions } from 'entities/task'
import { useAction } from 'shared/lib/hooks'

export const useTodolist = (todoId: string, demo: boolean) => {
  const { fetchTasksByTodolistId, createTask } = useAction(taskActions)
  const { updateTitleTodolist, deleteTodolist, changeTodoList } = useAction(todoListActions)

  useEffect(() => {
    if (!demo) fetchTasksByTodolistId(todoId)
  }, [])

  const remove = () => deleteTodolist(todoId)

  const changeTitle = useCallback(
    (title: string) => {
      updateTitleTodolist({ todoId, title })
    },
    [todoId, updateTitleTodolist],
  )

  const changeFilter = useCallback(
    (filter: FilterT) => () => {
      changeTodoList({ todoId, model: { filter } })
    },
    [todoId, changeTodoList],
  )

  const addTask = useCallback(
    (title: string) => {
      createTask({ todoId, title })
    },
    [todoId, createTask],
  )

  return {
    remove,
    changeTitle,
    changeFilter,
    addTask,
  }
}
