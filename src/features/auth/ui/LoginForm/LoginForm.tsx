import { Typography } from '@mui/material'
import Button from '@mui/material/Button'
import Checkbox from '@mui/material/Checkbox'
import FormControl from '@mui/material/FormControl'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormGroup from '@mui/material/FormGroup'
import TextField from '@mui/material/TextField'
import Tooltip from '@mui/material/Tooltip'
import { useTranslation } from 'react-i18next'

import { useLogin } from '../../model/hooks/useLogin/useLogin'

export const LoginForm = () => {
  const { t } = useTranslation()

  const { formikLogin } = useLogin()

  return (
    <form onSubmit={formikLogin.handleSubmit}>
      <FormControl sx={{ p: 1, minWidth: '300px' }}>
        <FormGroup sx={{ alignItems: 'center' }}>
          <Tooltip title='free@samuraijs.com:free'>
            <Button href={'https://social-network.samuraijs.com/'} target={'_blank'}>
              {t('Register here')}
            </Button>
          </Tooltip>
          <TextField
            fullWidth
            margin='normal'
            id='email'
            label={t('Email')}
            error={formikLogin.touched.email && Boolean(formikLogin.errors.email)}
            helperText={formikLogin.touched.email && formikLogin.errors.email}
            {...formikLogin.getFieldProps('email')}
          />
          <TextField
            fullWidth
            margin='normal'
            id='password'
            label={t('Password')}
            type='password'
            error={formikLogin.touched.password && Boolean(formikLogin.errors.password)}
            helperText={formikLogin.touched.password && formikLogin.errors.password}
            {...formikLogin.getFieldProps('password')}
          />
          <FormControlLabel
            id='rememberMe'
            label={t('Remember me')}
            control={<Checkbox />}
            {...formikLogin.getFieldProps('rememberMe')}
          />
          <Button color='primary' variant='contained' type='submit'>
            {t('Login')}
          </Button>
          <Typography color={'error'} sx={{ mt: 1 }}>
            {formikLogin.errors.serverError}
          </Typography>
        </FormGroup>
      </FormControl>
    </form>
  )
}
