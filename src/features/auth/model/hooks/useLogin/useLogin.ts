import { useFormik } from 'formik'
import * as yup from 'yup'

import { loginUser } from '../../services/loginUser/loginUser'

import { notificationActions } from 'entities/notification'
import { BaseResponse } from 'shared/api/types/todolist'
import { useAppDispatch } from 'shared/lib/hooks'

const validationSchema = yup.object({
  email: yup.string().email('Enter a valid email').required('Email is required'),
  password: yup.string().min(4, 'Password should be of minimum 4 characters length').required('Password is required'),
})

export const useLogin = () => {
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
        .catch((res: BaseResponse) => {
          res.fieldsErrors?.forEach((el: any) => formikHelpers.setFieldError(el.field, el.error))
        })
        .finally(() => dispatch(notificationActions.setStatus('idle')))
    },
  })

  return { formikLogin: formik }
}
