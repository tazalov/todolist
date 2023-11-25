import { useCallback, useEffect } from 'react'

import { todoListThunks } from '../../services'
import { todoListActions } from '../../slice/todolist.slice'
import { FilterT } from '../../types/TodolistsSchema'

import { taskThunks } from 'entities/task'
import { useAction } from 'shared/lib/hooks'

export const useTodolist = (todoId: string, demo: boolean) => {
  const { fetchTasksByTodolistId } = useAction(taskThunks)
  const { updateTitleTodolist, deleteTodolist, changeTodoList } = useAction({ ...todoListActions, ...todoListThunks })

  useEffect(() => {
    if (!demo) fetchTasksByTodolistId(todoId)
  }, [fetchTasksByTodolistId, todoId, demo])

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

  return {
    remove,
    changeTitle,
    changeFilter,
  }
}
