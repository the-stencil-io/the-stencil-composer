import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { List, IconButton, Popover, ListItemText, ListItem, Divider } from '@material-ui/core';

import MoreVertIcon from '@material-ui/icons/MoreVert';
import { FormattedMessage } from 'react-intl';

import { API } from '../../deps';

import { ArticleEdit, ArticleLinksEdit, ArticleWorkflowsEdit } from './';
import { NewPage, PageEdit, PageDelete } from '../';


const useStyles = makeStyles((theme) => ({
  root: {
    width: '20rem',
    height: '22rem',
  },
  spacing: {
    marginBottom: theme.spacing(1),
    marginTop: theme.spacing(1),
    pointerEvents: 'none',

  },
  article: {
    marginBottom: theme.spacing(1),
    pointerEvents: 'none',
    backgroundColor: theme.palette.article.main,
    fontWeight: 'bold',
    color: theme.palette.background.paper
  },
  page: {
    marginBottom: theme.spacing(1),
    pointerEvents: 'none',
    backgroundColor: theme.palette.page.main,
    fontWeight: 'bold',
    color: theme.palette.background.paper
  },
  resource: {
    marginBottom: theme.spacing(1),
    pointerEvents: 'none',
    backgroundColor: theme.palette.primary.light,
    fontWeight: 'bold',
    color: theme.palette.background.paper
  }
}));

interface ArticleOptionsProps {
  article: API.CMS.Article,
}

const ArticleOptions: React.FC<ArticleOptionsProps> = ({ article }) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [dialogOpen, setDialogOpen] = React.useState<undefined | 'ArticleEdit' | 'NewPage' | 'PageEdit' | 'NewLinkArticle' | 'ArticleDeletePage' |
    'PageDelete' | 'ArticleLinksEdit' | 'ArticleWorkflowsEdit'
  >(undefined);

  const handleDialogClose = () => setDialogOpen(undefined);

  const open = Boolean(anchorEl);
  const id = open ? 'article-popover' : undefined;

  return (
    <>
      { dialogOpen === 'ArticleEdit' ? <ArticleEdit articleId={article.id} onClose={handleDialogClose} /> : null}
      { dialogOpen === 'NewPage' ? <NewPage articleId={article.id} onClose={handleDialogClose} /> : null}
      { dialogOpen === 'PageEdit' ? <PageEdit articleId={article.id} onClose={handleDialogClose} /> : null}
      { dialogOpen === 'PageDelete' ? <PageDelete articleId={article.id} onClose={handleDialogClose} /> : null}
      { dialogOpen === 'ArticleLinksEdit' ? <ArticleLinksEdit articleId={article.id} onClose={handleDialogClose} article={article} /> : null}
      { dialogOpen === 'ArticleWorkflowsEdit' ? <ArticleWorkflowsEdit articleId={article.id} onClose={handleDialogClose} article={article}/> : null}

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
          className={classes.root}
        >
          <ListItem className={classes.article}>
            <FormattedMessage id="article.options" /></ListItem>

          <ListItem button onClick={() => setDialogOpen('ArticleEdit')}>
            <ListItemText><FormattedMessage id="article.edit.title" /></ListItemText>
          </ListItem>
          <Divider className={classes.spacing} />

          <ListItem className={classes.page}><FormattedMessage id="pages.options" /></ListItem>

          <ListItem button onClick={() => setDialogOpen('NewPage')}>
            <ListItemText><FormattedMessage id="pages.add" /></ListItemText>
          </ListItem>

          <ListItem button onClick={() => setDialogOpen('PageEdit')}>
            <ListItemText><FormattedMessage id="pages.change" /></ListItemText>
          </ListItem>

          <ListItem button onClick={() => setDialogOpen('PageDelete')}>
            <ListItemText><FormattedMessage id="pages.delete" /></ListItemText>
          </ListItem>
          <Divider className={classes.spacing} />

          <ListItem className={classes.resource}><FormattedMessage id="resource.options" /></ListItem>

          <ListItem button onClick={() => setDialogOpen('ArticleLinksEdit')}>
            <ListItemText><FormattedMessage id='resource.edit.links' /></ListItemText>
          </ListItem>

          <ListItem button onClick={() => setDialogOpen('ArticleWorkflowsEdit')}>
            <ListItemText><FormattedMessage id="resource.edit.workflows" /></ListItemText>
          </ListItem>

        </List>

      </Popover>
    </>
  );
}

export { ArticleOptions }
