import AddIcon from '@mui/icons-material/Add'
import { Tooltip } from '@mui/material'
import Fab from '@mui/material/Fab'
import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'
import { ChangeEvent, FC, KeyboardEvent, useState } from 'react'

type AddItemFormPT = {
  addItem: (title: string) => void
}

export const AddItemForm: FC<AddItemFormPT> = ({ addItem }) => {
  const [title, setTitle] = useState<string>('')
  const [error, setError] = useState<string>('')

  //! ---------- handler for input value
  const changeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value)
    setError('')
  }

  //! ---------- add item with validate
  const addNewItem = () => {
    const newTitle = title.trim()
    if (!newTitle.length) {
      setError("Value can't be empty")
    } else {
      setTitle('')
      addItem(newTitle)
    }
  }

  //! ---------- handlers for add item
  const addItemHandler = () => {
    addNewItem()
  }
  const addItemKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      addNewItem()
    }
  }

  //! ---------- change error msg
  const onBlurTitleHandler = () => {
    setError('')
  }

  return (
    <Stack direction="row" justifyContent="center" alignItems="center" spacing={1}>
      <TextField
        label={error || 'New title'}
        variant="outlined"
        size="medium"
        error={!!error}
        value={title}
        onChange={changeTitleHandler}
        onKeyDown={addItemKeyDownHandler}
        onBlur={onBlurTitleHandler}
      />
      <Tooltip title="Click to create new item">
        <Fab size={'small'} color="success" onClick={addItemHandler} disabled={!!error}>
          <AddIcon fontSize="large" />
        </Fab>
      </Tooltip>
    </Stack>
  )
}
