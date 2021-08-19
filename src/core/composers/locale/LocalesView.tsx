import React from 'react';
import { makeStyles, Theme, createStyles, Typography, Card } from '@material-ui/core';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import { FormattedMessage } from 'react-intl';

import { LocalesOverview } from './LocalesOverview';
import { LocaleDisable } from './LocaleDisable';
import { API, Ide } from '../../deps';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      display: 'flex'
    },
    cardContent: {
      flexGrow: 1,
    },
    root: {
      margin: theme.spacing(1),
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'center',
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

    bold: {
      fontWeight: 'bold'
    },
    title: {
      margin: theme.spacing(1),
      color: theme.palette.primary.main
    },
  }));

const useRowStyles = makeStyles((theme: Theme) =>
  createStyles({
    row: {
      '& > *': {
        // paddingLeft: 15
      },
    },
    table: {
      margin: theme.spacing(2)
    },
    bold: {
      fontWeight: 'bold',
      borderBottom: 'unset'
    },
    column: {
      fontWeight: 'bold',
      borderBottom: 'unset',
      padding: 0
    },
    iconButton: {
      padding: 2,
      color: theme.palette.primary.dark,
      "&:hover, &.Mui-focusVisible": {
        backgroundColor: theme.palette.info.main,
        color: theme.palette.background.paper,
        "& .MuiSvgIcon-root": {
          color: theme.palette.background.paper,
        }
      }
    },
  }));


const LocalesView: React.FC<{}> = () => {
  const classes = useStyles();
  const site = Ide.useSite();
  const locales = Object.values(site.locales);

  return (

    <div className={classes.container} >
      <Card className={classes.card}>
        <Typography variant="h3" className={classes.title}><FormattedMessage id="locales" /> </Typography>
        <TableContainer component={Paper}>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell className={classes.bold} align="left"><FormattedMessage id="locale" /></TableCell>
                <TableCell className={classes.bold} align="left"><FormattedMessage id="status" /></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {locales.map((locale, index) => (<Row key={index} site={site} locale={locale} />))}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>
      <LocalesOverview site={site} />
    </div>

  );
}

interface RowProps {
  site: API.CMS.Site,
  locale: API.CMS.SiteLocale,
}

const Row: React.FC<RowProps> = ({ locale }) => {
  const classes = useRowStyles();
  const ide = Ide.useIde();
  const { site } = ide.session;

  /*const handleUpdate = () => {
    const entity: API.CMS.LocaleMutator = { enabled, id: locale.id };
    console.log("entity", entity)
    ide.service.update().locale(entity).then(success => {
      console.log(success)
      ide.actions.handleLoadSite();
    });
  }
  */

  const locales: API.CMS.SiteLocale[] = Object.values(site.locales);


  return (
    <TableRow key={locale.id} hover className={classes.row}>
      <TableCell align="left">{locale.body.value}</TableCell>
      <TableCell>
        <LocaleDisable site={site} locale={locale} />
      </TableCell>
    </TableRow>
  )
}

export { LocalesView }




