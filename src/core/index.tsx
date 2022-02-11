import React from 'react';
import { Main } from './Main';
import { Secondary } from './Secondary';
import StencilClient from './client';
import Toolbar from './Toolbar';
import {Composer} from './context';
import messages from '../intl';
import Layout from '../layout';


interface StencilComposerProps {
  service: StencilClient.Service,
  locked?: boolean;
};

const StencilComposer: React.FC<StencilComposerProps> = ({ service, locked }) => {
  
  if(locked === true) {
    return (<div>Content editing locked by deployment.</div>)
  }
  
  return (
    <Layout.Provider drawerOpen={true}>
      <Composer.Provider service={service} >
        <Layout.Container
          main={<Main />}
          secondary={<Secondary />}
          toolbar={<Toolbar />} />
      </Composer.Provider>
    </Layout.Provider>
  );
}

export type { StencilComposerProps };
export { StencilComposer, StencilClient, messages, Layout };
export * from './client/store';
export * from './themes/siteTheme';
export * from './Main';
export * from './Secondary';
export * from './ActivitiesView';

export * from './page';
export * from './link';
export * from './workflow';
export * from './article';
export * from './locale';
export * from './release';
export * from './migration';
export * from './template';
