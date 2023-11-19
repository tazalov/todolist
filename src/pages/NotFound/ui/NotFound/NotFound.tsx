import { Typography, Button } from '@mui/material'
import Box from '@mui/material/Box'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

const NotFound = () => {
  const { t } = useTranslation()

  const navigate = useNavigate()

  const backToPrevPage = () => {
    navigate(-1)
  }

  return (
    <Box
      sx={{
        height: 'calc(100vh - 64px)',
        width: '100vw',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
      }}
    >
      <Typography variant={'h4'} sx={{ p: 2 }} align={'center'}>
        {t('Are you sure this is where you wanted to go?')}
      </Typography>
      <Button variant={'contained'} onClick={backToPrevPage}>
        {t('Back to previous page')}
      </Button>
    </Box>
  )
}

export default NotFound
