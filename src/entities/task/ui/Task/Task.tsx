import { Checkbox, ListItem } from '@mui/material'
import { memo } from 'react'

import { tasksPriority } from '../../model/const/colorsEditMenuItems'
import { useTask } from '../../model/hooks/useTask/useTask'
import { TaskStatus, UpdatedTask } from '../../model/types/TasksSchema'
import { getBgForStatus } from '../../model/utils/getBgForStatus'
import { TaskMenu } from '../TaskMenu/TaskMenu'

import { EditableSpan } from 'shared/ui/EditableSpan/EditableSpan'

interface Props {
  todoId: string
  task: UpdatedTask
}

export const Task = memo(({ todoId, task }: Props) => {
  const { id, title, status, priority, entityStatus } = task

  const { remove, changeStatus, changeTitle } = useTask(todoId, id)

  const styleItem = {
    opacity: task.status === TaskStatus.DRAFT ? 0.5 : 1,
    backgroundColor: getBgForStatus(task.status),
    borderColor: `${tasksPriority[priority]}.main`,
    borderStyle: 'solid',
    borderWidth: '0 0 0 10px',
    mt: 1,
    p: 0.5,
  }

  return (
    <ListItem role='listitem' sx={styleItem} disablePadding>
      <Checkbox
        color='secondary'
        checked={status === TaskStatus.COMPLETED}
        onChange={changeStatus}
        disabled={entityStatus === 'loading'}
      />
      <EditableSpan variant='h6' title={title} changeTitle={changeTitle} disabled={entityStatus === 'loading'} />
      <TaskMenu task={task} remove={remove} disabled={entityStatus === 'loading'} />
    </ListItem>
  )
})
