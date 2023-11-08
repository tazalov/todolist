import { FC, useCallback, memo } from 'react'

import { taskActions } from '../../model/services'

import { useAppDispatch } from 'shared/lib/hooks'
import { AddItemForm } from 'shared/ui/AddItemForm/AddItemForm'

interface CreateTaskFormPT {
  todoId: string
  disabled?: boolean
}

export const CreateTaskForm: FC<CreateTaskFormPT> = memo(({ todoId, disabled = false }) => {
  const dispatch = useAppDispatch()

  const addTask = useCallback(
    async (title: string) => {
      const action = await dispatch(taskActions.createTask({ todoId, title }))
      return taskActions.createTask.rejected.match(action) ? action.payload : undefined
    },
    [todoId, dispatch],
  )

  return <AddItemForm addItem={addTask} disabled={disabled} />
})
