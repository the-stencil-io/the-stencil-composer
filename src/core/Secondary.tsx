import React from 'react';
import { Box } from '@mui/material';

import { ArticleExplorer, WorkflowExplorer } from './explorer';
import { Composer } from './context';


const Secondary: React.FC<{}> = () => {
  const layout = Composer.useLayout();
  
  let component = <></>;
  if (layout.session.secondary === 'toolbar.workflows') {
    component = (<WorkflowExplorer />)
  } else {
    component = <ArticleExplorer />;
  }
  return (<Box sx={{backgroundColor: "explorer.main", height: '100%'}}>{component}</Box>)
}
export { Secondary }


