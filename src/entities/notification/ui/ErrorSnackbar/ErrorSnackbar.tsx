import { Snackbar } from '@mui/material'
import MuiAlert, { AlertProps } from '@mui/material/Alert'
import * as React from 'react'
import { memo } from 'react'

import { getNotificationError, getNotificationStatus } from '../../model/selectors/notification'
import { notificationActions } from '../../model/slice/notification.slice'

import { useAppSelector, useAction } from 'shared/lib/hooks'

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant='filled' {...props} />
})

export const ErrorSnackbar = memo(() => {
  const errorMessage = useAppSelector(getNotificationError)
  const status = useAppSelector(getNotificationStatus)

  const { setNotificationData } = useAction(notificationActions)

  const isOpen = errorMessage !== undefined && status === 'failed'

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return
    }
    setNotificationData({ status: 'idle' })
  }

  return (
    <Snackbar open={isOpen} autoHideDuration={4000} onClose={handleClose}>
      <Alert onClose={handleClose} severity='error' sx={{ width: '100%' }}>
        {errorMessage}
      </Alert>
    </Snackbar>
  )
})
