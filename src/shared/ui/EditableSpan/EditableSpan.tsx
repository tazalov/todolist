import ErrorIcon from '@mui/icons-material/Error'
import SaveIcon from '@mui/icons-material/Save'
import { TextField, Tooltip, Typography, InputAdornment, IconButton } from '@mui/material'
import { TypographyOwnProps } from '@mui/material/Typography/Typography'
import { memo, useState, ChangeEvent } from 'react'
import { useTranslation } from 'react-i18next'

const inheritStyleInput: any = {
  lineHeight: 'inherit',
  fontSize: 'inherit',
  fontWeight: 'inherit',
  textAlign: 'inherit',
  padding: 0,
}

interface Props extends TypographyOwnProps {
  title: string
  changeTitle: (newTitle: string) => void
  disabled?: boolean
}

export const EditableSpan = memo(({ title, changeTitle, disabled = false, ...rest }: Props) => {
  const { t } = useTranslation()

  const [editMode, setEditMode] = useState<boolean>(false)
  const [currentTitle, setCurrentTitle] = useState<string>('')
  const [error, setError] = useState<boolean>(false)

  const activateEditMode = () => {
    if (!disabled) {
      setEditMode(true)
      setCurrentTitle(title)
    }
  }
  const deactivateEditMode = () => setEditMode(false)

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCurrentTitle(e.currentTarget.value)
    setError(false)
  }

  const updateTitle = () => {
    const newTitle = currentTitle.trim()
    if (newTitle.length === 0) {
      setError(true)
    } else {
      changeTitle(currentTitle)
      deactivateEditMode()
    }
  }

  return (
    <Tooltip title={t('Double click for edit')}>
      <Typography
        width='100%'
        onDoubleClick={activateEditMode}
        sx={{ cursor: 'pointer', textOverFlow: 'ellipsis', wordBreak: 'break-all' }}
        {...rest}
      >
        {editMode ? (
          <TextField
            variant='standard'
            error={error}
            value={currentTitle}
            onChange={handleChange}
            InputProps={{
              style: inheritStyleInput,
              endAdornment: (
                <InputAdornment position='end'>
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
