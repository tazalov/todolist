import { FC, useMemo, memo } from 'react'
import { useSelector } from 'react-redux'
import { getSpecificTasks } from '../../model/selectors/tasks'
import { FilterT } from 'entities/todolist'
import { TaskStatus } from '../../model/types/TasksSchema'
import { Task } from '../Task/Task'
import { Typography, List } from '@mui/material'

interface TaskListPT {
  todoListId: string
  filter: FilterT
}

export const TaskList: FC<TaskListPT> = memo(({ todoListId, filter }) => {
  const tasks = useSelector(getSpecificTasks(todoListId))

  const tasksArray = useMemo(() => {
    switch (filter) {
      case 'active': {
        return tasks.filter(el => el.status === TaskStatus.NEW)
      }
      case 'completed': {
        return tasks.filter(el => el.status === TaskStatus.COMPLETED)
      }
      default: {
        return tasks
      }
    }
  }, [tasks, filter])

  const tasksList = tasksArray.map(el => <Task key={el.id} todoListId={todoListId} task={el} />)

  return (
    <List sx={{ width: '100%' }}>
      {tasks.length ? tasksList : <Typography align={'center'}>Not found</Typography>}
    </List>
  )
})
