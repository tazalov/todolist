import { Checkbox, ListItem } from '@mui/material'
import { FC, memo } from 'react'
import { TaskStatus, UpdatedTaskT } from '../../model/types/TasksSchema'
import { TaskMenu } from '../TaskMenu/TaskMenu'
import { useTask } from '../../model/hooks/useTask/useTask'
import { EditableSpan } from 'shared/ui/EditableSpan/EditableSpan'
import { getBgForStatus } from '../../model/utils/getBgForStatus'
import { tasksPriority } from '../../model/const/colorsEditMenuItems'

interface TodoPT {
  todoListId: string
  task: UpdatedTaskT
}

export const Task: FC<TodoPT> = memo(({ todoListId, task }) => {
  const { id, title, status, priority, entityStatus } = task

  const { remove, changeStatus, changeTitle } = useTask(todoListId, id)

  const styleItem = {
    opacity: task.status === TaskStatus.DRAFT ? 0.5 : 1,
    backgroundColor: getBgForStatus(task.status),
    borderColor: `${tasksPriority[priority]}.main`,
    borderStyle: 'solid',
    borderWidth: '0 0 0 8px',
    mt: 1,
    p: 0.5,
  }

  return (
    <ListItem role="listitem" sx={styleItem} disablePadding>
      <Checkbox
        color="secondary"
        checked={status === TaskStatus.COMPLETED}
        onChange={changeStatus}
        disabled={entityStatus === 'loading'}
      />
      <EditableSpan
        variant="h6"
        title={title}
        changeTitle={changeTitle}
        disabled={entityStatus === 'loading'}
      />
      <TaskMenu task={task} remove={remove} disabled={entityStatus === 'loading'} />
    </ListItem>
  )
})
