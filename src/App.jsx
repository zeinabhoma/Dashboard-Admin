import React, { useState, useEffect } from 'react';
import { useRoutes } from 'react-router-dom';
import { createTheme, ThemeProvider, CssBaseline } from '@mui/material';
import { Box, useMediaQuery } from '@mui/material';
import Navbar from './components/navbar/Navbar';
import Sidebar from './components/sidebar/Sidebar';
import routes from './routes';

function App() {
  const theme = createTheme({
    palette: {
      background: {
        default: '#f5f5f5', // رنگ پس‌زمینه کلی
      },
    },
  });

  const router = useRoutes(routes)

  const isLargeScreen = useMediaQuery('(min-width:1200px)');

  const [open, setOpen] = useState(isLargeScreen);

  useEffect(()=>{
    setOpen(isLargeScreen)
  },[isLargeScreen])

  const toggleSidebar = ()=>setOpen(!open)
  

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Navbar onMenuClick={toggleSidebar}/>

      <Box>
        <Sidebar open={open} onClose={toggleSidebar} />
        {/* <Navbar onMenuClick={toggleSidebar}/> */}
        <Box
          component="main"
          sx={{ flexGrow: 1, 
                marginTop:'3rem',
                bgcolor: 'background.default', 
                p: 3,
                transition: "margin 0.3s ease",
                marginLeft: open && isLargeScreen ? "15rem" : "0",
                width: open && isLargeScreen ? 'calc(100% - 16.5rem)' : "100%",
                overflow:'hidden',
                boxSizing:'border-box'
            }}
        >
            {/* <Toolbar/> */}

            {router}
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default App;