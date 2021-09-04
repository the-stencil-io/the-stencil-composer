import React from 'react';
import { makeStyles, createStyles, Theme, Typography, Table, Tooltip, Card, Paper } from '@material-ui/core';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
import { FormattedMessage } from 'react-intl';

import { API } from '../../deps';


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      display: 'flex'
    },
    root: {
      margin: theme.spacing(1),
      flexWrap: 'wrap',
    },
    card: {
      margin: theme.spacing(1),
      width: '40vw',
     flexGrow: 1,
      flexDirection: 'column',
      "&:hover, &.Mui-focusVisible": {
        color: theme.palette.secondary.dark,
        fontWeight: 'bold',
      }
    },
    bold: {
      fontWeight: 'bold',
    },
    typography: {
      marginBottom: theme.spacing(3),
      fontWeight: 'bold'
    },
    tableCell: {
      paddingTop: 0,
      paddingBottom: 0
    },
    paper: {
      backgroundColor: theme.palette.info.light,
    },
    select: {
      marginRight: theme.spacing(1),
      padding: 0,
      minWidth: '30ch',
      backgroundColor: theme.palette.background.paper
    },

    title: {
      margin: theme.spacing(1),
      color: theme.palette.text.primary,
    },
    heading: {
      fontWeight: 'bold',
      padding: theme.spacing(1),
      textAlign: 'center',
    },
    iconButton: {
      color: theme.palette.primary.dark,
      "&:hover, &.Mui-focusVisible": {
        backgroundColor: theme.palette.info.main,
        color: theme.palette.background.paper,
        "& .MuiSvgIcon-root": {
          color: theme.palette.background.paper,
        }
      }
    },
    checkIcon: {
      color: theme.palette.success.main
    },
    checkIconOrange: {
      color: theme.palette.warning.main
    }
  }),
);


interface LocalesOverviewProps {
  site: API.CMS.Site;
}


const LocalesOverview: React.FC<LocalesOverviewProps> = ({ site }) => {
  const classes = useStyles();

  const locales: API.CMS.SiteLocale[] = Object.values(site.locales);
  const articles: API.CMS.Article[] = Object.values(site.articles);
  const pages: API.CMS.Page[] = Object.values(site.pages);



  //check if page has content
  const isContent = (locale: API.CMS.SiteLocale, article: API.CMS.Article) => {
    const contents = pages
      .filter(p => p.body.article === article.id)
      .filter(p => p.body.locale === locale.id)
      .filter(p => p.body.content);
    return contents.length > 0;
  }

  // check if locale exists on article
  const isLocale = (locale: API.CMS.SiteLocale, article: API.CMS.Article): boolean => {
    const articlePages = pages
      .filter(p => p.body.article === article.id)
      .filter(p => p.body.locale === locale.id);
    return articlePages.length > 0;
  }

  return (
    <div >
      <Card className={classes.card}>
          <Typography variant="h3" className={classes.title}><FormattedMessage id="locale.overview" /></Typography>
          <TableContainer component={Paper}>
            <Table size="small">
              <TableRow>
                <TableCell className={classes.bold} align="left"><FormattedMessage id="article.name" /></TableCell>
                {locales.map((locale, index) => <TableCell key={index} className={classes.bold} align="left" >{locale.body.value}</TableCell>
                )}
              </TableRow>


              {articles.map((article, index) => (
                <TableRow key={index} hover>
                  <TableCell align="left">{article.body.name}</TableCell>
                  {locales.map((locale, index) => (
                    <TableCell key={index} className={classes.bold} align="left">
                      { isLocale(locale, article) && isContent(locale, article) ?
                        (<span><Tooltip title={<FormattedMessage id="locales.content" />}><CheckCircleOutlineIcon className={classes.checkIcon} /></Tooltip></span>) :
                        isLocale(locale, article) === true ?
                          (<span><Tooltip title={<FormattedMessage id="locales.nocontent" />}><CheckCircleOutlineIcon className={classes.checkIconOrange} /></Tooltip></span>) :
                          (<span><Tooltip title={<FormattedMessage id="locales.nopage" />}><ErrorOutlineIcon /></Tooltip></span>)
                      }
                    </TableCell>)
                  )}
                </TableRow>
              ))}
            </Table>
          </TableContainer>
      </Card>
    </div >

  );
}

export { LocalesOverview }

