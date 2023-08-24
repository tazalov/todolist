import TextField from '@mui/material/TextField'
import { ChangeEvent, FC, KeyboardEvent, useState } from 'react'

type EditableSpanPT = {
  title: string
  //titleType: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'subtitle1' | 'subtitle2' | 'body1' | 'body2'
  changeTitle: (newTitle: string) => void
}

export const EditableSpan: FC<EditableSpanPT> = ({ title, changeTitle }) => {
  const [editMode, setEditMode] = useState<boolean>(false)
  const [currentTitle, setCurrentTitle] = useState<string>('')
  const [error, setError] = useState<string>('')

  //! ---------- (de)activate edit mode for current title
  const activateEditMode = () => {
    setEditMode(true)
    setCurrentTitle(title)
  }
  const deactivateEditMode = () => setEditMode(false)

  //! ---------- update current title
  const updateTitle = () => {
    const newTitle = currentTitle.trim()
    if (newTitle.length === 0) {
      setError("Value can't be empty")
    } else if (newTitle !== title) {
      changeTitle(currentTitle)
      deactivateEditMode()
    }
  }
  const updateTitleKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      updateTitle()
    }
  }
  const updateTitleBlurHandler = () => {
    deactivateEditMode()
    setError('')
  }

  //! ---------- handler for input with current title
  const onChangeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setCurrentTitle(e.currentTarget.value)
    setError('')
  }

  return editMode ? (
    <TextField
      fullWidth
      variant="standard"
      error={!!error}
      helperText={error}
      value={currentTitle}
      onChange={onChangeTitleHandler}
      onBlur={updateTitleBlurHandler}
      onKeyDown={updateTitleKeyDownHandler}
      autoFocus
      InputProps={{
        classes: {
          root: 'inherit', // Apply the 'inherit' class to the root element of TextField
          input: 'inherit', // Apply the 'inherit' class to the input element of TextField
        },
        style: {
          fontSize: 'inherit',
          fontWeight: 'inherit',
        },
      }}
    />
  ) : (
    <span
      style={{
        borderBottom: '1px solid transparent',
        width: '100%',
        display: 'block',
        cursor: 'pointer',
      }}
      onDoubleClick={activateEditMode}
    >
      {title}
    </span>
  )
}
