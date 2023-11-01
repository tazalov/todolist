import { combineReducers, ReducersMapObject, Reducer } from '@reduxjs/toolkit'

import { AnyAction } from 'redux'

import { KeysReducers, StateSchema } from './StateSchema'

//* ReducersMapObject тип из тулкита, чтобы не писать свой, аля [k: string]: Reducer
export function createReducerManager(initialReducers: ReducersMapObject<StateSchema>) {
  //* создаем объект с синхронными редюсерами, которые будут подключатся в проекте
  const reducers = { ...initialReducers }

  //* создаем редюсер из синхронных редюсеров
  //? далее в некоторых методах мы будем перезаписывать этот редюсер, путем добавления или удаления конкретных редюсеров
  let combinedReducer = combineReducers(reducers)

  //* массив с ключами на удаление редюсеров, пополняется методом remove
  let keysToRemove: KeysReducers[] = []

  return {
    //* метод для получения текущего набора редюсеров
    //? нужен для того, чтобы, возможно, не удалять редюсер при определенных ситуациях
    getReducerMap: () => reducers,

    //* а вот этот метод уже будет возвращать наш РУТОВЫЙ редюсер
    //? вызов этого метода мы и будем передавать в функцию configureStore
    reduce: (state: StateSchema, action: AnyAction) => {
      //* если у нас есть редюсер на удаление, то и часть стейта для него мы тоже удаляем
      if (keysToRemove.length > 0) {
        state = { ...state }
        for (let key of keysToRemove) {
          delete state[key]
        }
        keysToRemove = []
      }

      //* ну и возвращаем наш РУТОВЫЙ редюсер
      return combinedReducer(state, action)
    },

    //* метод для добавления асинхронного редюсера
    add: (key: KeysReducers, reducer: Reducer) => {
      if (!key || reducers[key]) {
        return
      }

      //* добавляем по ключу наш редюсер (пример: ключ auth, значение: authReducer)
      reducers[key] = reducer

      //* перезаписываем наш основной набор редюсеров
      combinedReducer = combineReducers(reducers)
    },

    //* метод для удаления асинхронного редюсера
    remove: (key: KeysReducers) => {
      //* если передали несуществующий ключ редюсера, то ниче не делаем
      if (!key || !reducers[key]) {
        return
      }

      //* удаляем из объекта с редюсерами нужный редюсер
      delete reducers[key]

      //* добавляем в массив на удаление наш ключ редюсера
      keysToRemove.push(key)

      //* перезаписываем наш основной набор редюсеров
      combinedReducer = combineReducers(reducers)
    },
  }
}

//! далее идем в store.ts и подключаем нашего красавчика там
