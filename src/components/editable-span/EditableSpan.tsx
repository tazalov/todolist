import { TextField, Tooltip, Typography } from '@mui/material'
import { ChangeEvent, FC, KeyboardEvent, memo, useState } from 'react'
import { TypographyOwnProps } from '@mui/material/Typography/Typography'

const inheritStyleInput: any = {
  height: 'inherit',
  lineHeight: 'inherit',
  fontSize: 'inherit',
  fontWeight: 'inherit',
  textAlign: 'inherit',
  padding: 0,
}

interface EditableSpanPT extends TypographyOwnProps {
  title: string
  changeTitle: (newTitle: string) => void
}

export const EditableSpan: FC<EditableSpanPT> = memo(({ title, changeTitle, ...rest }) => {
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

  return (
    <Tooltip title="Double click for edit">
      <Typography
        height={'1.6em'}
        width="100%"
        onDoubleClick={activateEditMode}
        sx={{ cursor: 'pointer' }}
        {...rest}
      >
        {editMode ? (
          <TextField
            fullWidth
            variant="standard"
            error={!!error}
            helperText={error}
            value={currentTitle}
            onChange={onChangeTitleHandler}
            onBlur={updateTitleBlurHandler}
            onKeyDown={updateTitleKeyDownHandler}
            InputProps={{ style: inheritStyleInput }}
            inputProps={{ style: inheritStyleInput }}
            autoFocus
          />
        ) : (
          title
        )}
      </Typography>
    </Tooltip>
  )
})
