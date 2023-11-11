import { StateSchema } from 'app/providers/store'

export const userData = (state: StateSchema) => state.auth.data ?? null

export const inited = (state: StateSchema) => state.auth._inited

export const error = (state: StateSchema) => state.auth.error
