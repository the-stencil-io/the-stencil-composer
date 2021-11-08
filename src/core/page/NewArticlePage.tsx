import React from 'react';
import { createStyles, makeStyles } from '@mui/styles';
import {
  Button, Dialog, Typography, DialogTitle, DialogContent, DialogActions, ButtonGroup, Theme,
} from '@mui/material';
import { FormattedMessage } from 'react-intl';

import { Composer, StencilClient } from '../context';


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    button: {
      fontWeight: 'bold',
      "&:hover, &.Mui-focusVisible": {
        color: theme.palette.page.main,
        fontWeight: 'bold',
      }
    },

    title: {
      backgroundColor: theme.palette.page.main,
      color: theme.palette.page.contrastText,
      fontWeight: 900,
      marginBottom: theme.spacing(2)
    },
  }),
);


interface NewArticlePageProps {
  article: StencilClient.Article,
  open?: StencilClient.SiteLocale,

  onClose: () => void,
  onCreate: (page: StencilClient.Page) => void
}

const NewArticlePage: React.FC<NewArticlePageProps> = ({ article, open, onClose, onCreate }) => {
  const classes = useStyles();
  const { service, actions } = Composer.useComposer();
  if (!open) {
    return null;
  }

  const handleCreate = () => {
    const entity: StencilClient.CreatePage = { articleId: article.id, locale: open.id };
    service.create().page(entity)
      .then(success => actions.handleLoadSite().then(() => success))
      .then(success => {
        onCreate(success);
        onClose();
      })
  }

  return (
    <Dialog open={open ? true : false} onClose={onClose} >
      <DialogTitle className={classes.title} ><FormattedMessage id='newpage.title' /></DialogTitle>
      <DialogContent>
        <Typography>
          <FormattedMessage id='newpage.article.info' values={{ article: article.body.name, locale: open.body.value }} />
        </Typography>
      </DialogContent>

      <DialogActions>
        <ButtonGroup variant="text">
          <Button className={classes.button} onClick={onClose}><FormattedMessage id='button.cancel' /></Button>
          <Button className={classes.button} onClick={handleCreate} autoFocus><FormattedMessage id='button.create' /></Button>
        </ButtonGroup>
      </DialogActions>
    </Dialog>
  );
}

export { NewArticlePage }