import TextField from '@mui/material/TextField'
import Tooltip from '@mui/material/Tooltip'
import { ChangeEvent, FC, KeyboardEvent, useState } from 'react'

type EditableSpanPT = {
  title: string
  titleAlign?: 'left' | 'center' | 'right'
  changeTitle: (newTitle: string) => void
}
//          textAlign: titleAlign,
export const EditableSpan: FC<EditableSpanPT> = ({ title, titleAlign = 'left', changeTitle }) => {
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
      InputProps={{
        classes: {
          root: 'inherit',
          input: 'inherit',
        },
        style: {
          fontSize: 'inherit',
          fontWeight: 'inherit',
          letterSpacing: 'inherit',
        },
      }}
      inputProps={{
        style: {
          textAlign: titleAlign,
        },
      }}
      autoFocus
    />
  ) : (
    <Tooltip title="Double click for edit">
      <span
        style={{
          width: '100%',
          display: 'block',
          cursor: 'pointer',
          textAlign: titleAlign,
        }}
        onDoubleClick={activateEditMode}
      >
        {title}
      </span>
    </Tooltip>
  )
}
