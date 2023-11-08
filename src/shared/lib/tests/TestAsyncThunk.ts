import { AsyncThunkAction } from '@reduxjs/toolkit'
import { DeepPartial } from 'redux'

import { StateSchema } from 'app/providers/store'

/*
 * Что такое? В Реакте классы? Да!
 * Создаем класс для упрощения тестирования санок
 *
 * Дженериком принимает те же типы, что и createAsyncThunk
 ? Если в экстра прокидываем инстанс апи, то здесь мокаем аксиос
 * jest.mock('axios')
 * const mockedAxios = jest.mocked(axios, true)
 ? А внутри класса убираем наши объекты и мокаем вот так:
 * api: jest.MockedFunctionDeep<AxiosStatic>
 ? А внутри конструктора пишем:
 * this.api = mockedAxios
 */

/*
 ? Тип для нашей санки
 * R - return type
 * A - arguments for call thunk type
 * V - rejectValue type
 */

//* Тип для санки - санка - функция, возвращающая тип AsyncThunkAction с нужными параметрами
type ActionCreatorType<R, A, V> = (arg: A) => AsyncThunkAction<R, A, { rejectValue: V }>

//? Типы для наших объектов с методами для запросов
interface TodolistAPIMocked {
  updateTodolist: jest.MockedFn<any>
  getTodolists: jest.MockedFn<any>
  deleteTodolist: jest.MockedFn<any>
  createTodolist: jest.MockedFn<any>
}

interface TaskAPIMocked {
  getTasks: jest.MockedFn<any>
  createTask: jest.MockedFn<any>
  updateTask: jest.MockedFn<any>
  deleteTask: jest.MockedFn<any>
}

interface AuthAPIMocked {
  loginUser: jest.MockedFn<any>
  logoutUser: jest.MockedFn<any>
  authMe: jest.MockedFn<any>
}
//?

/*
 ? Класс является generic, это значит, что при передаче правильного actionCreator (thunk) при вызове new TestAsyncThunk(someThunk),
 ? typescript сам вытащит эти типы - Return, Arg, RejectValue - из actionCreator и класс будет хорошо типизирован, и выдаст ошибку
 ? если мы передадим неверный actionCreator или забудем передать аргументы при вызове instanceTestAsyncThunk.callThunk(args)
*/

/*
 * R - return type
 * A - arguments for call thunk type
 * V - rejectValue type
 */
export class TestAsyncThunk<R, A, V> {
  dispatch: jest.MockedFn<any>

  actionCreator: ActionCreatorType<R, A, V>

  getState: () => StateSchema

  todolistAPI: TodolistAPIMocked
  tasksAPI: TaskAPIMocked
  authAPI: AuthAPIMocked

  constructor(actionCreator: ActionCreatorType<R, A, V>, state?: DeepPartial<StateSchema>) {
    this.actionCreator = actionCreator
    this.dispatch = jest.fn()
    this.getState = jest.fn(() => state as StateSchema)

    this.todolistAPI = {
      getTodolists: jest.fn(),
      createTodolist: jest.fn(),
      updateTodolist: jest.fn(),
      deleteTodolist: jest.fn(),
    }

    this.tasksAPI = {
      createTask: jest.fn(),
      getTasks: jest.fn(),
      updateTask: jest.fn(),
      deleteTask: jest.fn(),
    }

    this.authAPI = {
      authMe: jest.fn(),
      loginUser: jest.fn(),
      logoutUser: jest.fn(),
    }
  }

  async callThunk(argThunk: A) {
    const action = this.actionCreator(argThunk)

    //! Не забываем менять 3 параметр в вызове action на те, которые вы прокидываете в extra
    const result = await action(this.dispatch, this.getState, {
      todolistAPI: this.todolistAPI,
      tasksAPI: this.tasksAPI,
      authAPI: this.authAPI,
    })

    return result
  }
}
