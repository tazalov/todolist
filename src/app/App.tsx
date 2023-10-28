import { useEffect } from 'react'
import { useSelector } from 'react-redux'

import { AppRouter } from './providers/routes/ui/AppRouter'

import { useAppDispatch } from './providers/store'

import { ErrorSnackbar, SuccessSnackbar } from 'entities/notification'

import { getInited, initUser } from 'features/auth'

import { PageLoader } from 'shared/ui/PageLoader/PageLoader'
import { Header } from 'widgets/Header'

export const App = () => {
  const _inited = useSelector(getInited)

  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(initUser())
  }, [])

  if (!_inited) {
    return <PageLoader />
  }

  return (
    <>
      <Header />
      <AppRouter />
      <ErrorSnackbar />
      <SuccessSnackbar />
    </>
  )
}
