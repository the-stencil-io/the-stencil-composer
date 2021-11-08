import React from 'react';
import { createStyles, makeStyles } from '@mui/styles';
import { Theme, Button, Dialog, DialogActions, DialogContent, ButtonGroup, DialogContentText, DialogTitle } from '@mui/material';
import { FormattedMessage } from 'react-intl';
import { Composer, StencilClient } from '../context';


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
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




interface ArticleDeleteProps {
  articleId: StencilClient.ArticleId;
  onClose: () => void;
}

const ArticleDelete: React.FC<ArticleDeleteProps> = ({ articleId, onClose }) => {
  const classes = useStyles();
  const {service, actions} = Composer.useComposer();

  const handleDelete = () => {
    service.delete().article(articleId).then(_success => {
      onClose();
      actions.handleLoadSite();
    });
  }

  return (
    <Dialog open={true} onClose={onClose}>
      <DialogTitle className={classes.title}><FormattedMessage id="article.delete.title" /></DialogTitle>
      <DialogContent>
        <DialogContentText>
          <FormattedMessage id="article.delete" />
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <ButtonGroup className={classes.buttonGroup} variant="text"  >
          <Button className={classes.button} onClick={onClose}>
            <FormattedMessage id="button.cancel" />
          </Button>
          <Button className={classes.delete} onClick={handleDelete} autoFocus>
            <FormattedMessage id="button.delete" />
          </Button>
        </ButtonGroup>
      </DialogActions>
    </Dialog>);
}
export { ArticleDelete }
