import { Checkbox, ListItem } from '@mui/material'
import { FC, memo } from 'react'
import { EditableSpan } from 'components'
import { TaskT } from '../model/types/tasks.reducer'
import { TodoMenu } from './todo-menu/TodoMenu'
import { useTask } from '../../../utils/hooks/useTask/useTask'

interface TodoPT {
  todoListId: string
  task: TaskT
}

export const Task: FC<TodoPT> = memo(({ todoListId, task }) => {
  const { id, title, isDone } = task

  const { remove, changeStatus, changeTitle } = useTask(todoListId, id)

  const styleItem = {
    borderWidth: '2px',
    borderColor: 'error.main',
    borderStyle: 'solid',
    borderRadius: '5px',
    mt: 1,
    p: 0.5,
  }

  return (
    <ListItem role="listitem" sx={styleItem} disablePadding>
      <Checkbox color="secondary" checked={isDone} onChange={changeStatus} />
      <EditableSpan variant="h6" title={title} changeTitle={changeTitle} />
      <TodoMenu remove={remove} />
    </ListItem>
  )
})
