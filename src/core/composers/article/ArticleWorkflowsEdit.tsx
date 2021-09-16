import React from 'react';
import {
  makeStyles, Typography, Table, Card, Dialog, Button, ButtonGroup, TableBody, TableCell,
  TableRow, TableHead
} from '@material-ui/core';

import Checkbox from '@material-ui/core/Checkbox';
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

const ArticleWorkflowsEdit: React.FC<{ onClose: () => void, articleId: API.CMS.ArticleId }> = (props) => {
  const classes = useStyles();
  const site = Ide.useSite();

  const [articleId, setArticleId] = React.useState('');
  const articleWorkflows: API.CMS.WorkflowId[] = Object.values(site.workflows).filter(workflow => workflow.body.articles.includes(articleId)).map(w => w.id);
  const [selectedWorkflows, setSelectedWorkflows] = React.useState(articleWorkflows);

  const workflows: API.CMS.Workflow[] = Object.values(site.workflows).sort((o1, o2) => o1.body.content.localeCompare(o2.body.content));

   //check if workflow is associated with article

  const isWorkflow = (workflows: API.CMS.Workflow[], article: API.CMS.Article) => {
    const articleWorkflows = workflows
      .filter(w => w.body.articles[article.id] === props.articleId);
    return articleWorkflows.length > 0;
  }



  return (

    <Dialog fullScreen open={true} onClose={props.onClose} >
      <AppBar className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6" className={classes.title}>Article Name + <FormattedMessage id="article.workflows.addremove" /></Typography>
          <ButtonGroup className={classes.buttonGroup}  variant="text">
          <Button onClick={props.onClose} className={classes.button}><FormattedMessage id='button.cancel' /></Button>
          <Button onClick={props.onClose} className={classes.button} autoFocus ><FormattedMessage id='button.apply' /></Button>
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
                    <Checkbox size="small" color="secondary" checked={selectedWorkflows.includes(workflow.id) === true} />
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
