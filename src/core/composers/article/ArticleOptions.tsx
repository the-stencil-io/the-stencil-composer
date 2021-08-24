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

const ArticleOptions: React.FC<ArticleOptionsProps> = ({ article }) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [dialogOpen, setDialogOpen] = React.useState<undefined | 'ArticleEdit' | 'NewPage' | 'PageEdit' | 'NewLinkArticle' | 'ArticleDeletePage' |
    'PageDelete' | 'ArticleLinksEdit'
  >(undefined);
  
  const ide = Ide.useIde();
  const site = ide.session.site;

  const handleDialogClose = () => setDialogOpen(undefined);

  const open = Boolean(anchorEl);
  const id = open ? 'article-popover' : undefined;

  return (
    <>
      { dialogOpen === 'ArticleEdit' ?      <ArticleEdit      articleId={article.id} onClose={handleDialogClose} /> : null}
      { dialogOpen === 'NewPage' ?          <NewPage          articleId={article.id} onClose={handleDialogClose} /> : null}
      { dialogOpen === 'PageEdit' ?         <PageEdit         articleId={article.id} onClose={handleDialogClose} /> : null}
      { dialogOpen === 'PageDelete' ?       <PageDelete       articleId={article.id} onClose={handleDialogClose} /> : null}
      { dialogOpen === 'ArticleLinksEdit' ? <ArticleLinksEdit articleId={article.id} onClose={handleDialogClose} /> : null}
      
      <FormattedMessage id="options" />
      <IconButton color="secondary" onClick={(event: any) => setAnchorEl(event.currentTarget)}> <MoreVertIcon /> </IconButton>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={() => setAnchorEl(null)}
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
