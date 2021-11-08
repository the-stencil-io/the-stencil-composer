import React from 'react';
import { createStyles, makeStyles } from '@mui/styles';
import {
  Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle,
  Theme, ButtonGroup
} from '@mui/material';
import { FormattedMessage } from 'react-intl';

import { Composer, StencilClient } from '../context';



const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    title: {
      backgroundColor: theme.palette.article.main,
      color: theme.palette.secondary.contrastText,
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
  pageId: StencilClient.PageId,
  onClose: () => void;
}

const ArticleDeletePage: React.FC<ArticleDeletePageProps> = ({ pageId, onClose }) => {
  const classes = useStyles();
  const {service, actions} = Composer.useComposer();


  const handleDelete = () => {
    service.delete().page(pageId).then(success => {
      console.log(success)
      onClose();
      actions.handleLoadSite();
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
