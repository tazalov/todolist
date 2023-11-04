import CircularProgress from '@mui/material/CircularProgress'
import { memo } from 'react'

export const Loader = memo(() => {
  return <CircularProgress color='inherit' />
})
