import AddBoxIcon from '@mui/icons-material/AddBox'
import { IconButton } from '@mui/material'
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
    <Stack direction="row" justifyContent="center" alignItems="center" spacing={0.5}>
      <TextField
        id="outlined-basic"
        label={error ? 'Error' : 'New task'}
        variant="outlined"
        size="small"
        error={!!error}
        helperText={error}
        value={title}
        onChange={changeTitleHandler}
        onKeyDown={addItemKeyDownHandler}
        onBlur={onBlurTitleHandler}
      />
      <IconButton color="success" onClick={addItemHandler} disabled={!!error}>
        <AddBoxIcon />
      </IconButton>
    </Stack>
  )
}
