import React from 'react';
import { makeStyles } from '@mui/styles';
import {
  Theme,
  Checkbox, AppBar, Toolbar,
  Typography, Table, Card, Button, ButtonGroup, TableBody, TableCell,
  TableRow, TableHead
} from '@mui/material';

import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import CheckIcon from '@mui/icons-material/Check';

import { FormattedMessage } from 'react-intl';

import { WorkflowComposer } from '../workflow/WorkflowComposer';
import { Composer, StencilClient } from '../context';


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
      backgroundColor: theme.palette.workflow.dark,
      fontWeight: 'bold',
    }
  },
  buttonGroup: {
    color: theme.palette.article.main
  },
}));


const ArticleWorkflowsComposer: React.FC<{articleId: StencilClient.ArticleId}> = ({articleId}) => {
  const classes = useStyles();
  const {service, actions, site, session} = Composer.useComposer();
  const view = session.getArticleView(articleId);
  const [dialogOpen, setDialogOpen] = React.useState<undefined | "WorkflowComposer">(undefined);

  const [selectedWorkflows, setSelectedWorkflows] = React.useState(view.workflows.map(v => v.workflow.id))
  const workflows: StencilClient.Workflow[] = Object.values(site.workflows).sort((o1, o2) => o1.body.value.localeCompare(o2.body.value));

  const handleChange = (event: any, id: StencilClient.WorkflowId) => {
    const selected: boolean = event.target.checked;
    const newWorkflows: StencilClient.WorkflowId[] = [...selectedWorkflows];
    const currentIndex = newWorkflows.indexOf(id);

    if (selected && currentIndex < 0) {
      newWorkflows.push(id);
    } else if (selected === false && currentIndex > -1) {
      newWorkflows.splice(currentIndex, 1);
    }
    setSelectedWorkflows(newWorkflows);
  };


  const handleSave = () => {
    const article = site.articles[articleId]
    const entity: StencilClient.ArticleMutator = {
      articleId: article.id,
      name: article.body.name,
      parentId: article.body.parentId,
      order: article.body.order,
      workflows: [...selectedWorkflows],
      links: undefined
    };
    service.update().article(entity)
      .then(_success => actions.handleLoadSite())
    console.log("saving selected workflows" + selectedWorkflows);

  }

  return (
    <>
      {dialogOpen === 'WorkflowComposer' ? <WorkflowComposer onClose={() => setDialogOpen(undefined)} /> : null}

        <AppBar className={classes.appBar}>
          <Toolbar>
            <Typography variant="h3" className={classes.title}>{view.article.body.name}{": "}
              <FormattedMessage id="article.workflows.addremove" /></Typography>
            <ButtonGroup variant="text" className={classes.buttonGroup}>
              <Button onClick={() => setSelectedWorkflows(view.workflows.map(v => v.workflow.id))} className={classes.button}><CloseIcon /><FormattedMessage id='button.cancel' /></Button>
              <Button className={classes.button} onClick={() => setDialogOpen('WorkflowComposer')}><AddIcon /><FormattedMessage id='workflow.create' /></Button>
              <Button onClick={handleSave} className={classes.button} autoFocus ><CheckIcon /><FormattedMessage id='button.apply' /></Button>
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
                  <TableCell className={classes.bold} align="center"><FormattedMessage id="button.addremove" /></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {workflows.map((workflow, index) => (
                  <TableRow hover key={index}>
                    <TableCell className={classes.tableCell} align="left">{workflow.body.value}</TableCell>
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
    </>
  );
}

export { ArticleWorkflowsComposer }

