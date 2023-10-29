import { Typography } from '@mui/material'
import Box from '@mui/material/Box'

const NotFound = () => {
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
      <Typography variant={'h2'} sx={{ p: 2 }} align={'center'}>
        Are you sure this is where you wanted to go?
      </Typography>
    </Box>
  )
}

export default NotFound
