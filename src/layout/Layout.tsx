import React from 'react';

import {CssBaseline, Toolbar, Typography, IconButton, Box, useTheme} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';

import StyledAppBar from './Appbar';
import StyledDrawer from './Drawer';
import Tabs from './Tabs';
import {useLayout} from './context';

interface ContainerProps {
  main: React.ReactElement;
  secondary: React.ReactElement;
  toolbar: React.ReactElement;
};

const drawerWidth = 400;
const contentStyle = { flexGrow: 1, overflow: "auto"};


const Container: React.FC<ContainerProps> = (components) => {
  const layout = useLayout();
  const theme = useTheme();
  
  const drawerOpen = layout.session.drawer;
  
  return (
    <Box sx={{ display: 'flex', width: "100vw", height: "100vh" }}>
      <CssBaseline />
      <StyledAppBar position="fixed" open={drawerOpen} drawerWidth={drawerWidth}>
        <Toolbar>
          <IconButton edge="start" color="inherit" onClick={() => layout.actions.handleDrawerOpen(true)}
            sx={{ color: theme.palette.secondary.main, display: drawerOpen ? 'none' : undefined }}>
            <MenuIcon />
          </IconButton>
          <Typography noWrap component="h1" variant="h6" color="inherit" sx={{ flexGrow: 1 }}>
            <Tabs />
          </Typography>
        </Toolbar>
      </StyledAppBar>

      <StyledDrawer variant="permanent" open={drawerOpen} drawerWidth={drawerWidth}>
        <Toolbar>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            padding: '0 8px'
          }}>
            <IconButton onClick={() => layout.actions.handleDrawerOpen(false)}><ChevronLeftIcon /></IconButton>
          </Box>
        </Toolbar>

        <Box sx={{ display: 'flex', flexGrow: 1 }} >
          <Box sx={{
            backgroundColor: theme.palette.primary.main,
            color: theme.palette.primary.contrastText,
            width: `calc(${theme.spacing(7)} + 1px)`
          }}>
            {components.toolbar}
          </Box>
          
          {!drawerOpen ? null :
            <Box sx={contentStyle}>{components.secondary}</Box>
          }
        </Box>
      </StyledDrawer>

      <main style={{width: "100%"}}>
        <Toolbar />
        <Box sx={contentStyle}>
          {components.main}
        </Box>
      </main>
    </Box>
  );
}

export type { ContainerProps };
export { Container };
