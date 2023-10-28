import { useDispatch, TypedUseSelectorHook, useSelector } from 'react-redux'

import { AppDispatch, StateSchema } from '../config/StateSchema'

export const useAppDispatch: () => AppDispatch = useDispatch

export const useAppSelector: TypedUseSelectorHook<StateSchema> = useSelector
