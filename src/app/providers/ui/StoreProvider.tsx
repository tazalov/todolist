import { FC, ReactNode } from 'react'
import { Provider } from 'react-redux'
import { store } from '../config/store'

type StoreProviderPT = {
  children: ReactNode
}

export const StoreProvider: FC<StoreProviderPT> = ({ children }) => {
  return <Provider store={store}>{children}</Provider>
}
