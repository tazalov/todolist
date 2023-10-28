import { Snackbar } from '@mui/material'
import MuiAlert, { AlertProps } from '@mui/material/Alert'
import * as React from 'react'
import { memo } from 'react'
import { useSelector } from 'react-redux'

import { SetError, SetStatus } from '../../model/actions/notification.actions'
import { getError } from '../../model/selectors/notification'

import { useAppDispatch } from 'app/providers/store'

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant='filled' {...props} />
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
    dispatch(SetStatus('idle'))
  }

  return (
    <Snackbar open={isOpen} autoHideDuration={4000} onClose={handleClose}>
      <Alert onClose={handleClose} severity='error' sx={{ width: '100%' }}>
        {errorMessage}
      </Alert>
    </Snackbar>
  )
})
