export { StoreProvider } from './ui/StoreProvider'
export { useAppDispatch, useAppSelector } from './config/hooks'
export { clearCurrentState } from './actions/common.actions'
export type {
  StateSchema,
  AppThunk,
  AppThunkExtra,
  AppDispatch,
  ThunkConfig,
  StoreWithManager,
  KeysReducers,
} from './config/StateSchema'
