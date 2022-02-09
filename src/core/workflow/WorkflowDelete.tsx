import React from 'react';
import { DialogContentText } from '@mui/material';
import { FormattedMessage } from 'react-intl';

import { Composer, StencilClient } from '../context';
import StencilStyles from '../styles';

interface WorkflowDeleteProps {
  workflow: StencilClient.Workflow,
  onClose: () => void,
}

const WorkflowDelete: React.FC<WorkflowDeleteProps> = ({ workflow, onClose }) => {
  const { service, actions } = Composer.useComposer();

  const handleDelete = () => {
    service.delete().workflow(workflow.id).then(success => {
      console.log(success)
      onClose();
      actions.handleLoadSite();
    })
  }

  return (
    <StencilStyles.Dialog open={true} onClose={onClose}
      backgroundColor="uiElements.main"
      title="services.delete"
      submit={{ title: "button.delete", onClick: handleDelete, disabled: false }}>

      <DialogContentText>
        <FormattedMessage id="services.delete.desc" />
      </DialogContentText>
    </StencilStyles.Dialog>
  );
}
export { WorkflowDelete }
