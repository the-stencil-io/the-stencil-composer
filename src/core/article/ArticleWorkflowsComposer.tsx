import React from 'react';
import { makeStyles } from '@mui/styles';
import {
  Theme, Box,
  Checkbox, AppBar, Toolbar, OutlinedInput,
  Typography, Table, Card, Button, ButtonGroup,

  TableContainer,
  TableBody, TableCell,
  TableRow, TableHead, IconButton, Paper
} from '@mui/material';

import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import CheckIcon from '@mui/icons-material/Check';
import EditIcon from '@mui/icons-material/Edit';

import { FormattedMessage } from 'react-intl';

import { WorkflowComposer } from '../workflow/WorkflowComposer';
import { WorkflowEdit } from '../workflow/WorkflowEdit';
import { Composer, StencilClient } from '../context';
import StencilStyles from '../styles';


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
  icon: {
    color: theme.palette.workflow.main
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


const ArticleWorkflowsComposer: React.FC<{ articleId: StencilClient.ArticleId }> = ({ articleId }) => {

  const { service, actions, site, session } = Composer.useComposer();
  const view = session.getArticleView(articleId);

  const [workflowComposerOpen, setWorkflowComposerOpen] = React.useState<boolean>(false);
  const [workflowEditOpen, setWorkflowEditOpen] = React.useState<undefined | StencilClient.WorkflowId>(undefined);

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
      <StencilStyles.TransferList
        title="article.workflows.siteworkflows"
        searchTitle="workflow.technicalname"
        selectedTitle="article.workflows.selectedworkflows"
        headers={["workflow.technicalname"]}
        rows={workflows.map(row => row.id)}
        filterRow={(row, search) => {
          const workflow = site.workflows[row];
          return workflow.body.value.toLowerCase().indexOf(search) > -1;
        }}
        renderCells={(row) => [site.workflows[row].body.value]}
        selected={selectedWorkflows}
        submit={{
          title: "button.apply",
          disabled: false,
          onClick: () => {}
        }}
      />
    </>
  );
}

export { ArticleWorkflowsComposer }

