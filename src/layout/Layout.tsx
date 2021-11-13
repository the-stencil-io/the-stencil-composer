import React from 'react';

import { CssBaseline, Toolbar, Typography, Box, useTheme } from '@mui/material';
import StyledAppBar from './Appbar';
import StyledDrawer from './Drawer';
import Tabs from './Tabs';
import { useLayout } from './context';

interface ContainerProps {
  main: React.ReactElement;
  secondary: React.ReactElement;
  toolbar: React.ReactElement;
};

const drawerWidth = { expanded: 400, collapsed: 56 };
const contentStyle = { flexGrow: 1, overflow: "auto" };


const Container: React.FC<ContainerProps> = (components) => {
  const layout = useLayout();
  const drawerOpen = layout.session.drawer;
  const { main, secondary, toolbar } = components;
  const mainWindow = React.useMemo(() => main, [main]);
  const secondaryWindow = React.useMemo(() => secondary, [secondary]);
  const toolbarWindow = React.useMemo(() => toolbar, [toolbar]);

    return (<Box sx={{ display: 'flex', width: "100vw", height: "100vh" }}>
      <CssBaseline />
      <StyledAppBar position="fixed" open={drawerOpen} drawerWidth={drawerWidth}>
        <Toolbar>
          <Typography noWrap component="h1" variant="h6" color="inherit" sx={{ flexGrow: 1 }}>
            <Tabs />
          </Typography>
        </Toolbar>
      </StyledAppBar>

      <StyledDrawer variant="permanent" open={drawerOpen} drawerWidth={drawerWidth}>
        <Box sx={{ display: 'flex', overflowY: "scroll", height: "100vh" }}>
          <Box sx={{
            backgroundColor: "primary.main",
            color: "primary.contrastText",
            overflow: "hidden",
            position: "fixed",
            height: "100%"
          }}>
            {toolbarWindow}
          </Box>
          {!drawerOpen ? null :
            (<Box sx={{width: drawerWidth.expanded, marginLeft: `${drawerWidth.collapsed + 1}px`, height: "100%"}}>
              {secondaryWindow}
            </Box>)
          }
        </Box>
      </StyledDrawer>

      <main style={{ width: "100%" }}>
        <Toolbar />
        <Box sx={contentStyle}>
          {mainWindow}
        </Box>
      </main>
    </Box>
    );
}

export type { ContainerProps };
export { Container };
