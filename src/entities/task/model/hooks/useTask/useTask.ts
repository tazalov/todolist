import { ChangeEvent, useCallback } from 'react'

import { deleteTask } from '../../services/deleteTask/deleteTask'
import { updateTask } from '../../services/updateTask/updateTask'
import { TaskStatus } from '../../types/TasksSchema'

import { useAppDispatch } from 'app/providers/store'

export const useTask = (todoId: string, taskId: string) => {
  const dispatch = useAppDispatch()

  const remove = () => {
    dispatch(deleteTask({ todoId, taskId }))
  }

  const handleChangeStatus = (e: ChangeEvent<HTMLInputElement>) => {
    const taskModel = {
      status: e.currentTarget.checked ? TaskStatus.COMPLETED : TaskStatus.NEW,
    }
    dispatch(updateTask({ todoId, taskId, taskModel }))
  }

  const changeTitle = useCallback(
    (newTitle: string) => {
      const taskModel = {
        title: newTitle,
      }
      dispatch(updateTask({ todoId, taskId, taskModel }))
    },
    [dispatch, todoId, taskId],
  )

  return {
    remove,
    changeStatus: handleChangeStatus,
    changeTitle,
  }
}
