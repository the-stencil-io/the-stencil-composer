import React from 'react';
import { makeStyles } from '@mui/styles';
//import { styled } from '@mui/material/styles';
import {
  Typography, Table, Card, Button, ButtonGroup, Dialog, TableBody,
  TableCell, Checkbox, TableHead, TableRow
} from '@mui/material';

import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import { FormattedMessage } from 'react-intl';

import { API, Ide } from '../../deps';


const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    margin: theme.spacing(2),
  },
  appBar: {
    position: 'relative',
    backgroundColor: theme.palette.article.main,
    color: theme.palette.secondary.contrastText,
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
  },
  button: {
    fontWeight: 'bold',
    color: theme.palette.background.paper,
    "&:hover, &.Mui-focusVisible": {
      color: theme.palette.background.paper,
      backgroundColor: theme.palette.article.dark,
      fontWeight: 'bold',
    }
  },
  buttonGroup: {
    color: theme.palette.article.main
  },
}));

const getArticleLinks: (site: API.CMS.Site, articleId: API.CMS.ArticleId) => API.CMS.LinkId[] = (site, articleId) => {
  return Object.values(site.links).filter(link => link.body.articles.includes(articleId)).map(l => l.id);
}

const ArticleLinksEdit: React.FC<{ article: API.CMS.Article, onClose: () => void, articleId: API.CMS.ArticleId}> = (props) => {
  const classes = useStyles();
  const site = Ide.useSite();

  const handleChange = (event: any) => {
    setSelectedLinks(event.target.checked);
  };

  const [selectedLinks, setSelectedLinks] = React.useState(getArticleLinks(site, props.articleId));
  const links: API.CMS.Link[] = Object.values(site.links).sort((o1, o2) => o1.body.description.localeCompare(o2.body.description));

  
  return (

    <Dialog fullScreen open={true} onClose={props.onClose} >
      <AppBar className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6" className={classes.title}>{props.article.body.name}{": "}<FormattedMessage id="article.links.addremove" /></Typography>
          <ButtonGroup variant="text" className={classes.buttonGroup}>
            <Button className={classes.button} onClick={props.onClose}><FormattedMessage id='button.cancel' /></Button>
            <Button className={classes.button} onClick={props.onClose} autoFocus ><FormattedMessage id='button.apply' /></Button>
          </ButtonGroup>
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
                  <TableCell className={classes.tableCell} align="left">{site.locales[link.body.locale].body.value}</TableCell>
                  <TableCell className={classes.tableCell} align="left">{link.body.description}</TableCell>
                  <TableCell className={classes.tableCell} align="left">{link.body.content}</TableCell>

                  <TableCell className={classes.tableCell} align="center">
                    <Checkbox size="small" color="secondary" checked={selectedLinks.includes(link.id) === true} onChange={handleChange} />
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
