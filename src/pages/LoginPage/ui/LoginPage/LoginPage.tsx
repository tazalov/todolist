import Grid from '@mui/material/Grid'
import React from 'react'
import { Navigate } from 'react-router-dom'

import { LoginForm, getAuthUserData } from 'features/auth'
import { useAppSelector } from 'shared/lib/hooks'

const LoginPage = () => {
  const userData = useAppSelector(getAuthUserData)

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
