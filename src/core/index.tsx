import React from 'react';
import { API, Layout } from './deps';
import { Main, Secondary } from './composers';
import Toolbar from './toolbar';
import Ide from './context';
import messages from '../intl';

interface CMSEditorProps {
  service: API.CMS.Service,
};


const Components: React.FC<{ service: API.CMS.Service }> = ({ service }) => {
  
  return (<Layout.Container 
    main={<Main />}
    secondary={<Secondary />} 
    toolbar={<Toolbar />} />)}


const CMSEditor: React.FC<CMSEditorProps> = ({ service }) => {
  return (
    <Layout.Provider>
      <Ide.Provider service={service} >
        <Components service={service} />
      </Ide.Provider>
    </Layout.Provider>
  );
}

export type { CMSEditorProps };
export { CMSEditor, API, messages };
