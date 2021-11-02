import React from 'react';
import { Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Layout, Ide } from '../deps';
import { Explorer } from './explorer';


const Secondary: React.FC<{}> = () => {
  const layout = Layout.useContext();

  return (<Explorer />)
}
export { Secondary }


