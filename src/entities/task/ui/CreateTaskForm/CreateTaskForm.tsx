import { useCallback, memo } from 'react'

import { taskThunks } from '../../model/services'

import { useAppDispatch } from 'shared/lib/hooks'
import { AddItemForm } from 'shared/ui/AddItemForm/AddItemForm'

interface Props {
  todoId: string
  disabled?: boolean
}

export const CreateTaskForm = memo(({ todoId, disabled = false }: Props) => {
  const dispatch = useAppDispatch()

  const addTask = useCallback(
    async (title: string) => {
      const action = await dispatch(taskThunks.createTask({ todoId, title }))
      return taskThunks.createTask.rejected.match(action) ? action.payload : undefined
    },
    [todoId, dispatch],
  )

  return <AddItemForm addItem={addTask} disabled={disabled} />
})
