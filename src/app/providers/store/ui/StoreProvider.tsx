import { FC, ReactNode } from 'react'
import { Provider } from 'react-redux'
import { createReduxStore } from '../config/store'
import { StateSchema } from '../config/StateSchema'
import { DeepPartial } from 'redux'

type StoreProviderPT = {
  children: ReactNode
  initialState?: DeepPartial<StateSchema>
}

export const StoreProvider: FC<StoreProviderPT> = ({ children, initialState }) => {
  const store = createReduxStore(initialState as StateSchema)
  return <Provider store={store}>{children}</Provider>
}
