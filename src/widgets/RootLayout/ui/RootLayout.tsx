import { useEffect, Suspense } from 'react'

import { Outlet } from 'react-router-dom'

import { ErrorSnackbar, SuccessSnackbar } from 'entities/notification'
import { authSelectors, initUser } from 'features/auth'
import { useAppSelector, useAction } from 'shared/lib/hooks'
import { PageLoader } from 'shared/ui/PageLoader/PageLoader'
import { Header } from 'widgets/Header'
import { PageError } from 'widgets/PageError'

export const RootLayout = () => {
  const _inited = useAppSelector(authSelectors.inited)
  const error = useAppSelector(authSelectors.error)

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
      <Suspense fallback={<PageLoader />}>
        <Outlet />
      </Suspense>
      <ErrorSnackbar />
      <SuccessSnackbar />
    </>
  )
}
