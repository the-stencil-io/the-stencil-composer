import React from 'react';
import {
  Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle,
  makeStyles, Theme, createStyles, ButtonGroup
}
  from '@material-ui/core';

import { FormattedMessage } from 'react-intl';

import { API, Ide } from '../../deps';



const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      fontWeight: 'bold',
    },
    title: {
      backgroundColor: theme.palette.article.main,
      color: theme.palette.secondary.contrastText,
    },
    select: {
      margin: theme.spacing(1),
      color: theme.palette.primary.contrastText,
      backgroundColor: theme.palette.background.paper
    },
    button: {
      fontWeight: 'bold',
      "&:hover, &.Mui-focusVisible": {
        color: theme.palette.article.main,
        fontWeight: 'bold',
      }
    },
    buttonGroup: {
      color: theme.palette.article.main
    },
    delete: {
      color: theme.palette.error.main,
      fontWeight: 'bold'
    }
  }),
);


interface ArticleDeletePageProps {
  pageId: API.CMS.PageId,
  onClose: () => void;
}

const ArticleDeletePage: React.FC<ArticleDeletePageProps> = ({ pageId, onClose }) => {
  const classes = useStyles();
  const ide = Ide.useIde();


  const handleDelete = () => {
    ide.service.delete().page(pageId).then(success => {
      console.log(success)
      onClose();
      ide.actions.handleLoadSite();
    })
  }

  return (
    <Dialog open={true} onClose={onClose}>
      <DialogTitle className={classes.title}><FormattedMessage id="article.deletepage.title" /> </DialogTitle>
      <DialogContent>
        <DialogContentText>
          <FormattedMessage id={'article.deletepage'} />
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <ButtonGroup variant="text" className={classes.buttonGroup}>
          <Button onClick={onClose} className={classes.button}>
            <FormattedMessage id={'button.cancel'} />
          </Button>
          <Button onClick={handleDelete} autoFocus className={classes.delete}>
            <FormattedMessage id={'button.delete'} />
          </Button>
        </ButtonGroup>
      </DialogActions>
    </Dialog>
  );
}
export { ArticleDeletePage }
