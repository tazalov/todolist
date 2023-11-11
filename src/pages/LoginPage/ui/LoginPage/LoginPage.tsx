import Grid from '@mui/material/Grid'
import React from 'react'
import { Navigate } from 'react-router-dom'

import { LoginForm, authSelectors } from 'features/auth'
import { useAppSelector } from 'shared/lib/hooks'

const LoginPage = () => {
  const userData = useAppSelector(authSelectors.userData)

  if (userData) {
    return <Navigate to={'/'} />
  }

  return (
    <Grid container justifyContent={'center'}>
      <Grid item justifyContent={'center'}>
        <LoginForm />
      </Grid>
    </Grid>
  )
}

export default LoginPage
