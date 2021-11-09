import React from 'react';
import { DialogContentText } from '@mui/material';
import { FormattedMessage } from 'react-intl';

import { Composer, StencilClient } from '../context';
import { StyledDialog } from '../styles/StyledDialog';

interface WorkflowDeleteProps {
  workflow: StencilClient.Workflow,
  onClose: () => void,
}

const WorkflowDelete: React.FC<WorkflowDeleteProps> = ({ workflow, onClose }) => {
  const { service, actions  } = Composer.useComposer();

  const handleDelete = () => {
    service.delete().workflow(workflow.id).then(success => {
      console.log(success)
      onClose();
      actions.handleLoadSite();
    })
  }

  return (
    <StyledDialog open={true} onClose={onClose}
      color="workflow.main"
      title="workflow.delete.title"
      submit={{ title: "button.delete", onClick: handleDelete, disabled: false }}>

      <DialogContentText>
        <FormattedMessage id="workflow.delete" />
      </DialogContentText>
    </StyledDialog>
  );
}
export { WorkflowDelete }
