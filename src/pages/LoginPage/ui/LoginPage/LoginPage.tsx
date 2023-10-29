import Grid from '@mui/material/Grid'
import React from 'react'
import { Navigate } from 'react-router-dom'

import { useAppSelector } from 'app/providers/store'
import { LoginForm, getUserData } from 'features/auth'

const LoginPage = () => {
  const userData = useAppSelector(getUserData)

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
