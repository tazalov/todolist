import { useEffect } from 'react'

import { AppRouter } from './providers/routes/ui/AppRouter'
import { useAppDispatch, useAppSelector } from './providers/store'

import { PageError } from '../widgets/PageError'

import { ErrorSnackbar, SuccessSnackbar } from 'entities/notification'
import { getInited, initUser, getAuthError } from 'features/auth'
import { PageLoader } from 'shared/ui/PageLoader/PageLoader'
import { Header } from 'widgets/Header'

export const App = () => {
  const _inited = useAppSelector(getInited)
  const error = useAppSelector(getAuthError)

  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(initUser())
  }, [])

  if (!_inited) {
    return <PageLoader />
  }

  if (error) {
    return <PageError error={error} />
  }

  return (
    <>
      <Header />
      {_inited && <AppRouter />}
      <ErrorSnackbar />
      <SuccessSnackbar />
    </>
  )
}
