import React from 'react';
import { makeStyles, Typography, Table, Card } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import Checkbox from '@material-ui/core/Checkbox';

import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { FormattedMessage } from 'react-intl';

import { API, Ide } from '../../deps';


const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    margin: theme.spacing(2),
  },
  appBar: {
    position: 'relative',
  },
  card: {
    margin: theme.spacing(1),
    width: 'auto',
    flexGrow: 1,
    flexDirection: 'column',
    "&:hover, &.Mui-focusVisible": {
      color: theme.palette.secondary.dark,
      fontWeight: 'bold',
    }
  },
  iconButton: {
    padding: 1,
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
    marginLeft: theme.spacing(2),
    flex: 1,
  },
  tableCell: {
    paddingTop: 0,
    paddingBottom: 0,
  }
}));

const getArticleLinks: (site:API.CMS.Site, articleId: API.CMS.ArticleId) => API.CMS.LinkId[] = (site, articleId) => {
  return Object.values(site.links).filter(link => link.body.articles.includes(articleId)).map(l => l.id);
}

const ArticleLinksEdit: React.FC<{ onClose: () => void, articleId: API.CMS.ArticleId }> = (props) => {
  const classes = useStyles();
  const site = Ide.useSite();

  const handleChange = (event: any) => {
    setSelectedLinks(event.target.checked);
  };

  const [selectedLinks, setSelectedLinks] = React.useState(getArticleLinks(site, props.articleId));
  const links: API.CMS.Link[] = Object.values(site.links);

  return (

    <Dialog fullScreen open={true} onClose={props.onClose} >
      <AppBar className={classes.appBar} color="default">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>"Article name"<FormattedMessage id="article.links.addremove" /></Typography>
          <Button variant="text" onClick={props.onClose} color="primary"><FormattedMessage id='button.cancel' /></Button>
          <Button variant="contained" onClick={props.onClose} color="primary" autoFocus ><FormattedMessage id='button.apply' /></Button>
        </Toolbar>
      </AppBar>

      <div className={classes.root}>
        <Card className={classes.card}>
          <Typography variant="h3" className={classes.title}><FormattedMessage id="article.links.sitelinks" /></Typography>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell className={classes.bold} align="left"><FormattedMessage id="link.type" /></TableCell>
                <TableCell className={classes.bold} align="left"><FormattedMessage id="locale" /></TableCell>
                <TableCell className={classes.bold} align="left"><FormattedMessage id="description" /></TableCell>
                <TableCell className={classes.bold} align="left"><FormattedMessage id="value" /></TableCell>
                <TableCell className={classes.bold} align="center"><FormattedMessage id="button.addremove" /></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {links.map((link, index) => (
                <TableRow hover key={index}>
                  <TableCell className={classes.tableCell} align="left">{link.body.contentType}</TableCell>
                  <TableCell className={classes.tableCell} align="left">{link.body.locale}</TableCell>
                  <TableCell className={classes.tableCell} align="left">{link.body.description}</TableCell>
                  <TableCell className={classes.tableCell} align="left">{link.body.content}</TableCell>

                  <TableCell className={classes.tableCell} align="center">
                    <Checkbox size="small" color="secondary" checked={selectedLinks.includes(link.id) === true} onChange={handleChange}/>
                  </TableCell>

                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      </div>
    </Dialog>
  );
}

export { ArticleLinksEdit }
