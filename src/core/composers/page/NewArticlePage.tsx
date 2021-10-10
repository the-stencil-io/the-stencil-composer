import React from 'react';
import { createStyles, makeStyles } from '@mui/styles';
import {
  Button, Dialog, Typography, DialogTitle, DialogContent, DialogActions, ButtonGroup, Theme,
} from '@mui/material';
import { FormattedMessage } from 'react-intl';

import { API, Ide } from '../../deps';


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
  article: API.CMS.Article,
  locale: API.CMS.SiteLocale,
  onClose: () => void,
  onCreate: (page: API.CMS.Page) => void
}

const NewArticlePage: React.FC<NewArticlePageProps> = ({ article, locale, onClose, onCreate }) => {
  const classes = useStyles();
  const ide = Ide.useIde();

  const handleCreate = () => {
    const entity: API.CMS.CreatePage = { articleId: article.id, locale: locale.id };
    ide.service.create().page(entity)
      .then(success => ide.actions.handleLoadSite().then(() => success))
      .then(success => {
        onCreate(success);
        onClose();
      })
  }

  return (
    <Dialog open={true} onClose={onClose} >
      <DialogTitle className={classes.title} ><FormattedMessage id='newpage.title' /></DialogTitle>
      <DialogContent>
        <Typography>
          <FormattedMessage id='newpage.article.info' values={{ article: article.body.name, locale: locale.body.value }} />
        </Typography>
      </DialogContent>

      <DialogActions>
        <ButtonGroup variant="text">
          <Button className={classes.button} onClick={onClose}><FormattedMessage id='button.cancel' /></Button>
          <Button className={classes.button} onClick={handleCreate} autoFocus disabled={!locale}><FormattedMessage id='button.create' /></Button>
        </ButtonGroup>
      </DialogActions>
    </Dialog>
  );
}

export { NewArticlePage }