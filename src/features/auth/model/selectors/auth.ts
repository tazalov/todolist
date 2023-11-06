import { StateSchema } from 'app/providers/store'

export const getAuthUserData = (state: StateSchema) => state.auth.data ?? null

export const getAuthInited = (state: StateSchema) => state.auth._inited

export const getAuthError = (state: StateSchema) => state.auth.error
