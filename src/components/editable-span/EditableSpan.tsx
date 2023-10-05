import { TextField, Tooltip, Typography, InputAdornment } from '@mui/material'
import ErrorIcon from '@mui/icons-material/Error'
import { FC, memo } from 'react'
import { TypographyOwnProps } from '@mui/material/Typography/Typography'
import { useEditableSpan } from '../../utils/hooks/useEditableSpan/useEditableSpan'

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
  const {
    currentTitle,
    editMode,
    error,
    activateEditMode,
    handleChange,
    handleKeyDownUpdateTitle,
    handleBlurUpdateTitle,
  } = useEditableSpan(title, changeTitle)

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
            variant="standard"
            error={error}
            value={currentTitle}
            onChange={handleChange}
            onBlur={handleBlurUpdateTitle}
            onKeyDown={handleKeyDownUpdateTitle}
            InputProps={{
              style: inheritStyleInput,
              endAdornment: error && (
                <InputAdornment position="start">
                  <ErrorIcon color={'error'} />
                </InputAdornment>
              ),
            }}
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
