import React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import { createStyles, makeStyles } from '@mui/styles';
import { Theme, IconButton } from '@mui/material';
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
      color: theme.palette.workflow.main,
      "&:hover, &.Mui-focusVisible": {
        backgroundColor: theme.palette.workflow.main,
        color: theme.palette.background.paper,
        "& .MuiSvgIcon-root": {
          color: theme.palette.background.paper,
        }
      }
    },
    title: {
      backgroundColor: theme.palette.workflow.main,
      color: theme.palette.secondary.contrastText,
    },
    buttonGroup: {
      color: theme.palette.workflow.main
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
