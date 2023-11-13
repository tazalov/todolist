import React, { ReactNode } from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

import { RoutePath } from '../config/routes'

import { authSelectors } from 'features/auth'

export const ProtectedAuth = ({ children }: { children: ReactNode }) => {
  const auth = useSelector(authSelectors.userData)

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
