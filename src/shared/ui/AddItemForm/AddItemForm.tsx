import AddBoxIcon from '@mui/icons-material/AddBox'
import { Stack, TextField, Tooltip, IconButton } from '@mui/material'
import { FC, memo, useState, ChangeEvent, KeyboardEvent } from 'react'
import { useTranslation } from 'react-i18next'

interface AddItemFormPT {
  addItem: (title: string) => void | Promise<any>
  disabled?: boolean
}

export const AddItemForm: FC<AddItemFormPT> = memo(({ addItem, disabled = false }) => {
  const { t } = useTranslation()

  const [title, setTitle] = useState<string>('')
  const [error, setError] = useState<string>('')

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value)
    setError('')
  }

  const handleBlur = () => {
    setError('')
  }

  const addNewItem = async () => {
    const newTitle = title.trim()
    if (!newTitle.length) {
      setError("Value can't be empty")
    } else {
      const serverError = await addItem(newTitle)
      if (serverError) {
        setError('Error')
      } else {
        setTitle('')
      }
    }
  }

  const handleKeyDownAddItem = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      addNewItem()
    }
  }

  return (
    <Stack direction='row' justifyContent='center' alignItems='center' spacing={1}>
      <TextField
        label={error || t('Enter title')}
        variant='outlined'
        size='small'
        error={!!error}
        value={title}
        onChange={handleChange}
        onKeyDown={handleKeyDownAddItem}
        onBlur={handleBlur}
        disabled={disabled}
      />
      <Tooltip title={t('Create new item')}>
        <IconButton onClick={addNewItem} color={'success'} disabled={!!error || disabled}>
          <AddBoxIcon fontSize='large' />
        </IconButton>
      </Tooltip>
    </Stack>
  )
})
