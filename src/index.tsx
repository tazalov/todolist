import React from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'

import * as serviceWorker from './serviceWorker'

import { router } from 'app/providers/routes'
import { StoreProvider } from 'app/providers/store'
import { ThemeContext } from 'app/styles/ThemeContext'

const container = document.getElementById('root')
const root = createRoot(container!)
root.render(
  <StoreProvider>
    <ThemeContext>
      <RouterProvider router={router} />
    </ThemeContext>
  </StoreProvider>,
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
