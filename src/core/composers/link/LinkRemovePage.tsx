import React from 'react';
import { ButtonGroup, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Theme, IconButton } from '@mui/material';
import { makeStyles, createStyles } from '@mui/styles';

import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';

import { FormattedMessage } from 'react-intl';

import { API, Ide } from '../../deps';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    button: {
      fontWeight: 'bold',
      "&:hover, &.Mui-focusVisible": {
        color: theme.palette.link.main,
        fontWeight: 'bold',
      }
    },
    margin: {
      marginRight: theme.spacing(1)
    },
    iconButton: {
      padding: 2,
      margin: 2,
      color: theme.palette.link.main,
      "&:hover, &.Mui-focusVisible": {
        backgroundColor: theme.palette.link.main,
        color: theme.palette.background.paper,
        "& .MuiSvgIcon-root": {
          color: theme.palette.background.paper,
        }
      }
    },
    title: {
      backgroundColor: theme.palette.link.main,
      color: theme.palette.secondary.contrastText,
    },
    buttonGroup: {
      color: theme.palette.link.main
    },

  }),
);


interface LinkRemovePageProps {
  article: API.CMS.Article;
  link: API.CMS.Link;
  locale: API.CMS.Locale;
}

const LinkRemovePage: React.FC<LinkRemovePageProps> = ({ article, locale, link }) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const ide = Ide.useIde();

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = () => {
    ide.service.delete().linkArticlePage(link.id, article.id, locale).then(success => {
      console.log(success)
      handleClose();
      ide.actions.handleLoadSite();
    })
  }

  return (
    <div className={classes.margin}>
      <IconButton className={classes.iconButton} onClick={handleClickOpen}>
        <RemoveCircleOutlineIcon />
      </IconButton>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle className={classes.title}><FormattedMessage id="link.removepage.title" /></DialogTitle>
        <DialogContent>
          <DialogContentText>
            <FormattedMessage id="link.removepage" />
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <ButtonGroup className={classes.buttonGroup} variant="text">
            <Button onClick={handleClose} className={classes.button}>
              <FormattedMessage id="button.cancel" />
            </Button>
            <Button onClick={handleDelete} autoFocus className={classes.button}>
              <FormattedMessage id="button.remove" />
            </Button>
          </ButtonGroup>
        </DialogActions>
      </Dialog>
    </div>
  );
}
export { LinkRemovePage }
