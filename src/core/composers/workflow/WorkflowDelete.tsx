import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { FormattedMessage } from 'react-intl';

import { API, Ide } from '../../deps';


interface WorkflowDeleteProps {
  workflow: API.CMS.Workflow,
  onClose: () => void,
}

const WorkflowDelete: React.FC<WorkflowDeleteProps> = ({ workflow }) => {
  const [open, setOpen] = React.useState(false);
  const ide = Ide.useIde();

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = () => {
    ide.service.delete().workflow(workflow.id).then(success => {
      console.log(success)
      handleClose();
      ide.actions.handleLoadSite();
    })
  }

  return (

    <Dialog open={true} onClose={handleClose}>
      <DialogTitle><FormattedMessage id="workflow.delete.title" /></DialogTitle>
      <DialogContent>
        <DialogContentText>
          <FormattedMessage id="workflow.delete" />
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button variant="text" onClick={handleClose} color="primary">
          <FormattedMessage id="button.cancel" />
        </Button>
        <Button variant="contained" onClick={handleDelete} color="primary" autoFocus>
          <FormattedMessage id="button.delete" />
        </Button>
      </DialogActions>
    </Dialog>
  );
}
export { WorkflowDelete }
