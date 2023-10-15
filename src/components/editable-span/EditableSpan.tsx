import { TextField, Tooltip, Typography, InputAdornment, IconButton } from '@mui/material'
import ErrorIcon from '@mui/icons-material/Error'
import SaveIcon from '@mui/icons-material/Save'
import { FC, memo } from 'react'
import { TypographyOwnProps } from '@mui/material/Typography/Typography'
import { useEditableSpan } from '../../utils/hooks'

const inheritStyleInput: any = {
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
  const { currentTitle, editMode, error, activateEditMode, handleChange, updateTitle } =
    useEditableSpan(title, changeTitle)

  return (
    <Tooltip title="Double click for edit">
      <Typography
        width="100%"
        onDoubleClick={activateEditMode}
        sx={{ cursor: 'pointer', textOverFlow: 'ellipsis', wordBreak: 'break-all' }}
        {...rest}
      >
        {editMode ? (
          <TextField
            variant="standard"
            error={error}
            value={currentTitle}
            onChange={handleChange}
            InputProps={{
              style: inheritStyleInput,
              endAdornment: (
                <InputAdornment position="end">
                  {error ? (
                    <ErrorIcon color={'error'} />
                  ) : (
                    <IconButton onClick={updateTitle} size={'small'} disableRipple>
                      <SaveIcon />
                    </IconButton>
                  )}
                </InputAdornment>
              ),
            }}
            inputProps={{ style: inheritStyleInput }}
            multiline
            maxRows={3}
            autoFocus
            fullWidth
          />
        ) : (
          title
        )}
      </Typography>
    </Tooltip>
  )
})
