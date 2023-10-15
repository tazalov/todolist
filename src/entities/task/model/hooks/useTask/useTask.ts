import { useAppDispatch } from 'app/providers/store'
import { RemoveTask, ChangeStatusTask, ChangeTitleTask } from '../../actions/tasks.actions'
import { ChangeEvent, useCallback } from 'react'
import { TaskStatus } from '../../types/TasksSchema'

export const useTask = (todoListId: string, taskId: string) => {
  const dispatch = useAppDispatch()

  const remove = () => {
    dispatch(RemoveTask(todoListId, taskId))
  }

  const handleChangeStatus = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(
      ChangeStatusTask(
        todoListId,
        taskId,
        e.currentTarget.checked ? TaskStatus.COMPLETED : TaskStatus.NEW,
      ),
    )
  }

  const changeTitle = useCallback(
    (newTitle: string) => {
      dispatch(ChangeTitleTask(todoListId, taskId, newTitle))
    },
    [dispatch, todoListId, taskId],
  )

  return {
    remove,
    changeStatus: handleChangeStatus,
    changeTitle,
  }
}
