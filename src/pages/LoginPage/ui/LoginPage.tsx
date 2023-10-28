import Grid from '@mui/material/Grid'
import React from 'react'

import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

import { LoginForm, getUserData } from 'features/auth'

const LoginPage = () => {
  const userData = useSelector(getUserData)

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
