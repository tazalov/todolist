import { Typography, List } from '@mui/material'
import { useMemo, memo } from 'react'
import { useTranslation } from 'react-i18next'

import { taskSelectors } from '../../model/selectors/tasks'
import { TaskStatus } from '../../model/types/TasksSchema'
import { Task } from '../Task/Task'

import { Filter } from 'entities/todolist'
import { useAppSelector } from 'shared/lib/hooks'
import { Loader } from 'shared/ui/Loader/Loader'

interface Props {
  todoId: string
  filter: Filter
}

export const TaskList = memo(({ todoId, filter }: Props) => {
  const { t } = useTranslation()

  const tasks = useAppSelector(taskSelectors.itemsByTodoId(todoId))
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
      {tasks && tasks.length ? tasksList : <Typography align={'center'}>{t('Not found')}</Typography>}
    </List>
  )
})
