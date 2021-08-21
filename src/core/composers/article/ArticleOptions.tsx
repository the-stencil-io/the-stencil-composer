import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { IconButton, Popover } from '@material-ui/core';

import MoreVertIcon from '@material-ui/icons/MoreVert';
import { FormattedMessage } from 'react-intl';


const useStyles = makeStyles((theme) => ({
  root: {
    width: 'auto',
    maxWidth: 400,
    backgroundColor: theme.palette.background.paper,
  },
  nested: {
    paddingLeft: theme.spacing(3),
  },
}));

interface ArticleOptionsProps {

}

const ArticleOptions: React.FC<ArticleOptionsProps> = ({ }) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);
  const id = open ? 'article-popover' : undefined;

  return (
    <>
      <FormattedMessage id="options" />
      <IconButton color="secondary" onClick={handleClick}> <MoreVertIcon /> </IconButton>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}>

        <List
          component="nav"
          aria-labelledby="nested-list-subheader"
          subheader={
            <ListSubheader component="div" id="nested-list-subheader">
            </ListSubheader>
          }
          className={classes.root}
        >
          <ListItem button>
            <ListItemText primary={<FormattedMessage id="rename" />} />
          </ListItem>
          <ListItem button>
            <ListItemText primary={<FormattedMessage id="reorder" />} />
          </ListItem>
          <ListItem button onClick={handleClick}>
            <ListItemText primary={<FormattedMessage id="pages.options" />} />
          </ListItem>
          <List component="div" disablePadding>
            <ListItem button className={classes.nested}>
              <ListItemText secondary={<FormattedMessage id="pages.add" />} />
            </ListItem>

            <ListItem button className={classes.nested}>
              <ListItemText secondary={<FormattedMessage id="pages.edit" />} />
            </ListItem>

            <ListItem button className={classes.nested}>
              <ListItemText secondary={<FormattedMessage id="pages.delete" />} />
            </ListItem>
          </List>
        </List>
      </Popover>
    </>
  );
}

export { ArticleOptions }
