import { Checkbox, ListItem } from '@mui/material'
import { FC, memo } from 'react'
import { EditableSpan } from 'components'
import { TaskT, TaskStatus } from '../model/types/TasksSchema'
import { TodoMenu } from './todo-menu/TodoMenu'
import { tasksPriority } from '../model/const/styles/tasksPriority'
import { useTask } from '../model/hooks/useTask/useTask'

const getBgcForStatus = (status: TaskStatus) => {
  switch (status) {
    case TaskStatus.COMPLETED: {
      return 'completed.main'
    }
    case TaskStatus.IN_PROGRESS: {
      return 'inProgress.main'
    }
    case TaskStatus.DRAFT: {
      return 'draft.main'
    }
    default: {
      return 'transparent'
    }
  }
}

interface TodoPT {
  todoListId: string
  task: TaskT
}

export const Task: FC<TodoPT> = memo(({ todoListId, task }) => {
  const { id, title, status, priority } = task

  const { remove, changeStatus, changeTitle } = useTask(todoListId, id)

  const styleItem = {
    opacity: task.status === TaskStatus.DRAFT ? 0.5 : 1,
    backgroundColor: getBgcForStatus(task.status),
    borderColor: `${tasksPriority[priority]}.main`,
    borderStyle: 'solid',
    borderWidth: '0 0 0 5px',
    mt: 1,
    p: 0.5,
  }

  return (
    <ListItem role="listitem" sx={styleItem} disablePadding>
      <Checkbox color="secondary" checked={status === TaskStatus.COMPLETED} onChange={changeStatus} />
      <EditableSpan variant="h6" title={title} changeTitle={changeTitle} />
      <TodoMenu task={task} remove={remove} />
    </ListItem>
  )
})
