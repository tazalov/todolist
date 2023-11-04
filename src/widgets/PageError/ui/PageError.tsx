import { Typography, Button } from '@mui/material'
import Box from '@mui/material/Box'
import { FC } from 'react'

interface PageErrorPT {
  error: string
}

export const PageError: FC<PageErrorPT> = ({ error }) => {
  // eslint-disable-next-line no-restricted-globals
  const refreshPage = () => location.reload()

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
      <Typography align={'center'}>{error}</Typography>
      <Button onClick={refreshPage}>Refresh page</Button>
    </Box>
  )
}
