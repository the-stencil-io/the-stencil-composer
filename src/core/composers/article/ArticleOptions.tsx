import React from 'react';
import { makeStyles, alpha } from '@material-ui/core/styles';
import { List, IconButton, Popover, ListItemText, ListItem, Divider, ListSubheader } from '@material-ui/core';

import MoreVertIcon from '@material-ui/icons/MoreVert';
import { FormattedMessage } from 'react-intl';

import { API, Ide } from '../../deps';

import { ArticleEdit, ArticleLinksEdit } from './';
import { NewPage, PageEdit, PageDelete } from '../';


const useStyles = makeStyles((theme) => ({
  root: {
    width: '18rem',
    backgroundColor: theme.palette.background.paper,

  },
  nested: {
    paddingLeft: theme.spacing(3),
    "&:hover": {
      color: theme.palette.primary.light
    }
  },
  mainTopic: {
    backgroundColor: alpha(theme.palette.primary.main, 0.5),
    color: theme.palette.background.paper,
    marginBottom: theme.spacing(1),
    marginTop: theme.spacing(1),
    pointerEvents: 'none',
  },
  mainTopicFirst: {
    backgroundColor: alpha(theme.palette.primary.main, 0.7),
    color: theme.palette.background.paper,
    marginBottom: theme.spacing(1),
    pointerEvents: 'none',
  },
}));

interface ArticleOptionsProps {
  article: API.CMS.Article,
}

const ArticleOptions: React.FC<ArticleOptionsProps> = ({ article}) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [dialogOpen, setDialogOpen] = React.useState<undefined | 'ArticleEdit' | 'NewPage' | 'PageEdit' | 'NewLinkArticle' | 'ArticleDeletePage' |
    'PageDelete' | 'ArticleLinksEdit'
  >(undefined);
  
  const ide = Ide.useIde();
  const site = ide.session.site;
    
  const links: API.CMS.Link[] = Object.values(site.links);  

  
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleDialogClose = () => setDialogOpen(undefined);

  const open = Boolean(anchorEl);
  const id = open ? 'article-popover' : undefined;

  return (
    <>
      <ArticleEdit article={article} init={{ open: dialogOpen === 'ArticleEdit', onClose: handleDialogClose }} />
      <NewPage open={dialogOpen === 'NewPage'} onClose={handleDialogClose} articleId={article.id} />
      <PageEdit open={dialogOpen === 'PageEdit'} onClose={handleDialogClose} articleId={article.id}/>
      <PageDelete open={dialogOpen === 'PageDelete'} onClose={handleDialogClose} articleId={article.id}/>     
      <ArticleLinksEdit open={dialogOpen === 'ArticleLinksEdit'} onClose={handleDialogClose}/> 

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
          className={classes.root}
        >
          <ListItem className={classes.mainTopicFirst}>
            <ListItemText primary={<FormattedMessage id="article.options" />} />
          </ListItem>

          <ListItem button className={classes.nested} onClick={() => setDialogOpen('ArticleEdit')}>
            <ListItemText secondary={<FormattedMessage id="article.edit.title" />} />
          </ListItem>

          <ListItem className={classes.mainTopic}>
            <ListItemText primary={<FormattedMessage id="pages.options" />} />
          </ListItem>

          <List component="div" disablePadding>
            <ListItem button className={classes.nested} onClick={() => setDialogOpen('NewPage')}>
              <ListItemText secondary={<FormattedMessage id="pages.add" />} />
            </ListItem>

            <ListItem button className={classes.nested} onClick={() => setDialogOpen('PageEdit')}>
              <ListItemText secondary={<FormattedMessage id="pages.change" />} />
            </ListItem>

            <ListItem button className={classes.nested} onClick={() => setDialogOpen('PageDelete')}>
              <ListItemText secondary={<FormattedMessage id="pages.delete" />} />
            </ListItem>

            <ListItem className={classes.mainTopic}>
              <ListItemText primary={<FormattedMessage id="resource.options" />} />
            </ListItem>

            <ListItem button className={classes.nested} onClick={() => setDialogOpen('ArticleLinksEdit')}>
              <ListItemText secondary={<FormattedMessage id='resource.edit.links' />} />
            </ListItem>

            <ListItem button className={classes.nested}>
              <ListItemText secondary={<FormattedMessage id="resource.edit.workflows" />} />
            </ListItem>

          </List>
        </List>
      </Popover>
    </>
  );
}

export { ArticleOptions }
