import { Snackbar } from '@mui/material'
import MuiAlert, { AlertProps } from '@mui/material/Alert'
import * as React from 'react'
import { memo } from 'react'
import { useSelector } from 'react-redux'

import { SetStatus } from '../../model/actions/notification.actions'
import { getStatus } from '../../model/selectors/notification'

import { useAppDispatch } from 'app/providers/store'

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant='filled' {...props} />
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
      <Alert onClose={handleClose} severity='success' sx={{ width: '100%' }}>
        Success
      </Alert>
    </Snackbar>
  )
})
