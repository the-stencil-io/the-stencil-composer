import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import RemoveCircleOutlineIcon from '@material-ui/icons/RemoveCircleOutline';
import { makeStyles, createStyles, Theme, IconButton } from '@material-ui/core';
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


interface WorkflowRemovePageProps {
  workflow: API.CMS.Workflow;
  article: API.CMS.Article;
  locale: API.CMS.Locale;
}

const WorkflowRemovePage: React.FC<WorkflowRemovePageProps> = ({ workflow, article, locale }) => {
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
    ide.service.delete().workflowArticlePage(workflow.id, article.id, locale).then(_success => {
      handleClose();
      ide.actions.handleLoadSite();
    })
  }


  return (
    <div className={classes.margin}>
      <IconButton className={classes.iconButton} onClick={handleClickOpen}>
        <RemoveCircleOutlineIcon />
      </IconButton>

      <Dialog
        open={open}
        onClose={handleClose}
      >
        <DialogTitle><FormattedMessage id="workflow.removepage.title" /></DialogTitle>
        <DialogContent>
          <DialogContentText>
            <FormattedMessage id="workflow.removepage" />
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant="text" onClick={handleClose} color="primary">
            <FormattedMessage id="button.cancel" />
          </Button>
          <Button variant="contained" onClick={handleDelete} color="primary" autoFocus>
            <FormattedMessage id="button.remove" />
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
export { WorkflowRemovePage }
