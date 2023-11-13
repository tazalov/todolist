import { StateSchema } from 'app/providers/store'

const userData = (state: StateSchema) => state.auth.data ?? null

const inited = (state: StateSchema) => state.auth._inited

const error = (state: StateSchema) => state.auth.error

export const authSelectors = {
  userData,
  inited,
  error,
}
