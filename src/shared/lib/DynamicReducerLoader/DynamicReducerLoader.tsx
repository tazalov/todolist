import { Reducer } from '@reduxjs/toolkit'

import { FC, useEffect, ReactNode } from 'react'
import { useStore, useDispatch } from 'react-redux'

import { KeysReducers, StoreWithManager } from 'app/providers/store'

export type ReducersList = {
  [key in KeysReducers]?: Reducer
}

interface DynamicReducerLoaderPT {
  reducers: ReducersList
  removeAfterUnmount?: boolean
  children: ReactNode
}

/**
 * React component for async load reducers
 * @param reducers - obj with async reducers
 * @param removeAfterUnmount - flag for (no)delete reducers after unmount component
 * @param children - children component (page with lazy)
 */

export const DynamicReducerLoader: FC<DynamicReducerLoaderPT> = ({ reducers, removeAfterUnmount = true, children }) => {
  const store = useStore() as StoreWithManager

  const dispatch = useDispatch()

  useEffect(() => {
    const mountedReducers = store.reducerManager.getReducerMap()

    //* идем по редюсерам из пропсов и смотрим на то, подключен ли уже редюсер, который мы передаем
    Object.entries(reducers).forEach(([reducerName, reducer]) => {
      const mounted = mountedReducers[reducerName as KeysReducers]

      if (!mounted) {
        store.reducerManager.add(reducerName as KeysReducers, reducer)
        dispatch({ type: `@INIT ${reducerName} reducer` })
      }
    })

    return () => {
      if (removeAfterUnmount) {
        Object.keys(reducers).forEach((reducerName) => {
          store.reducerManager.remove(reducerName as KeysReducers)
          dispatch({ type: `@DESTROY ${reducerName} reducer` })
        })
      }
    }
  }, [])
  return <>{children}</>
}

//! далее идем в TodoListsList и смотрим пример реализации
