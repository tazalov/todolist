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
    (title: string) => dispatch(taskThunks.createTask({ todoId, title })).unwrap(),
    [todoId, dispatch],
  )

  return <AddItemForm addItemAsync={addTask} disabled={disabled} />
})
