import { useEffect } from 'react'

import { AppRouter } from './providers/routes/ui/AppRouter'

import { PageError } from '../widgets/PageError'

import { ErrorSnackbar, SuccessSnackbar } from 'entities/notification'
import { getAuthInited, initUser, getAuthError } from 'features/auth'
import { useAppSelector, useAction } from 'shared/lib/hooks'
import { PageLoader } from 'shared/ui/PageLoader/PageLoader'
import { Header } from 'widgets/Header'

export const App = () => {
  const _inited = useAppSelector(getAuthInited)
  const error = useAppSelector(getAuthError)

  const actions = useAction({ initUser })

  useEffect(() => {
    actions.initUser()
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
