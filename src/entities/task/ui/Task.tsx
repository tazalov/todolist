import { Checkbox, ListItem, Typography } from '@mui/material'
import { ChangeEvent, FC, memo, useCallback } from 'react'
import { EditableSpan } from 'components'
import { useAppDispatch } from '../../../app/providers'
import { ChangeStatusTask, ChangeTitleTask, RemoveTask } from '../model/actions/tasks.actions'
import { TaskT } from '../model/types/tasks.reducer'
import { TodoMenu } from './todo-menu/TodoMenu'

type TodoPT = {
  todoListId: string
  task: TaskT
}

export const Task: FC<TodoPT> = memo(({ todoListId, task }) => {
  const { id, title, isDone } = task

  const dispatch = useAppDispatch()

  const remove = () => {
    dispatch(RemoveTask(todoListId, id))
  }

  const onChangeDoneHandler = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(ChangeStatusTask(todoListId, id, e.currentTarget.checked))
  }

  const changeCurrentTitle = useCallback(
    (newTitle: string) => {
      dispatch(ChangeTitleTask(todoListId, id, newTitle))
    },
    [dispatch, todoListId, id],
  )

  return (
    <ListItem
      role="listitem"
      disablePadding
      sx={{
        borderWidth: '2px',
        borderColor: 'error.main',
        borderStyle: 'solid',
        borderRadius: '5px',
        mt: 1,
        p: 0.5,
      }}
    >
      <Checkbox color="secondary" checked={isDone} onChange={onChangeDoneHandler} />
      <Typography
        variant={'h6'}
        sx={{
          height: '1.5em',
          display: 'inline-flex',
          width: '100%',
          alignItems: 'center',
        }}
      >
        <EditableSpan title={title} changeTitle={changeCurrentTitle} />
      </Typography>
      <TodoMenu remove={remove} />
    </ListItem>
  )
})
