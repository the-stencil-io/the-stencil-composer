import React from 'react';
import {
  makeStyles, Typography, Table, Card, Dialog, Button, ButtonGroup,
  TableBody, TableCell, TableRow, TableHead, Theme
} from '@mui/material';

import Checkbox from '@mui/material/Checkbox';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';

import { FormattedMessage } from 'react-intl';

import { API, Ide } from '../../deps';


const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'flex',
    margin: theme.spacing(2),
  },
  appBar: {
    position: 'relative',
    backgroundColor: theme.palette.workflow.main,
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
    fontWeight: 500

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
      backgroundColor: theme.palette.workflow.dark,
      fontWeight: 'bold',
    }
  },
  buttonGroup: {
    color: theme.palette.article.main
  },
}));


const getArticleWorkflows: (site: API.CMS.Site, articleId: API.CMS.ArticleId) => API.CMS.WorkflowId[] = (site, articleId) => {
  return Object.values(site.workflows).filter(workflow => workflow.body.articles.includes(articleId)).map(w => w.id);
}

interface ArticleWorkflowsEditProps {
  article: API.CMS.Article,
  articleId: API.CMS.ArticleId,
  onClose: () => void,
}

const ArticleWorkflowsEdit: React.FC<ArticleWorkflowsEditProps> = (props) => {
  const classes = useStyles();
  const site = Ide.useSite();

  const { service, actions } = Ide.useIde();
  const [selectedWorkflows, setSelectedWorkflows] = React.useState(getArticleWorkflows(site, props.articleId))

  const workflows: API.CMS.Workflow[] = Object.values(site.workflows).sort((o1, o2) => o1.body.content.localeCompare(o2.body.content));

  const handleChange = (event: any, id: API.CMS.WorkflowId) => {
    const selected: boolean = event.target.checked;
    const newWorkflows: API.CMS.WorkflowId[] = [...selectedWorkflows];
    const currentIndex = newWorkflows.indexOf(id);

    if (selected && currentIndex < 0) {
      newWorkflows.push(id);
    } else if (selected === false && currentIndex > -1) {
      newWorkflows.splice(currentIndex, 1);
    }
    setSelectedWorkflows(newWorkflows);
  };


  const handleSave = () => {
    const article = site.articles[props.articleId]
    const entity: API.CMS.ArticleMutator = {
      articleId: article.id,
      name: article.body.name,
      parentId: article.body.parentId,
      order: article.body.order,
      workflows: [...selectedWorkflows],
      links: undefined
    };
    service.update().article(entity)
      .then(_success => actions.handleLoadSite())
      .then(() => props.onClose());
    console.log("saving selected workflows" + selectedWorkflows);

  }

  return (

    <Dialog fullScreen open={true} onClose={props.onClose} >
      <AppBar className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6" className={classes.title}>{props.article.body.name}{": "}
            <FormattedMessage id="article.workflows.addremove" /></Typography>
          <ButtonGroup variant="text" className={classes.buttonGroup}>
            <Button onClick={props.onClose} className={classes.button}><FormattedMessage id='button.cancel' /></Button>
            <Button onClick={handleSave} className={classes.button} autoFocus ><FormattedMessage id='button.apply' /></Button>
          </ButtonGroup>
        </Toolbar>
      </AppBar>

      <div className={classes.root}>
        <Card className={classes.card}>
          <Typography variant="h3" className={classes.title}><FormattedMessage id="article.workflows" /></Typography>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell className={classes.bold} align="left"><FormattedMessage id="workflow.technicalname" /></TableCell>
                <TableCell className={classes.bold} align="left"><FormattedMessage id="locale" /></TableCell>
                <TableCell className={classes.bold} align="left"><FormattedMessage id="workflow.composer.name" /></TableCell>
                <TableCell className={classes.bold} align="center"><FormattedMessage id="button.addremove" /></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {workflows.map((workflow, index) => (
                <TableRow hover key={index}>
                  <TableCell className={classes.tableCell} align="left">{workflow.body.content}</TableCell>
                  <TableCell className={classes.tableCell} align="left">{site.locales[workflow.body.locale].body.value}</TableCell>
                  <TableCell className={classes.tableCell} align="left">{workflow.body.name}</TableCell>
                  <TableCell className={classes.tableCell} align="center">

                    <Checkbox size="small" color="secondary"
                      checked={selectedWorkflows.includes(workflow.id) === true}
                      onChange={(event) => handleChange(event, workflow.id)} />
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

export { ArticleWorkflowsEdit }
