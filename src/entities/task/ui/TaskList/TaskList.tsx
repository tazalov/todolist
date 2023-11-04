import { Typography, List } from '@mui/material'
import { FC, useMemo, memo } from 'react'

import { Loader } from '../../../../shared/ui/Loader/Loader'
import { getSpecificTasks, getTaskIsLoading } from '../../model/selectors/tasks'
import { TaskStatus } from '../../model/types/TasksSchema'
import { Task } from '../Task/Task'

import { useAppSelector } from 'app/providers/store'
import { FilterT } from 'entities/todolist'

interface TaskListPT {
  todoId: string
  filter: FilterT
}

export const TaskList: FC<TaskListPT> = memo(({ todoId, filter }) => {
  const tasks = useAppSelector(getSpecificTasks(todoId))
  const isLoading = useAppSelector(getTaskIsLoading)

  const tasksArray = useMemo(() => {
    switch (filter) {
      case 'active': {
        return tasks?.filter((el) => el.status === TaskStatus.NEW) || []
      }
      case 'completed': {
        return tasks?.filter((el) => el.status === TaskStatus.COMPLETED) || []
      }
      default: {
        return tasks || []
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
