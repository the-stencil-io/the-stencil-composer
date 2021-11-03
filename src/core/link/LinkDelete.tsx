
import React from 'react';
import { Button, ButtonGroup, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Theme } from '@mui/material';
import { makeStyles, createStyles } from '@mui/styles';
import { FormattedMessage } from 'react-intl';


import { Composer, StencilClient } from '../context';


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      fontWeight: 'bold',
    },
    title: {
      backgroundColor: theme.palette.link.main,
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
        color: theme.palette.link.main,
        fontWeight: 'bold',
      }
    },
    buttonGroup: {
      color: theme.palette.link.main
    },
    delete: {
      color: theme.palette.error.main,
      fontWeight: 'bold'
    }
  }),
);


interface LinkDeleteProps {
  linkId: StencilClient.LinkId,
  open: boolean,
  onClose: () => void,
}

const LinkDelete: React.FC<LinkDeleteProps> = ({ linkId, onClose }) => {
  const classes = useStyles();
  const {service, actions} = Composer.useComposer();

  const handleDelete = () => {
    service.delete().link(linkId).then(success => {
      console.log(success)
      onClose();
      actions.handleLoadSite();
    })
  }

  return (
    <Dialog open={true} onClose={onClose}>
      <DialogTitle className={classes.title}><FormattedMessage id="link.delete.title" /></DialogTitle>
      <DialogContent>
        <DialogContentText>
          <FormattedMessage id="link.delete" />
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <ButtonGroup variant="text">
          <Button onClick={onClose} className={classes.button}>
            <FormattedMessage id="button.cancel" />
          </Button>
          <Button onClick={handleDelete} autoFocus className={classes.delete}>
            <FormattedMessage id="button.delete" />
          </Button>
        </ButtonGroup>
      </DialogActions>
    </Dialog>
  );
}
export { LinkDelete }
