import { Typography } from '@mui/material'
import Button from '@mui/material/Button'
import Checkbox from '@mui/material/Checkbox'
import FormControl from '@mui/material/FormControl'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormGroup from '@mui/material/FormGroup'
import TextField from '@mui/material/TextField'
import Tooltip from '@mui/material/Tooltip'
import { useFormik } from 'formik'
import { useTranslation } from 'react-i18next'
import * as yup from 'yup'

import { loginUser } from '../../model/services/loginUser/loginUser'

import { notificationActions } from 'entities/notification'
import { BaseResponseT } from 'shared/api/types/todolist'
import { useAppDispatch } from 'shared/lib/hooks'

const validationSchema = yup.object({
  email: yup.string().email('Enter a valid email').required('Email is required'),
  password: yup.string().min(4, 'Password should be of minimum 4 characters length').required('Password is required'),
})

export const LoginForm = () => {
  const { t } = useTranslation()

  const dispatch = useAppDispatch()

  const formik = useFormik({
    initialValues: {
      email: 'free@samuraijs.com',
      password: 'free',
      rememberMe: false,
      serverError: undefined,
    },
    validationSchema,
    onSubmit: (values, formikHelpers) => {
      dispatch(loginUser(values))
        .unwrap()
        .catch((res: BaseResponseT) => {
          res.fieldsErrors?.forEach((el: any) => formikHelpers.setFieldError(el.field, el.error))
        })
        .finally(() => dispatch(notificationActions.setStatus('idle')))
    },
  })

  return (
    <form onSubmit={formik.handleSubmit}>
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
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
            {...formik.getFieldProps('email')}
          />
          <TextField
            fullWidth
            margin='normal'
            id='password'
            label={t('Password')}
            type='password'
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
            {...formik.getFieldProps('password')}
          />
          <FormControlLabel
            id='rememberMe'
            label={t('Remember me')}
            control={<Checkbox />}
            {...formik.getFieldProps('rememberMe')}
          />
          <Button color='primary' variant='contained' type='submit'>
            {t('Login')}
          </Button>
          <Typography color={'error'} sx={{ mt: 1 }}>
            {formik.errors.serverError}
          </Typography>
        </FormGroup>
      </FormControl>
    </form>
  )
}
