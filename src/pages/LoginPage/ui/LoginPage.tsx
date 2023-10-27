import React from 'react'
import Grid from '@mui/material/Grid'
import { LoginForm } from 'features/auth'

const LoginPage = () => {
  return (
    <Grid container justifyContent={'center'}>
      <Grid item justifyContent={'center'}>
        <LoginForm />
      </Grid>
    </Grid>
  )
}

export default LoginPage
