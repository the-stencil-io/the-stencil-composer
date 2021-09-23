import React from 'react';
import { makeStyles } from '@mui/styles';

import { API, Layout } from './deps';
import { Composer } from './composers';
import { toolbar } from './toolbar';
import Ide from './context';
import messages from '../intl';

interface CMSEditorProps {
  service: API.CMS.Service,
};


const Components: React.FC<{ service: API.CMS.Service }> = ({ service }) => {
  const layout = Layout.useContext();

  return (
    <Layout.Container components={{
      search: (_value: string) => console.log("Search"),
      header: (<Header></Header>),
      content: (<Composer />),
      toolbar: toolbar(layout.actions),
      badges: []
    }} />);
}

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    padding: 0,
    margin: 0
  },
}));

interface HeaderProps {

}
const Header: React.FC<HeaderProps> = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>

    </div>
  )
}
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
