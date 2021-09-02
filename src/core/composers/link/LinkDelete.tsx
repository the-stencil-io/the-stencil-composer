import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { makeStyles, createStyles, Theme } from '@material-ui/core';
import { FormattedMessage } from 'react-intl';

import { API, Ide } from '../../deps';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    button: {
      // padding: 0,
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.background.paper,
      fontWeight: 'bold',
      "&:hover, &.Mui-focusVisible": {
        backgroundColor: theme.palette.error.dark,
        color: theme.palette.background.paper,
        fontWeight: 'bold'
      }
    },
    margin: {
      marginRight: theme.spacing(1)
    },
    iconButton: {
      padding: 2,
      marginLeft: theme.spacing(1),
      color: theme.palette.primary.dark,
      "&:hover, &.Mui-focusVisible": {
        backgroundColor: theme.palette.info.main,
        color: theme.palette.background.paper,
        "& .MuiSvgIcon-root": {
          color: theme.palette.background.paper,
        }
      }
    },
  }),
);


interface LinkDeleteProps {
  linkId: API.CMS.LinkId,
  open: boolean,
  onClose: () => void,
}

const LinkDelete: React.FC<LinkDeleteProps> = ({ linkId, onClose }) => {
  const ide = Ide.useIde();

  const handleDelete = () => {
    ide.service.delete().link(linkId).then(success => {
      console.log(success)
      onClose();
      ide.actions.handleLoadSite();
    })
  }

  return (
      <Dialog open={true} onClose={onClose}>
        <DialogTitle><FormattedMessage id="link.delete.title" /></DialogTitle>
        <DialogContent>
          <DialogContentText>
            <FormattedMessage id="link.delete" />
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant="text" onClick={onClose} color="primary">
            <FormattedMessage id="button.cancel"/>
          </Button>
          <Button variant="contained" onClick={handleDelete} color="primary" autoFocus>
            <FormattedMessage id="button.delete"/>
          </Button>
        </DialogActions>
      </Dialog>
  );
}
export { LinkDelete }
