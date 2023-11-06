import { FC, useCallback, Suspense } from 'react'
import React, { ReactNode } from 'react'
import { useSelector } from 'react-redux'
import { Route, Routes, Navigate } from 'react-router-dom'

import { routeConfig, RoutePath, AppRoutesObj } from '../config/routes'

import { getUserData } from 'features/auth'
import { PageLoader } from 'shared/ui/PageLoader/PageLoader'

//* Защищаем роуты, пример из доки
export const RequireAuth = ({ children }: { children: ReactNode }) => {
  const auth = useSelector(getUserData)

  if (!auth) {
    /*
     * Когда пользователь переходит на новый маршрут с помощью <Navigate replace />,
     * текущая запись в истории браузера будет заменена новой записью, и страница будет перерисована с новым маршрутом.
     * Это означает, что при нажатии кнопки "Назад" в браузере пользователь вернется не к предыдущему маршруту,
     * а пропустит его и перейдет к предыдущему предыдущего маршрута:)
     */
    return <Navigate to={RoutePath.login} replace />
  }

  return <>{children}</>
}

export const AppRouter: FC = () => {
  const renderRoute = useCallback(
    (route: AppRoutesObj) => (
      <Route
        key={route.path}
        path={route.path}
        element={route.authOnly ? <RequireAuth>{route.element}</RequireAuth> : route.element}
      />
    ),
    [],
  )

  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>{Object.values(routeConfig).map(renderRoute)}</Routes>
    </Suspense>
  )
}
