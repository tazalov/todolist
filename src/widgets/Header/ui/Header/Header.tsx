import Brightness7Icon from '@mui/icons-material/Brightness7'
import LogoutIcon from '@mui/icons-material/Logout'
import NightsStayIcon from '@mui/icons-material/NightsStay'
import { AppBar, Button, IconButton, LinearProgress, Toolbar, Typography, useTheme, styled, Link } from '@mui/material'
import { useContext, memo } from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'

import { ColorModeContext } from 'app/styles/ThemeContext'
import { notificationSelectors } from 'entities/notification'
import { authSelectors, logoutUser } from 'features/auth'
import { useAppDispatch } from 'shared/lib/hooks'
import { LangSwitcher } from 'shared/ui/LangSwitcher/LangSwitcher'

const ResponsiveToolbar = styled(Toolbar)(({ theme }) => ({
  [theme.breakpoints.down('sm')]: {
    flexDirection: 'column',
  },
}))

export const Header = memo(() => {
  const { t } = useTranslation()

  const theme = useTheme()
  const colorMode = useContext(ColorModeContext)

  const status = useSelector(notificationSelectors.status)
  const userData = useSelector(authSelectors.userData)

  const dispatch = useAppDispatch()

  const logout = () => {
    dispatch(logoutUser())
  }

  return (
    <AppBar position='static' enableColorOnDark sx={{ bgcolor: 'background.header', position: 'relative' }}>
      <ResponsiveToolbar>
        <Typography variant='h4' sx={{ flexGrow: 1 }}>
          {t('Plan here')}
        </Typography>
        {userData && (
          <Button sx={{ color: 'primary.contrastText' }} endIcon={<LogoutIcon />} onClick={logout}>
            {userData.email}
          </Button>
        )}
        <IconButton sx={{ ml: 1 }} onClick={colorMode.toggleColorMode} color={'warning'}>
          {theme.palette.mode === 'dark' ? <Brightness7Icon /> : <NightsStayIcon />}
        </IconButton>
        <LangSwitcher />
      </ResponsiveToolbar>
      {status === 'loading' && (
        <LinearProgress
          color='secondary'
          sx={{
            position: 'absolute',
            width: '100%',
            bottom: '0',
          }}
        />
      )}
    </AppBar>
  )
})
