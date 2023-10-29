import Button from '@mui/material/Button'
import Checkbox from '@mui/material/Checkbox'
import FormControl from '@mui/material/FormControl'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormGroup from '@mui/material/FormGroup'
import TextField from '@mui/material/TextField'
import Tooltip from '@mui/material/Tooltip'
import { useFormik } from 'formik'
import * as yup from 'yup'

import { loginUser } from '../../model/services/loginUser/loginUser'

import { useAppDispatch } from 'app/providers/store'

const validationSchema = yup.object({
  email: yup.string().email('Enter a valid email').required('Email is required'),
  password: yup.string().min(4, 'Password should be of minimum 4 characters length').required('Password is required'),
})

export const LoginForm = () => {
  const dispatch = useAppDispatch()

  const formik = useFormik({
    initialValues: {
      email: 'free@samuraijs.com',
      password: 'free',
      rememberMe: false,
    },
    validationSchema,
    onSubmit: (values) => {
      console.log(JSON.stringify(values, null, 2))
      dispatch(loginUser(values))
    },
  })

  return (
    <form onSubmit={formik.handleSubmit}>
      <FormControl sx={{ p: 1, minWidth: '300px' }}>
        <FormGroup sx={{ alignItems: 'center' }}>
          <Tooltip title='free@samuraijs.com:free'>
            <Button href={'https://social-network.samuraijs.com/'} target={'_blank'}>
              Register here
            </Button>
          </Tooltip>
          <TextField
            fullWidth
            margin='normal'
            id='email'
            label='Email'
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
            {...formik.getFieldProps('email')}
          />
          <TextField
            fullWidth
            margin='normal'
            id='password'
            label='Password'
            type='password'
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
            {...formik.getFieldProps('password')}
          />
          <FormControlLabel
            id='rememberMe'
            label={'Remember me'}
            control={<Checkbox />}
            {...formik.getFieldProps('rememberMe')}
          />
          <Button color='primary' variant='contained' type='submit'>
            Login
          </Button>
        </FormGroup>
      </FormControl>
    </form>
  )
}
