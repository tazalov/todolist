import { ChangeEvent, useCallback } from 'react'

import { deleteTask } from '../../services/deleteTask/deleteTask'
import { updateTask } from '../../services/updateTask/updateTask'
import { TaskStatus } from '../../types/TasksSchema'

import { useAppDispatch } from 'app/providers/store'

export const useTask = (todoListId: string, taskId: string) => {
  const dispatch = useAppDispatch()

  const remove = () => {
    dispatch(deleteTask(todoListId, taskId))
  }

  const handleChangeStatus = (e: ChangeEvent<HTMLInputElement>) => {
    const model = {
      status: e.currentTarget.checked ? TaskStatus.COMPLETED : TaskStatus.NEW,
    }
    dispatch(updateTask(todoListId, taskId, model))
  }

  const changeTitle = useCallback(
    (newTitle: string) => {
      const model = {
        title: newTitle,
      }
      dispatch(updateTask(todoListId, taskId, model))
    },
    [dispatch, todoListId, taskId],
  )

  return {
    remove,
    changeStatus: handleChangeStatus,
    changeTitle,
  }
}
