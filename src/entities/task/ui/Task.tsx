import { Checkbox, ListItem } from '@mui/material'
import { FC, memo } from 'react'
import { EditableSpan } from 'components'
import { TaskT } from '../model/types/tasks.reducer'
import { TodoMenu } from './todo-menu/TodoMenu'
import { useTask } from '../../../utils/hooks'

interface TodoPT {
  todoListId: string
  task: TaskT
}

export const Task: FC<TodoPT> = memo(({ todoListId, task }) => {
  const { id, title, isDone } = task

  const { remove, changeStatus, changeTitle } = useTask(todoListId, id)

  const styleItem = {
    borderColor: 'error.main',
    borderStyle: 'solid',
    borderLeftWidth: '5px',
    borderRightWidth: 0,
    borderTopWidth: 0,
    borderBottomWidth: 0,
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
