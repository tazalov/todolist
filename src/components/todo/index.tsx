import { Checkbox, ListItem, Typography } from '@mui/material'
import { ChangeEvent, FC } from 'react'
import { EditableSpan } from '../common'
import { TodoMenu } from './todo-menu'

type TodoPT = {
  title: string
  isDone: boolean
  changeIsDone: (isDone: boolean) => void
  changeTitle: (title: string) => void
  remove: () => void
}

export const Todo: FC<TodoPT> = ({ title, isDone, changeIsDone, changeTitle, remove }) => {
  //! ---------- change isDone current task
  const onChangeDoneHandler = (e: ChangeEvent<HTMLInputElement>) => {
    changeIsDone(e.currentTarget.checked)
  }

  //! ---------- change title current task
  const changeCurrentTitle = (newTitle: string) => {
    changeTitle(newTitle)
  }

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
}
