import AddBoxIcon from '@mui/icons-material/AddBox'
import { Stack, TextField, Tooltip, IconButton } from '@mui/material'
import { FC, memo } from 'react'
import { useAddItem } from '../../utils/hooks/useAddItem/useAddItem'

interface AddItemFormPT {
  addItem: (title: string) => void
}

export const AddItemForm: FC<AddItemFormPT> = memo(({ addItem }) => {
  const { title, error, handleChange, handleBlur, handleKeyDownAddItem, addNewItem } =
    useAddItem(addItem)

  return (
    <Stack direction="row" justifyContent="center" alignItems="center" spacing={1}>
      <TextField
        label={error || 'New title'}
        variant="outlined"
        size="small"
        error={!!error}
        value={title}
        onChange={handleChange}
        onKeyDown={handleKeyDownAddItem}
        onBlur={handleBlur}
      />
      <Tooltip title="Click to create new item">
        <IconButton onClick={addNewItem} color={'success'} disabled={!!error}>
          <AddBoxIcon fontSize="large" />
        </IconButton>
      </Tooltip>
    </Stack>
  )
})
