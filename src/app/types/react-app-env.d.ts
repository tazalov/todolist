/// <reference types="react-scripts" />
import { compose } from 'redux'

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose
  }

  type CurrentStatus = 'idle' | 'loading' | 'succeed' | 'failed'
}