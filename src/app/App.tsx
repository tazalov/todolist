import { Header } from 'widgets/Header'
import { ErrorSnackbar, SuccessSnackbar } from 'entities/notification'
import { AppRouter } from './providers/routes/ui/AppRouter'
import { useSelector } from 'react-redux'
import { getInited, initUser } from 'features/auth'
import { useEffect } from 'react'
import { useAppDispatch } from './providers/store'
import { PageLoader } from 'shared/ui/PageLoader/PageLoader'

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
