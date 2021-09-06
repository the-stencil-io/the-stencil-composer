import React from 'react';
import { makeStyles, Theme, createStyles, Typography } from '@material-ui/core';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { FormattedMessage } from 'react-intl';

import { API, Ide } from '../../deps';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    table: {
      minWidth: 650,
    },
    iconButton: {
      padding: 2,
      marginLeft: theme.spacing(3),
      color: theme.palette.primary.dark,
      "&:hover, &.Mui-focusVisible": {
        backgroundColor: theme.palette.info.main,
        color: theme.palette.background.paper,
        "& .MuiSvgIcon-root": {
          color: theme.palette.background.paper,
        }
      }
    },
    bold: {
      fontWeight: 'bold',
    },
    title: {
      margin: theme.spacing(1),
      color: theme.palette.primary.main
    },
    tableCell: {
      paddingTop: 0,
      paddingBottom: 0
    }
  }));



interface LinkTableProps {
  article: API.CMS.Article
}

const LinkTable: React.FC<LinkTableProps> = ({ article }) => {
  const classes = useStyles();
  const site = Ide.useSite();

  const links: API.CMS.Link[] = Object.values(site.links).filter(link => link.body.articles.includes(article.id));


  return (
    <>
   <Typography variant="h3" className={classes.title}>{article.body.name}{": "}<FormattedMessage id="links" /> </Typography>
    <TableContainer component={Paper}>
      <Table className={classes.table} size="small" aria-label="a dense table" >
        <TableHead>
          <TableRow>
            <TableCell className={classes.bold} align="left"><FormattedMessage id="link.type"/></TableCell>
            <TableCell className={classes.bold} align="left"><FormattedMessage id="locale"/></TableCell>
            <TableCell className={classes.bold} align="left"><FormattedMessage id="description"/></TableCell>
            <TableCell className={classes.bold} align="left"><FormattedMessage id="value"/></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {links.map((link, index) => (
            <TableRow hover key={index}>
              <TableCell className={classes.tableCell} align="left">{link.body.contentType}</TableCell>
              <TableCell className={classes.tableCell} align="left">{site.locales[link.body.locale].body.value}</TableCell>
              <TableCell className={classes.tableCell} align="left">{link.body.description}</TableCell>
              <TableCell className={classes.tableCell} align="left">{link.body.content}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer >
    </>
  );
}

export { LinkTable }




