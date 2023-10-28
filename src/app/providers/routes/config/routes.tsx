import { RouteProps } from 'react-router-dom'

import { LoginPage } from 'pages/LoginPage'
import { TodoListsPage } from 'pages/TodoListsPage'

export enum AppRoutes {
  MAIN = 'main',
  LOGIN = 'login',
  //NOT_FOUND = 'not_found',
}

export const RoutePath: Record<AppRoutes, string> = {
  [AppRoutes.MAIN]: '/',
  [AppRoutes.LOGIN]: '/login',
  //[AppRoutes.NOT_FOUND]: '*',
}

export const routeConfig: Record<AppRoutes, RouteProps> = {
  [AppRoutes.MAIN]: {
    path: RoutePath.main,
    element: <TodoListsPage />,
  },
  [AppRoutes.LOGIN]: {
    path: RoutePath.login,
    element: <LoginPage />,
  },
}
