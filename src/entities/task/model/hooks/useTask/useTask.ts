import { ChangeEvent, useCallback } from 'react'

import { deleteTask } from '../../services/deleteTask/deleteTask'
import { updateTask } from '../../services/updateTask/updateTask'
import { TaskStatus } from '../../types/TasksSchema'

import { useAppDispatch } from 'app/providers/store'

export const useTask = (todoId: string, taskId: string) => {
  const dispatch = useAppDispatch()

  const remove = () => {
    dispatch(deleteTask(todoId, taskId))
  }

  const handleChangeStatus = (e: ChangeEvent<HTMLInputElement>) => {
    const model = {
      status: e.currentTarget.checked ? TaskStatus.COMPLETED : TaskStatus.NEW,
    }
    dispatch(updateTask(todoId, taskId, model))
  }

  const changeTitle = useCallback(
    (newTitle: string) => {
      const model = {
        title: newTitle,
      }
      dispatch(updateTask(todoId, taskId, model))
    },
    [dispatch, todoId, taskId],
  )

  return {
    remove,
    changeStatus: handleChangeStatus,
    changeTitle,
  }
}
