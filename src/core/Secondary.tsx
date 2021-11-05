import React from 'react';

import { ArticleExplorer, WorkflowExplorer } from './explorer';
import { Composer } from './context';


const Secondary: React.FC<{}> = () => {
  const layout = Composer.useLayout();
  if (layout.session.secondary === 'toolbar.workflows') {
    return (<WorkflowExplorer />)
  }
  return (<ArticleExplorer />)
}
export { Secondary }


