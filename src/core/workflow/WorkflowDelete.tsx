import React from 'react';
import { createStyles, makeStyles } from '@mui/styles';
import {
  Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle,
  Theme, ButtonGroup
}
  from '@mui/material';
import { FormattedMessage } from 'react-intl';

import { Composer, StencilClient } from '../context';



const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    title: {
      backgroundColor: theme.palette.workflow.main,
      color: theme.palette.secondary.contrastText,
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
  workflow: StencilClient.Workflow,
  onClose: () => void,
}

const WorkflowDelete: React.FC<WorkflowDeleteProps> = ({ workflow, onClose }) => {
  const classes = useStyles();
  const {service, actions} = Composer.useComposer();

  const handleDelete = () => {
    service.delete().workflow(workflow.id).then(success => {
      console.log(success)
      onClose();
      actions.handleLoadSite();
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
