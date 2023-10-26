import Brightness7Icon from '@mui/icons-material/Brightness7'
import MenuIcon from '@mui/icons-material/Menu'
import NightsStayIcon from '@mui/icons-material/NightsStay'
import { AppBar, Button, IconButton, LinearProgress, Toolbar, Typography, useTheme } from '@mui/material'
import { FC, useContext, memo } from 'react'
import { ColorModeContext } from 'app/styles/ThemeContext'
import { useSelector } from 'react-redux'
import { getStatus } from 'entities/notification'

interface HeaderPT {
  // add props type
}

export const Header: FC<HeaderPT> = memo(({}) => {
  //! ---------- work with theme
  const theme = useTheme()
  const colorMode = useContext(ColorModeContext)

  const status = useSelector(getStatus)

  return (
    <AppBar position="static" enableColorOnDark sx={{ bgcolor: 'background.header', position: 'relative' }}>
      <Toolbar>
        <IconButton size="large" edge="start" sx={{ mr: 2, color: 'primary.contrastText' }}>
          <MenuIcon />
        </IconButton>
        <Typography variant="h4" sx={{ flexGrow: 1 }}>
          DODOLIST
        </Typography>
        <Button sx={{ color: 'primary.contrastText' }}>Login</Button>
        <IconButton sx={{ ml: 1 }} onClick={colorMode.toggleColorMode} color={'warning'}>
          {theme.palette.mode === 'dark' ? <Brightness7Icon /> : <NightsStayIcon />}
        </IconButton>
      </Toolbar>
      {status === 'loading' && (
        <LinearProgress
          color="secondary"
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
