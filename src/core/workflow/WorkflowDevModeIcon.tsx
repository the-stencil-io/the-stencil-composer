import React from 'react';
import Chip from '@mui/material/Chip';

const WorkflowDevModeIcon: React.FC<{}> = () => {
  return (
    <Chip label="DEV" size="small" variant="filled" color="info"/>
  );
}

export default WorkflowDevModeIcon;