import React from 'react';
import { createStyles, makeStyles } from '@mui/styles';
import {
  Avatar, Theme, Box, Typography, IconButton, Table, TableBody, 
  TableCell, TableContainer, TableRow, TableHead, Paper
} from '@mui/material';


import { FormattedMessage, useIntl } from 'react-intl';

import { Composer, StencilClient } from '../context';
import {ReleaseGraphVisitor} from './ReleaseGraphVisitor';


const ReleaseGraph: React.FC<{}> = () => {

  const {site, service} = Composer.useComposer();
  const ref = React.createRef<HTMLDivElement>();
  
  React.useLayoutEffect(() => {
    new ReleaseGraphVisitor({site, ref}).visit();
    
  }, [ref])


  return (
      <Box display="flex" width="900px" height="900px" ref={ref}>
      </Box>
  );
}


export { ReleaseGraph }




