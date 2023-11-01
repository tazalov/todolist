import { Reducer } from '@reduxjs/toolkit'

import { FC, useEffect, ReactNode } from 'react'
import { useStore, useDispatch } from 'react-redux'

import { KeysReducers, StoreWithManager } from 'app/providers/store'

/*
 * тут наш супер типо ХОК, для асинхронной подгрузки компонента совместно с асинхронной подгрузкой
 * его редюсера
 */

//* тип для списка редюсеров, который будет приниматься в пропсах
export type ReducersList = {
  [key in KeysReducers]?: Reducer
}

interface DynamicReducerLoaderPT {
  reducers: ReducersList
  removeAfterUnmount?: boolean //* флаг для указания того, нужно ли удалять редюсер после размонтирования компонента (по умолч. true)
  children: ReactNode
}

export const DynamicReducerLoader: FC<DynamicReducerLoaderPT> = ({ reducers, removeAfterUnmount = true, children }) => {
  //* Работа с асинхронной подгрузкой редюсера для компонента
  const store = useStore() as StoreWithManager

  const dispatch = useDispatch()

  // ? Дополнительные диспатчи нужны, чтобы увидеть в девтулзах, что мы удалили и редюсер
  useEffect(() => {
    //* смотрим, какие редюсеры уже подключены
    const mountedReducers = store.reducerManager.getReducerMap()

    //* идем по редюсерам из пропсов и смотрим на то, подключен ли уже редюсер, который мы передаем
    Object.entries(reducers).forEach(([reducerName, reducer]) => {
      const mounted = mountedReducers[reducerName as KeysReducers]

      //* и если редюсер еще не подключен, добавляем его через вызов метода add
      if (!mounted) {
        store.reducerManager.add(reducerName as KeysReducers, reducer)
        //? сообщаем девтулзам, что редюсер добавлен
        dispatch({ type: `@INIT ${reducerName} reducer` })
      }
    })

    //* ну и удаляем его при размонтировании компонента, если наш флаг true
    return () => {
      if (removeAfterUnmount) {
        //* идем по редюсерам из пропсов и удаляем каждый
        Object.keys(reducers).forEach((reducerName) => {
          store.reducerManager.remove(reducerName as KeysReducers)
          //? сообщаем девтулзам, что редюсер удален
          dispatch({ type: `@DESTROY ${reducerName} reducer` })
        })
      }
    }
    // eslint-disable-next-line
  }, [])
  return <>{children}</>
}

//! далее идем в TodoListsList и смотрим пример реализации
