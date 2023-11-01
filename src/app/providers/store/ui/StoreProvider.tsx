import { ReducersMapObject } from '@reduxjs/toolkit'
import { FC, ReactNode } from 'react'
import { Provider } from 'react-redux'

import { DeepPartial } from 'redux'

import { StateSchema } from '../config/StateSchema'
import { createReduxStore } from '../config/store'

type StoreProviderPT = {
  children: ReactNode
  initialState?: DeepPartial<StateSchema>
  asyncReducers?: ReducersMapObject
}

export const StoreProvider: FC<StoreProviderPT> = ({ children, initialState, asyncReducers }) => {
  const store = createReduxStore(initialState as StateSchema, asyncReducers)
  return <Provider store={store}>{children}</Provider>
}
