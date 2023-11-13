import { createHashRouter } from 'react-router-dom'

import { ProtectedAuth } from '../ui/ProtectedAuth'

import { LoginPage } from 'pages/LoginPage'
import { NotFound } from 'pages/NotFound'
import { TodoListsPage } from 'pages/TodoListsPage'
import { RootLayout } from 'widgets/RootLayout'

export enum AppRoutes {
  MAIN = 'main',
  LOGIN = 'login',
  NOT_FOUND = 'not_found',
}

export const RoutePath: Record<AppRoutes, string> = {
  [AppRoutes.MAIN]: '/',
  [AppRoutes.LOGIN]: '/login',
  [AppRoutes.NOT_FOUND]: '*',
}

export const router = createHashRouter([
  {
    element: <RootLayout />,
    children: [
      {
        path: RoutePath.main,
        element: (
          <ProtectedAuth>
            <TodoListsPage />
          </ProtectedAuth>
        ),
      },
      {
        path: RoutePath.login,
        element: <LoginPage />,
      },
      {
        path: RoutePath.not_found,
        element: <NotFound />,
      },
    ],
  },
])
