import AddIcon from '@mui/icons-material/Add'
import { Fab, Snackbar, Stack, TextField, Tooltip } from '@mui/material'
import MuiAlert, { AlertProps } from '@mui/material/Alert'
import { ChangeEvent, FC, forwardRef, KeyboardEvent, SyntheticEvent, useState } from 'react'

const Alert = forwardRef<HTMLDivElement, AlertProps>(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
})

type AddItemFormPT = {
  addItem: (title: string) => void
}

export const AddItemForm: FC<AddItemFormPT> = ({ addItem }) => {
  const [title, setTitle] = useState<string>('')
  const [error, setError] = useState<string>('')
  const [successNotification, setSuccessNotification] = useState<boolean>(true)

  //! ---------- work with notification
  const handleClose = (event?: SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return
    }
    setSuccessNotification(false)
  }

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
      setSuccessNotification(true)
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
      <Snackbar open={successNotification} autoHideDuration={3000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
          Success creating
        </Alert>
      </Snackbar>
    </Stack>
  )
}
