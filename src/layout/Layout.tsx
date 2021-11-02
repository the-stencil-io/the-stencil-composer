import React from 'react';
import clsx from 'clsx';

import { makeStyles } from '@mui/styles';

import {
  CssBaseline, Drawer, AppBar, Toolbar, Typography, IconButton, Box, useTheme
} from '@mui/material';

import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';

import Tabs from './tabs';


const drawerWidth = 400;

const useStyles = makeStyles((theme) => ({
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    backgroundColor: theme.palette.background.default,
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    color: theme.palette.secondary.main,
  },
  menuButtonHidden: {
    display: 'none',
  },
  drawerPaper: {
    position: 'relative',
    overflowX: 'hidden',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
  },
}));


interface ContainerProps {
  main: React.ReactElement;
  secondary: React.ReactElement;
  toolbar: React.ReactElement;
};

const Container: React.FC<ContainerProps> = (components) => {
  const classes = useStyles({ drawerWidth });
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const theme = useTheme();

  return (
    <Box sx={{ display: 'flex', width: "100vw", height: "100vh" }}>
      <CssBaseline />
      <AppBar position="absolute" className={clsx(classes.appBar, drawerOpen && classes.appBarShift)}>
        <Toolbar>

          <IconButton edge="start" color="inherit" onClick={() => setDrawerOpen(true)}
            className={clsx(classes.menuButton, drawerOpen && classes.menuButtonHidden)}>
            <MenuIcon />
          </IconButton>

          <Typography noWrap component="h1" variant="h6" color="inherit" sx={{ flexGrow: 1 }}>
            <Tabs />
          </Typography>

        </Toolbar>
      </AppBar>

      <Drawer variant="permanent" open={drawerOpen}
        classes={{
          paper: clsx(classes.drawerPaper, !drawerOpen && classes.drawerPaperClose),
        }}>

        <Toolbar>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            padding: '0 8px'
          }}>
            <IconButton onClick={() => setDrawerOpen(false)}><ChevronLeftIcon /></IconButton>
          </Box>
        </Toolbar>

        <Box sx={{ height: '100%', display: 'flex' }}>
          <Box sx={{
            width: theme.spacing(7),
            height: '100%',
            backgroundColor: theme.palette.primary.main,
            color: theme.palette.primary.contrastText
          }}>
            {components.toolbar}
          </Box>
          {drawerOpen ? <Box sx={{ flexGrow: 1 }}>{components.secondary}</Box> : null}
        </Box>
      </Drawer>

      <main>
        <Toolbar />
        <div style={{ overflow: "auto", height: "85vh"}}>
            {components.main}
        </div>
      </main>
    </Box>
  );
}

export type { ContainerProps };
export { Container };
