import { FilterT, RemoveTodolist } from '../../../entities/todolist'
import { useSelector } from 'react-redux'
import { getSpecificTasks } from '../../../entities/task/model/selectors/getSpecificTasks'
import { useAppDispatch } from '../../../app/providers'
import { useCallback, useMemo } from 'react'
import {
  ChangeTitleTodolist,
  ChangeFilterTodolist,
} from '../../../entities/todolist/model/actions/todolist.actions'
import { AddTask } from '../../../entities/task/model/actions/tasks.actions'
import { Task } from '../../../entities/task'

export const useTodolist = (todoListId: string, filter: FilterT) => {
  const tasks = useSelector(getSpecificTasks(todoListId))

  const dispatch = useAppDispatch()

  const remove = () => {
    dispatch(RemoveTodolist(todoListId))
  }
  const changeTitle = useCallback(
    (title: string) => {
      dispatch(ChangeTitleTodolist(todoListId, title))
    },
    [todoListId, dispatch],
  )

  const changeFilter = useCallback(
    (filter: FilterT) => () => {
      dispatch(ChangeFilterTodolist(todoListId, filter))
    },
    [dispatch, todoListId],
  )

  const addTask = useCallback(
    (title: string) => {
      dispatch(AddTask(todoListId, title))
    },
    [todoListId, dispatch],
  )

  const tasksArray = useMemo(() => {
    switch (filter) {
      case 'active': {
        return tasks.filter(el => !el.isDone)
      }
      case 'completed': {
        return tasks.filter(el => el.isDone)
      }
      default: {
        return tasks
      }
    }
  }, [tasks, filter])

  const tasksList = tasksArray.map(el => <Task key={el.id} todoListId={todoListId} task={el} />)

  return {
    tasks: tasksList,
    remove,
    changeTitle,
    changeFilter,
    addTask,
  }
}
