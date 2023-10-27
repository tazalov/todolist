import { FC, useCallback, Suspense } from 'react'
import { RouteProps, Route, Routes } from 'react-router-dom'
import { routeConfig } from '../config/routes'
import { PageLoader } from 'shared/ui/PageLoader/PageLoader'

export const AppRouter: FC = () => {
  const renderWithWrapper = useCallback(
    (route: RouteProps) => <Route key={route.path} path={route.path} element={route.element} />,
    [],
  )

  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>{Object.values(routeConfig).map(renderWithWrapper)}</Routes>
    </Suspense>
  )
}
