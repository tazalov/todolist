import { useMemo } from 'react'
import { TypedUseSelectorHook, useSelector, useDispatch } from 'react-redux'
import { ActionCreatorsMapObject, bindActionCreators } from 'redux'

import { StateSchema, AppDispatch } from 'app/providers/store'

export const useAppSelector: TypedUseSelectorHook<StateSchema> = useSelector

export const useAppDispatch: () => AppDispatch = useDispatch

export const useAction = <T extends ActionCreatorsMapObject>(actionCreatorsObj: T) => {
  const dispatch = useAppDispatch()

  return useMemo(() => bindActionCreators(actionCreatorsObj, dispatch), [dispatch, actionCreatorsObj])
}
