import React from 'react';
import {
  Box, Typography, IconButton, Table, TableBody,
  TableCell, TableContainer, TableRow, TableHead, Paper, Card
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { FormattedMessage } from 'react-intl';

import { TemplateComposer } from './';
import { Composer } from '../context';
import StencilStyles from '../styles';



const TemplatesView: React.FC<{}> = () => {

  const layout = Composer.useLayout();
  const [templateComposer, setTemplateComposer] = React.useState(false);


  return (
    <>

      { templateComposer ? <TemplateComposer onClose={() => setTemplateComposer(false)} /> : null}

      <Box sx={{ paddingBottom: 1, m: 2 }}>
        <Box display="flex">
          <Box alignSelf="center">
            <Typography variant="h3" sx={{ p: 1, mb: 3, fontWeight: "bold", color: "mainContent.dark" }}>
              <FormattedMessage id="templates" />
              <Typography variant="body2" sx={{ pt: 1 }}><FormattedMessage id={"templates.templatesview.description"} /></Typography>
            </Typography>
          </Box>
          <Box flexGrow={1} />
          <Box>
            <StencilStyles.SecondaryButton label={"button.cancel"} onClick={() => layout.actions.handleTabCloseCurrent()} sx={{ marginRight: 1 }} />
            <StencilStyles.PrimaryButton label={"button.create"} onClick={() => setTemplateComposer(true)} />
          </Box>
        </Box>

        <Card sx={{ margin: 1, width: 'fill-available' }}>
          <Typography variant="h4" sx={{ p: 2, backgroundColor: "table.main" }}>
            <FormattedMessage id="templates" />
          </Typography>

          <TableContainer component={Paper}>
            <Table size="small">
              <TableHead>
                <TableRow sx={{ p: 1 }}>
                  <TableCell align="left" sx={{width: "80px"}}></TableCell>
                  <TableCell align="left" sx={{ fontWeight: 'bold' }}><FormattedMessage id="templates.name" /></TableCell>
                  <TableCell align="left" sx={{ fontWeight: 'bold' }}><FormattedMessage id="templates.templatesview.note" /></TableCell>
                  <TableCell align="left"></TableCell>
                </TableRow>
              </TableHead>
              
              <TableBody>
                <TableRow sx={{ p: 1 }} hover>
                  <TableCell align="left" sx={{ fontWeight: 'bold' }}>
                    <IconButton sx={{ color: 'uiElements.main' }}><EditIcon onClick={() => setTemplateComposer(true)} /></IconButton>
                  </TableCell>
                  <TableCell>Page template 1</TableCell>
                  <TableCell>General page structure</TableCell>
                  <TableCell align="left" sx={{ fontWeight: 'bold', width: "80px" }}>
                    <IconButton sx={{ color: 'uiElements.main' }}><DeleteOutlineOutlinedIcon /></IconButton>
                  </TableCell>
                </TableRow>

              </TableBody>
            </Table>
          </TableContainer>
        </Card>
      </Box>
    </>

  );
}

export { TemplatesView }