import React from 'react';
import { createStyles, makeStyles } from '@mui/styles';
import {
  Theme, Typography, Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper, AppBar, Toolbar, Button, IconButton
} from '@mui/material';

import AddIcon from '@mui/icons-material/AddOutlined';
import EditOutlined from '@mui/icons-material/EditOutlined';

import { FormattedMessage } from 'react-intl';

import { ArticleWorkflowsEdit } from '../article/ArticleWorkflowsEdit';
import { WorkflowEdit } from './WorkflowEdit';
import { API, Ide } from '../../deps';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    table: {
      minWidth: 650,
    },
    titleBox: {
      display: 'flex',
      justifyContent: 'space-between',
      backgroundColor: theme.palette.workflow.main,
      color: theme.palette.workflow.contrastText
    },
    iconButton: {
      padding: 2,
      marginRight: 2,
      color: theme.palette.workflow.main,
      "&:hover, &.Mui-focusVisible": {
        backgroundColor: theme.palette.workflow.main,
        color: theme.palette.workflow.contrastText,
        "& .MuiSvgIcon-root": {
          color: theme.palette.workflow.contrastText,
        }
      }
    },
    bold: {
      fontWeight: 'bold',
    },
    title: {
      paddingLeft: theme.spacing(1),
      color: theme.palette.workflow.contrastText,
      fontWeight: 'bold'
    },
    tableCell: {
      paddingTop: 0,
      paddingBottom: 0
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
    appBar: {
      position: 'relative',
      backgroundColor: theme.palette.workflow.main,
      color: theme.palette.secondary.contrastText,
    },

  }));


interface WorkflowsTableProps {
  article: API.CMS.Article
}

const WorkflowsTable: React.FC<WorkflowsTableProps> = ({ article }) => {
  const classes = useStyles();
  const site = Ide.useSite();

  const workflows: API.CMS.Workflow[] = Object.values(site.workflows).filter(workflow => workflow.body.articles.includes(article.id))
    .sort((o1, o2) => o1.body.name.localeCompare(o2.body.name));

  const [dialogOpen, setDialogOpen] = React.useState<undefined | 'ArticleWorkflowsEdit' | 'WorkflowEdit'>(undefined);


  const handleDialogClose = () => {
    setDialogOpen(undefined);
    setWorkflow(undefined)
  }

  const [workflow, setWorkflow] = React.useState<undefined | API.CMS.Workflow>();


  return (
    <>
      { dialogOpen === 'ArticleWorkflowsEdit' ? <ArticleWorkflowsEdit article={article} articleId={article.id} onClose={() => handleDialogClose()} /> : null}
      { dialogOpen === 'WorkflowEdit' && workflow ? <WorkflowEdit workflow={workflow} onClose={() => handleDialogClose()} /> : null}

      <AppBar className={classes.appBar}>
        <Toolbar className={classes.titleBox}>
          <Typography variant="h3" className={classes.title}>{article.body.name}{": "}<FormattedMessage id="workflows" /> </Typography>
          <Button variant="text" className={classes.button} autoFocus onClick={() => setDialogOpen("ArticleWorkflowsEdit")}><AddIcon />
            <FormattedMessage id='article.workflows.addremove' /></Button>
        </Toolbar>
      </AppBar>

      <TableContainer component={Paper}>
        <Table className={classes.table} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell className={classes.bold} align="left"><FormattedMessage id="workflow.technicalname" /></TableCell>
              <TableCell className={classes.bold} align="left"><FormattedMessage id="locale" /></TableCell>
              <TableCell className={classes.bold} align="left"><FormattedMessage id="workflow.composer.name" /></TableCell>
              <TableCell align="right" />
            </TableRow>
          </TableHead>
          <TableBody>
            {workflows.map((workflow, index) => (
              <TableRow key={index} hover>
                <TableCell className={classes.tableCell} align="left">{workflow.body.name}</TableCell>
                <TableCell className={classes.tableCell} align="left">{site.locales[workflow.body.locale].body.value}</TableCell>
                <TableCell className={classes.tableCell} align="left">{workflow.body.content}</TableCell>
                <TableCell align="right"><IconButton className={classes.iconButton}>
                  <EditOutlined onClick={() => {
                    setDialogOpen('WorkflowEdit')
                    setWorkflow(workflow)
                  }
                  } /></IconButton></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

export { WorkflowsTable }




