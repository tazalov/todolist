import { ChangeEvent, useCallback } from 'react'

import { taskThunks } from '../../services'
import { TaskStatus } from '../../types/TasksSchema'

import { useAction } from 'shared/lib/hooks'

export const useTask = (todoId: string, taskId: string) => {
  const { updateTask, deleteTask } = useAction(taskThunks)

  const remove = () => {
    deleteTask({ todoId, taskId })
  }

  const changeStatus = (e: ChangeEvent<HTMLInputElement>) => {
    const status = e.currentTarget.checked ? TaskStatus.COMPLETED : TaskStatus.NEW
    updateTask({ todoId, taskId, taskModel: { status } })
  }

  const changeTitle = useCallback(
    (title: string) => {
      updateTask({ todoId, taskId, taskModel: { title } })
    },
    [todoId, taskId, updateTask],
  )

  return {
    remove,
    changeStatus,
    changeTitle,
  }
}
