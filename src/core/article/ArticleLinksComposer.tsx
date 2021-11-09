import React from 'react';
import { makeStyles } from '@mui/styles';

import {
  Typography, Table, Card, Button, ButtonGroup, TableBody,
  TableCell, Checkbox, TableHead, TableRow
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import CheckIcon from '@mui/icons-material/Check';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';

import { FormattedMessage } from 'react-intl';
import { LinkComposer } from '../link/LinkComposer';
import { Composer, StencilClient } from '../context';


const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    margin: theme.spacing(2),
  },
  appBar: {
    position: 'relative',
    backgroundColor: theme.palette.link.main,
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
  bold: {
    fontWeight: 'bold',
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
    fontWeight: 'bold'

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
      backgroundColor: theme.palette.link.dark,
      fontWeight: 'bold',
    }
  },
  buttonGroup: {
    color: theme.palette.link.main
  },
}));



const ArticleLinksComposer: React.FC<{ articleId: StencilClient.ArticleId }> = (props) => {
  const classes = useStyles();
  const { service, actions, site, session } = Composer.useComposer();

  const view = session.getArticleView(props.articleId);
  
  const [selectedLinks, setSelectedLinks] = React.useState(view.links.map(l => l.link.id));
  const links: StencilClient.Link[] = Object.values(site.links).sort((o1, o2) => o1.body.value.localeCompare(o2.body.value));

  const handleChange = (event: any, id: StencilClient.LinkId) => {
    const selected: boolean = event.target.checked;
    const newLinks: StencilClient.LinkId[] = [...selectedLinks];
    const currentIndex = newLinks.indexOf(id);

    if (selected && currentIndex < 0) {
      newLinks.push(id);
    } else if (selected === false && currentIndex > -1) {
      newLinks.splice(currentIndex, 1);
    }
    setSelectedLinks(newLinks);
  };

  const handleSave = () => {
    const article = site.articles[props.articleId]
    const entity: StencilClient.ArticleMutator = {
      articleId: article.id,
      name: article.body.name,
      parentId: article.body.parentId,
      order: article.body.order,
      links: [...selectedLinks],
      workflows: undefined
    };
    service.update().article(entity)
      .then(_success => actions.handleLoadSite());
  }

  const [dialogOpen, setDialogOpen] = React.useState<undefined | 'LinkComposer'>(undefined);

  return (
    <>
      { dialogOpen === 'LinkComposer' ? <LinkComposer onClose={() => setDialogOpen(undefined)} /> : null}
      <AppBar className={classes.appBar}>
        <Toolbar>
          <Typography variant="h3" className={classes.title}>{view.article.body.name}{": "}<FormattedMessage id="resource.edit.links" /></Typography>
          <ButtonGroup variant="text" className={classes.buttonGroup}>
            <Button className={classes.button} onClick={() => setSelectedLinks(view.links.map(l => l.link.id))}><CloseIcon /><FormattedMessage id='button.cancel' /></Button>
            <Button className={classes.button} onClick={() => setDialogOpen('LinkComposer')} autoFocus ><AddIcon /><FormattedMessage id='link.composer.title' /></Button>
            <Button className={classes.button} onClick={handleSave} autoFocus ><CheckIcon /><FormattedMessage id='button.apply' /></Button>
          </ButtonGroup>
        </Toolbar>
      </AppBar>

      <div className={classes.root}>
        <Card className={classes.card}>
          <Typography variant="h3" className={classes.title}><FormattedMessage id="article.links.sitelinks" /></Typography>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell className={classes.bold} align="center"><FormattedMessage id="button.addremove" /></TableCell>
                <TableCell className={classes.bold} align="left"><FormattedMessage id="link.type" /></TableCell>
                <TableCell className={classes.bold} align="left"><FormattedMessage id="locales" /></TableCell>
                <TableCell className={classes.bold} align="left"><FormattedMessage id="value" /></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {links.map((link, index) => (
                <TableRow hover key={index}>
                  <TableCell className={classes.tableCell} align="center">
                    <Checkbox size="small" color="secondary" checked={selectedLinks.includes(link.id) === true} onChange={(event) => handleChange(event, link.id)} />
                  </TableCell>
                  <TableCell className={classes.tableCell} align="left">{link.body.contentType}</TableCell>
                  <TableCell className={classes.tableCell} align="left">{link.body.labels.map((label) => site.locales[label.locale].body.value).join(", ")}</TableCell>
                  <TableCell className={classes.tableCell} align="left">{link.body.value}</TableCell>


                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      </div>
    </>
  );
}

export { ArticleLinksComposer }
