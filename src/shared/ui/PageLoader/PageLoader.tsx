import Box from '@mui/material/Box'
import CircularProgress from '@mui/material/CircularProgress'
import { memo } from 'react'

export const PageLoader = memo(() => {
  return (
    <Box
      sx={{
        height: 'calc(100vh - 64px)',
        width: '100vw',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <CircularProgress color='inherit' />
    </Box>
  )
})
