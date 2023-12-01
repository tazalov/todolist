import { ReducersMapObject } from '@reduxjs/toolkit'
import { ReactNode } from 'react'
import { Provider } from 'react-redux'

import { DeepPartial } from 'redux'

import { StateSchema } from '../config/StateSchema'
import { createReduxStore } from '../config/store'

type Props = {
  children: ReactNode
  initialState?: DeepPartial<StateSchema>
  asyncReducers?: ReducersMapObject
}

export const StoreProvider = ({ children, initialState, asyncReducers }: Props) => {
  const store = createReduxStore(initialState as StateSchema, asyncReducers)
  return <Provider store={store}>{children}</Provider>
}
