import React from 'react';
import { Box, Typography, Card } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import { FormattedMessage, useIntl } from 'react-intl';

import { LocalesOverview } from './LocalesOverview';
import { LocaleDisable } from './LocaleDisable';
import { Composer, StencilClient } from '../context';


const LocalesView: React.FC<{}> = () => {
  const { site } = Composer.useComposer();
  const locales = Object.values(site.locales);
  const title = useIntl().formatMessage({ id: "locales" });

  return (
    <>
      <Box display="flex" sx={{ p: 1, justifyItems: 'center', flexDirection: 'column' }}>
        <Typography variant="h3" sx={{ fontWeight: 'bold', p: 1 }}>{title}{": "}{locales.length}</Typography>
      </Box>

      <div>
        <Card sx={{
          margin: 1,
          width: '50vw'
        }}>
          <Typography variant="h4" sx={{ p: 2, backgroundColor: "table.main" }}><FormattedMessage id="locales" /> </Typography>

          <TableContainer component={Paper}>
            <Table size="small">
              <TableHead>
                <TableRow >
                  <TableCell sx={{ fontWeight: 'bold' }} align="left">
                    <Typography sx={{ fontWeight: 'bold' }}>
                      <FormattedMessage id="locale" /></Typography></TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }} align="left">
                    <Typography sx={{ fontWeight: 'bold' }}>
                      <FormattedMessage id="status" /></Typography></TableCell>
                </TableRow>
              </TableHead>
              <TableBody >
                {locales.map((locale, index) => (<Row key={index} site={site} locale={locale} />))}
              </TableBody>
            </Table>
          </TableContainer>
        </Card>
        <LocalesOverview site={site} />
      </div>
    </>
  );
}

interface RowProps {
  site: StencilClient.Site,
  locale: StencilClient.SiteLocale,
}

const Row: React.FC<RowProps> = ({ locale }) => {
  const { site } = Composer.useComposer();

  /*const handleUpdate = () => {
    const entity: StencilClient.LocaleMutator = { enabled, id: locale.id };
    console.log("entity", entity)
    ide.service.update().locale(entity).then(success => {
      console.log(success)
      ide.actions.handleLoadSite();
    });
  }
  */

  //const locales: StencilClient.SiteLocale[] = Object.values(site.locales);


  return (
    <TableRow key={locale.id} hover>
      <TableCell align="left">{locale.body.value}</TableCell>
      <TableCell>
        <LocaleDisable site={site} locale={locale} />
      </TableCell>
    </TableRow>
  )
}

export { LocalesView }




