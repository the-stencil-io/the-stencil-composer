import React from 'react';
import { FormattedMessage } from 'react-intl';

import { WorkflowEdit } from '../../workflow';
import { StencilClient } from '../../context';
import StencilStyles from '../../styles';


const WorkflowOptions: React.FC<{workflow: StencilClient.Workflow}> = ({ workflow }) => {

  const [dialogOpen, setDialogOpen] = React.useState<undefined | 'WorkflowEdit'>(undefined);
  const handleDialogClose = () => setDialogOpen(undefined);

  return (
    <>
      { dialogOpen === 'WorkflowEdit' ? <WorkflowEdit workflowId={workflow.id} onClose={handleDialogClose} /> : null}
      <StencilStyles.TreeItemOption nodeId={workflow.id + 'workflow.edit'}
        color='workflow'
        onClick={() => setDialogOpen('WorkflowEdit')}
        labelText={<FormattedMessage id="services.edit" />}>
      </StencilStyles.TreeItemOption>
    </>
  );
}

export { WorkflowOptions }
