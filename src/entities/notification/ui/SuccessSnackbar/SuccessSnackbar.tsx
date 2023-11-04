import { Snackbar } from '@mui/material'
import MuiAlert, { AlertProps } from '@mui/material/Alert'
import * as React from 'react'
import { memo } from 'react'

import { getNotificationSuccess, getNotificationStatus } from '../../model/selectors/notification'
import { notificationActions } from '../../model/slice/notification.slice'

import { useAppDispatch, useAppSelector } from 'app/providers/store'

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant='filled' {...props} />
})

export const SuccessSnackbar = memo(() => {
  const dispatch = useAppDispatch()

  const successMessage = useAppSelector(getNotificationSuccess)
  const status = useAppSelector(getNotificationStatus)

  const isOpen = successMessage !== undefined && status === 'succeed'

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return
    }
    dispatch(notificationActions.setStatus('idle'))
  }

  return (
    <Snackbar open={isOpen} autoHideDuration={2000} onClose={handleClose}>
      <Alert onClose={handleClose} severity='success' sx={{ width: '100%' }}>
        {successMessage}
      </Alert>
    </Snackbar>
  )
})
