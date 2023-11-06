import Brightness7Icon from '@mui/icons-material/Brightness7'
import LogoutIcon from '@mui/icons-material/Logout'
import NightsStayIcon from '@mui/icons-material/NightsStay'
import { AppBar, Button, IconButton, LinearProgress, Toolbar, Typography, useTheme, styled, Link } from '@mui/material'
import { useContext, memo } from 'react'
import { useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'

import { useAppDispatch } from 'app/providers/store'
import { ColorModeContext } from 'app/styles/ThemeContext'
import { getNotificationStatus } from 'entities/notification'
import { getAuthUserData } from 'features/auth'
import { logoutUser } from 'features/auth'

const ResponsiveToolbar = styled(Toolbar)(({ theme }) => ({
  [theme.breakpoints.down('sm')]: {
    flexDirection: 'column',
  },
}))

export const Header = memo(() => {
  //! ---------- work with theme
  const theme = useTheme()
  const colorMode = useContext(ColorModeContext)

  const status = useSelector(getNotificationStatus)
  const userData = useSelector(getAuthUserData)

  const dispatch = useAppDispatch()

  const logout = () => {
    dispatch(logoutUser())
  }

  return (
    <AppBar position='static' enableColorOnDark sx={{ bgcolor: 'background.header', position: 'relative' }}>
      <ResponsiveToolbar>
        <Typography variant='h4' sx={{ flexGrow: 1 }}>
          Сases are here
        </Typography>
        {!userData ? (
          <Link component={NavLink} to='/login' sx={{ color: 'primary.contrastText' }}>
            LOGIN
          </Link>
        ) : (
          <Button sx={{ color: 'primary.contrastText' }} endIcon={<LogoutIcon />} onClick={logout}>
            {userData.email}
          </Button>
        )}
        <IconButton sx={{ ml: 1 }} onClick={colorMode.toggleColorMode} color={'warning'}>
          {theme.palette.mode === 'dark' ? <Brightness7Icon /> : <NightsStayIcon />}
        </IconButton>
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
