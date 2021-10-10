import React from 'react';
import clsx from 'clsx';

import { 
  CssBaseline, Drawer, AppBar, Toolbar as MaterialToolbar, Typography, IconButton, InputBase 
} from '@mui/material';

import MenuIcon from '@mui/icons-material//Menu';
import ChevronLeftIcon from '@mui/icons-material//ChevronLeft';
import SearchIcon from '@mui/icons-material/Search';

import Badges from './badges';
import Tabs from './tabs';
import { Toolbar } from './toolbar';

import useStyles from './LayoutStyles';
import { useLayout, Session } from './context';


interface ContainerProps {
  components: {
    header: React.ReactElement;
    content: React.ReactElement;
    search: (searchString: string) => void;
    toolbar: Session.ToolbarItem[];
    badges: {
      label: string;
      icon: React.ReactElement;
      onClick: () => React.ReactElement;
    }[]

  }
};

const drawerWidth = 400;
const Container: React.FC<ContainerProps> = ({ components }) => {
  const classes = useStyles({ drawerWidth });

  const { actions, session } = useLayout();
  const ref = React.createRef<HTMLDivElement>();
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const [dimensions, setDimensions] = React.useState<boolean>(false);

  // dimensions
  React.useEffect(() => {

    setTimeout(() => {
      if (ref.current) {
        const { width, height } = ref.current.getBoundingClientRect();
        const x = width;
        const y = height - 64; //toolbar
        if (session.dimensions.x === x && session.dimensions.y === y) {
          return;
        }

        actions.handleDimensions({ x, y });
        setDimensions(true)
      }
    }, 500);


  }, [ref, actions, setDimensions, session.dimensions, drawerOpen, dimensions]);



  React.useLayoutEffect(() => {
    const update = () => setDimensions(false);
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update);
  }, [actions, dimensions, setDimensions, session.dimensions])

  // Drawer
  const handleDrawerOpen = () => {
    setDrawerOpen(true)
  };
  const handleDrawerClose = () => {
    setDrawerOpen(false)
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="absolute" className={clsx(classes.appBar, drawerOpen && classes.appBarShift)}>
        <MaterialToolbar>
          <IconButton edge="start" color="inherit"
            className={clsx(classes.menuButton, drawerOpen && classes.menuButtonHidden)}
            onClick={handleDrawerOpen}>
            <MenuIcon />
          </IconButton>
          <Typography noWrap component="h1" variant="h6" color="inherit" className={classes.title}><Tabs /></Typography>

          <div className={classes.search}>
            <div className={classes.searchIcon}><SearchIcon /></div>
            <InputBase placeholder="Search…"
              onChange={({ target }) => {
                actions.handleSearch(target.value);
                components.search(target.value);
              }}
              inputProps={{ 'aria-label': 'search' }}
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }} />
          </div>
          <Badges>{components.badges}</Badges>
        </MaterialToolbar>
      </AppBar>

      <Drawer variant="permanent" open={drawerOpen}
        classes={{
          paper: clsx(classes.drawerPaper, !drawerOpen && classes.drawerPaperClose),
        }}>

        <div>
          <div>{components.header}</div>
          <div className={classes.toolbarIconSpacer}></div>
          <div className={classes.toolbarIcon}><IconButton onClick={handleDrawerClose}><ChevronLeftIcon /></IconButton></div>
        </div>


        <div className={classes.views}>
          <Toolbar open={drawerOpen} setOpen={setDrawerOpen}>{components.toolbar}</Toolbar>
        </div>
      </Drawer>

      <main className={classes.content} ref={ref}>
        <div className={classes.appBarSpacer} />
        {components.content}
      </main>
    </div>
  );
}

export type { ContainerProps };
export { Container };
