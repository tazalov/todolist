import { Typography, List } from '@mui/material'
import { FC, useMemo, memo } from 'react'

import { taskSelectors } from '../../model/selectors'
import { TaskStatus } from '../../model/types/TasksSchema'
import { Task } from '../Task/Task'

import { FilterT } from 'entities/todolist'
import { useAppSelector } from 'shared/lib/hooks'
import { Loader } from 'shared/ui/Loader/Loader'

interface TaskListPT {
  todoId: string
  filter: FilterT
}

export const TaskList: FC<TaskListPT> = memo(({ todoId, filter }) => {
  const tasks = useAppSelector(taskSelectors.items(todoId))
  const isLoading = useAppSelector(taskSelectors.isLoading)

  const tasksArray = useMemo(() => {
    switch (filter) {
      case 'active': {
        return tasks?.filter((el) => el.status === TaskStatus.NEW)
      }
      case 'completed': {
        return tasks?.filter((el) => el.status === TaskStatus.COMPLETED)
      }
      default: {
        return tasks
      }
    }
  }, [tasks, filter])

  if (isLoading) {
    return <Loader />
  }

  const tasksList = tasksArray.map((el) => <Task key={el.id} todoId={todoId} task={el} />)

  return (
    <List sx={{ width: '100%' }}>
      {tasks && tasks.length ? tasksList : <Typography align={'center'}>Not found</Typography>}
    </List>
  )
})
