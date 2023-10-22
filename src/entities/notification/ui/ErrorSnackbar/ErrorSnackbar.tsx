import * as React from 'react'
import { memo } from 'react'
import { Snackbar } from '@mui/material'
import MuiAlert, { AlertProps } from '@mui/material/Alert'
import { useSelector } from 'react-redux'
import { useAppDispatch } from 'app/providers/store'
import { getError } from '../../model/selectors/notification'
import { SetError } from '../../model/actions/notification.actions'

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
})

export const ErrorSnackbar = memo(() => {
  const dispatch = useAppDispatch()

  const errorMessage = useSelector(getError)

  const isOpen = errorMessage !== null

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return
    }
    dispatch(SetError(null))
  }

  return (
    <Snackbar open={isOpen} autoHideDuration={4000} onClose={handleClose}>
      <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
        {errorMessage}
      </Alert>
    </Snackbar>
  )
})
