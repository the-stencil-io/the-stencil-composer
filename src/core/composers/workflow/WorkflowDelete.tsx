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
      backgroundColor: theme.palette.workflow.main,
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
        color: theme.palette.workflow.main,
        fontWeight: 'bold',
      }
    },
    buttonGroup: {
      color: theme.palette.workflow.main
    },
    delete: {
      color: theme.palette.error.main,
      fontWeight: 'bold'
    }
  }),
);




interface WorkflowDeleteProps {
  workflow: API.CMS.Workflow,
  onClose: () => void,
}

const WorkflowDelete: React.FC<WorkflowDeleteProps> = ({ workflow, onClose }) => {
  const classes = useStyles();
  const ide = Ide.useIde();



  const handleDelete = () => {
    ide.service.delete().workflow(workflow.id).then(success => {
      console.log(success)
      onClose();
      ide.actions.handleLoadSite();
    })
  }

  return (

    <Dialog open={true} onClose={onClose}>
      <DialogTitle className={classes.title}><FormattedMessage id="workflow.delete.title" /></DialogTitle>
      <DialogContent>
        <DialogContentText>
          <FormattedMessage id="workflow.delete" />
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <ButtonGroup variant="text" className={classes.buttonGroup}>
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
export { WorkflowDelete }
