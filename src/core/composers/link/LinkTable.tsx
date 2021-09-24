import React from 'react';
import { Theme, Typography } from '@mui/material';
import { makeStyles, createStyles } from '@mui/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
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
      color: theme.palette.link.dark,
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

  const links: API.CMS.Link[] = Object.values(site.links).filter(link => link.body.articles.includes(article.id))
    .sort((o1, o2) => o1.body.description.localeCompare(o2.body.description));


  return (
    <>
   <Typography variant="h3" className={classes.title}>{article.body.name}{": "}<FormattedMessage id="links" /> </Typography>
    <TableContainer component={Paper}>
      <Table className={classes.table} size="small" >
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




