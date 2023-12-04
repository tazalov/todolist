import { createAsyncThunk } from '@reduxjs/toolkit'

import { todoListActions } from '../../slice/todolist.slice'

import { ThunkConfig } from 'app/providers/store'
import { ResultCodes, BaseResponse } from 'shared/api/types/todolist'

export const deleteTodolist = createAsyncThunk<string, string, ThunkConfig<BaseResponse>>(
  'entities/todoList/deleteTodolist',
  async (todoId, thunkAPI) => {
    const { extra, dispatch, rejectWithValue } = thunkAPI

    dispatch(todoListActions.changeTodoList({ todoId, model: { entityStatus: 'loading' } }))

    const response = await extra.todolistAPI.deleteTodolist(todoId)
    if (response.data.resultCode === ResultCodes.Success) {
      return todoId
    } else {
      dispatch(todoListActions.changeTodoList({ todoId, model: { entityStatus: 'failed' } }))
      return rejectWithValue(response.data)
    }
  },
)
