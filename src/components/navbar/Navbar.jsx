import React from 'react';
import './Navbar.css'
import { AppBar, Toolbar, Typography, Box, IconButton, Badge, useMediaQuery } from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import SettingsIcon from '@mui/icons-material/Settings';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import MenuIcon from '@mui/icons-material/Menu';

export default function Navbar({onMenuClick}) {
  
  const isLargeScreen = useMediaQuery('(min-width:1200px)');
    
  return (
    <AppBar className='topbar' >
    <Toolbar>
      {!isLargeScreen && 
        <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={onMenuClick}
          >
            <MenuIcon />
        </IconButton>
      }  
      <Typography variant="h6" style={{ flexGrow: 1 }}>
        Dashboard
      </Typography>
      <Box>
      <IconButton>
        <Badge badgeContent={4} color="error">
          <NotificationsIcon />
        </Badge>
      </IconButton>
      <IconButton><SettingsIcon/></IconButton>
      <IconButton><AccountCircleIcon/></IconButton>
      </Box>
    </Toolbar>
  </AppBar>
  )
}
