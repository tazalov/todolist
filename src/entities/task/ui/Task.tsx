import { Checkbox, ListItem } from '@mui/material'
import { FC, memo } from 'react'
import { EditableSpan } from 'components'
import { TaskT, TaskStatus } from '../model/types/TasksSchema'
import { TodoMenu } from './todo-menu/TodoMenu'
import { tasksPriority } from '../model/const/styles/tasksPriority'
import { useTask } from '../model/hooks/useTask/useTask'

interface TodoPT {
  todoListId: string
  task: TaskT
}

export const Task: FC<TodoPT> = memo(({ todoListId, task }) => {
  const { id, title, status, priority } = task

  const { remove, changeStatus, changeTitle } = useTask(todoListId, id)

  const styleItem = {
    borderColor: `${tasksPriority[priority]}.main`,
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
      <Checkbox
        color="secondary"
        checked={status === TaskStatus.COMPLETED}
        onChange={changeStatus}
      />
      <EditableSpan variant="h6" title={title} changeTitle={changeTitle} />
      <TodoMenu remove={remove} />
    </ListItem>
  )
})
