import { useMemo } from 'react'
import { TypedUseSelectorHook, useSelector, useDispatch } from 'react-redux'
import { ActionCreatorsMapObject, bindActionCreators } from 'redux'

import { StateSchema, AppDispatch } from 'app/providers/store'

export const useAppSelector: TypedUseSelectorHook<StateSchema> = useSelector

export const useAppDispatch: () => AppDispatch = useDispatch

//* хук, в который передаем санки в виде объекта, а на выходе получаем обернутые вызовы диспатча наших санок, в виде объекта
//? используем при экспорте санок для каждой сущности, фичи и прочих, где используются санки
export const useAction = <T extends ActionCreatorsMapObject>(actionCreatorsObj: T) => {
  const dispatch = useAppDispatch()

  return useMemo(() => bindActionCreators(actionCreatorsObj, dispatch), [dispatch, actionCreatorsObj])
}
