import * as React from 'react'
import { memo } from 'react'
import { Snackbar } from '@mui/material'
import MuiAlert, { AlertProps } from '@mui/material/Alert'
import { useSelector } from 'react-redux'
import { useAppDispatch } from 'app/providers/store'
import { getStatus } from '../../model/selectors/notification'
import { SetStatus } from '../../model/actions/notification.actions'

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
})

export const SuccessSnackbar = memo(() => {
  const dispatch = useAppDispatch()

  const status = useSelector(getStatus)

  const isSuccess = status === 'succeed'

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return
    }
    dispatch(SetStatus('idle'))
  }

  return (
    <Snackbar open={isSuccess} autoHideDuration={1000} onClose={handleClose}>
      <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
        Success
      </Alert>
    </Snackbar>
  )
})
