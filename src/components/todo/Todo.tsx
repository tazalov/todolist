import DeleteIcon from '@mui/icons-material/Delete'
import { IconButton, ListItem, ListItemButton, ListItemText } from '@mui/material'
import Checkbox from '@mui/material/Checkbox'
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
    <ListItem
      role="listitem"
      secondaryAction={
        <IconButton size={'medium'} aria-label="delete" color="primary" onClick={remove}>
          <DeleteIcon fontSize="medium" />
        </IconButton>
      }
      disablePadding
    >
      <ListItemButton>
        <Checkbox color="success" checked={isDone} onChange={onChangeDoneHandler} />
        <ListItemText>
          <EditableSpan title={title} changeTitle={changeCurrentTitle} />
        </ListItemText>
      </ListItemButton>
    </ListItem>
  )
}
