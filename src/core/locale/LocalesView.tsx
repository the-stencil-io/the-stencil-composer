import React from 'react';
import { createStyles, makeStyles } from '@mui/styles';
import { Theme, Avatar, Box, Typography, Card } from '@mui/material';
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


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      display: 'flex'
    },
    card: {
      margin: theme.spacing(1),
      width: '40vw',
      flexDirection: 'column',
      "&:hover, &.Mui-focusVisible": {
        color: theme.palette.secondary.dark,
        fontWeight: 'bold',
      }
    },
    title: {
      margin: theme.spacing(1),
      color: theme.palette.text.primary
    },
    avatar: {
      alignSelf: "center",
      marginLeft: theme.spacing(1),
      backgroundColor: theme.palette.locale.main,
      textTransform: 'uppercase'
    }
  }));

const LocalesView: React.FC<{}> = () => {
  const classes = useStyles();
  const {site} = Composer.useComposer();
  const locales = Object.values(site.locales);
  const title = useIntl().formatMessage({ id: "locales" });

  return (
    <>
      <Box display="flex">
        <Avatar className={classes.avatar}>{title.substring(0, 2)}</Avatar>
        <Typography variant="h3" className={classes.title}><FormattedMessage id="locales" />: {locales.length}</Typography>
      </Box>

      <div className={classes.container} >
        <Card className={classes.card}>
          <Typography variant="h3" className={classes.title}><FormattedMessage id="locales" /> </Typography>
          <TableContainer component={Paper}>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell sx={{fontWeight: 'bold'}} align="left"><FormattedMessage id="locale" /></TableCell>
                  <TableCell sx={{fontWeight: 'bold'}} align="left"><FormattedMessage id="status" /></TableCell>
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
  const {site} = Composer.useComposer();

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




