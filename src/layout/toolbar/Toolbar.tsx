import React from 'react';

import {
  makeStyles, withStyles, createStyles, Theme,
  List, ListItem, Tooltip, IconButton, Badge, Avatar, Box
} from '@material-ui/core';

import { FormattedMessage } from 'react-intl';

import ToolbarAPI from './ToolbarAPI';
import { useLayout, Session } from '../context';


const useStyles = makeStyles((theme) => ({
  root: {
    height: '100%',
    display: 'flex',
  },
  item: {
    width: '100%',
  },
  toolbar: {
    width: theme.spacing(7),
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText
  },
  view: {
    flexGrow: 1,
  }
}));


const SmallAvatar = withStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "20px",
      height: "20px",
      fontSize: "unset",
      border: `2px solid ${theme.palette.background.paper}`,
    },
  }),
)(Avatar);


interface ToolbarProps {
  open: boolean;
  children: Session.ToolbarItem[];
  setOpen: (open: boolean) => void
};

const Toolbar: React.FC<ToolbarProps> = ({ children, open, setOpen }) => {
  const classes = useStyles();
  const { session, actions } = useLayout();
  const [active, setActive] = React.useState<string | undefined>();
  const [view, setView] = React.useState<React.ReactNode | undefined>();

  const activeView = React.useMemo(() => ({ id: active, view }), [active, view]);
  const links = ToolbarAPI.create({ session, actions, values: children });

  React.useEffect(() => {
    if (!session.linkId) {
      return;
    }
    const link = links.find(session.linkId);
    if (!link) {
      return;
    }

    const alreadyOpen = session.linkId === active;
    if (alreadyOpen) {
      return;
    }
    setActive(session.linkId);
    const linkView = (link.type as Session.ToolbarItemView).getView(link.id);
    if (linkView) {
      setView(linkView);
      setOpen(true);
    }

  }, [active, setView, setActive, session, children, setOpen, links])

  React.useLayoutEffect(() => {
    const defaultView = children.filter(c => c.enabled).pop();
    if(defaultView && !view) {
      links.handle(defaultView, activeView);
    }
    
  }, [children, activeView, links, view]);


  const buttons = children.filter(item => item.icon).map((item, index) => (
    <Tooltip title={<FormattedMessage id={item.id} />} key={index}>
      <ListItem disableGutters>
        <Box display="flex" justifyContent="center" className={classes.item}>
          <IconButton
            disabled={item.enabled === false}
            color={links.color(item, activeView)}
            onClick={() => links.handle(item, activeView)}>

            {item.badge ?
              (<Badge
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                badgeContent={<SmallAvatar>{item.badge.text}</SmallAvatar>}>{item.icon}</Badge>) :
              (item.icon)
            }
          </IconButton>
        </Box>
      </ListItem>
    </Tooltip>)
  );
  
  let dialog: React.ReactNode = (<></>);
  if(session.dialogId) {
    const type = (links.find(session.dialogId)?.type as any as Session.ToolbarItemDialog);
    dialog = type.getDialog(session.dialogId, () => actions.handleDialog());
  }

  return (<div className={classes.root}>
    { dialog }
    <div className={classes.toolbar}>
      <List dense={true} disablePadding className={classes.toolbar}>{buttons}</List>
    </div>
    <div className={classes.view}>{open ? view : null}</div>
  </div>);
}

export default Toolbar;
