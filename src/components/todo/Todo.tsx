import DeleteIcon from '@mui/icons-material/Delete'
import { IconButton, ListItem } from '@mui/material'
import Checkbox from '@mui/material/Checkbox'
import Typography from '@mui/material/Typography'
import { ChangeEvent, FC } from 'react'
import { EditableSpan } from '../common/editableSpan/EditableSpan'

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
    <ListItem role="listitem" disablePadding>
      <Checkbox color="success" checked={isDone} onChange={onChangeDoneHandler} />
      <Typography
        variant={'h6'}
        style={{
          height: '1.5em',
          display: 'inline-flex',
          width: '100%',
          alignItems: 'center',
        }}
      >
        <EditableSpan title={title} changeTitle={changeCurrentTitle} />
      </Typography>
      <IconButton aria-label="delete todo" size={'medium'} color="default" onClick={remove}>
        <DeleteIcon fontSize="medium" />
      </IconButton>
    </ListItem>
  )
}
