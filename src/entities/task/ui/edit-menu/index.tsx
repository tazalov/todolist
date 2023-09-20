import SaveIcon from '@mui/icons-material/Save'
import { Button, Dialog, DialogTitle, List, ListItem, TextField } from '@mui/material'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import dayjs, { Dayjs } from 'dayjs'
import { FC, useState } from 'react'

const today = dayjs()

export interface EditMenuPT {
  open: boolean
  onClose: () => void
}

export const EditMenu: FC<EditMenuPT> = ({ onClose, open }) => {
  const [startDate, setStartDate] = useState<Dayjs | null>(today)
  const [deadLine, setDeadLine] = useState<Dayjs | null>(today)

  const handlerStartDate = (date: Dayjs | null) => setStartDate(date)
  const handlerDeadLine = (date: Dayjs | null) => setDeadLine(date)

  const shouldDisableDate = (date: Dayjs) => {
    if (startDate) {
      return date && date.isBefore(startDate, 'day')
    }
    return false
  }

  return (
    <Dialog onClose={onClose} open={open}>
      <DialogTitle>Set new data for task</DialogTitle>
      <List sx={{ pt: 0 }}>
        <ListItem>
          <TextField label={'New title'} variant="outlined" size="medium" fullWidth />
        </ListItem>
        <ListItem>
          <TextField
            label={'New description'}
            variant="outlined"
            size="medium"
            multiline
            maxRows={4}
            fullWidth
          />
        </ListItem>
        <ListItem sx={{ gap: '10px' }}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker label="Set start date" value={startDate} onChange={handlerStartDate} />
            <DatePicker
              label="Set deadline"
              value={deadLine}
              onChange={handlerDeadLine}
              shouldDisableDate={shouldDisableDate}
            />
          </LocalizationProvider>
        </ListItem>
        <ListItem>
          <Button startIcon={<SaveIcon />} onClick={onClose} variant="contained">
            Save
          </Button>
        </ListItem>
      </List>
    </Dialog>
  )
}
