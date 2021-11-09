import React from 'react';
import { createStyles, makeStyles } from '@mui/styles';
import {
  Theme, Typography, Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper, AppBar, Toolbar, Button, IconButton, ButtonGroup
} from '@mui/material';

import AddIcon from '@mui/icons-material/AddOutlined';
import EditOutlined from '@mui/icons-material/EditOutlined';
import WorkOutlineOutlinedIcon from '@mui/icons-material/WorkOutlineOutlined';

import { FormattedMessage } from 'react-intl';

import { WorkflowComposer } from '../workflow/WorkflowComposer';
import { WorkflowEdit } from '../workflow/WorkflowEdit';
import { Composer, StencilClient } from '../context';

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
    icon: {
      marginRight: theme.spacing(1)
    },
    appBar: {
      position: 'relative',
      backgroundColor: theme.palette.workflow.main,
      color: theme.palette.secondary.contrastText,
    },

  }));


interface WorkflowsTableProps {
  article: StencilClient.Article
}

const WorkflowsTable: React.FC<WorkflowsTableProps> = ({ article }) => {
  const classes = useStyles();
  const {site} = Composer.useComposer();

  const workflows: StencilClient.Workflow[] = Object.values(site.workflows).filter(workflow => workflow.body.articles.includes(article.id))
    .sort((o1, o2) => o1.body.value.localeCompare(o2.body.value));

  const [dialogOpen, setDialogOpen] = React.useState<undefined | 'ArticleWorkflowsEdit' | 'WorkflowEdit' | 'WorkflowComposer' | 'WorkflowRemovePage'>(undefined);


  const handleDialogClose = () => {
    setDialogOpen(undefined);
    setWorkflow(undefined)
  }

  const [workflow, setWorkflow] = React.useState<undefined | StencilClient.Workflow>();


  return (
    <>
      { dialogOpen === 'WorkflowEdit' && workflow ? <WorkflowEdit workflowId={workflow.id} onClose={() => handleDialogClose()} /> : null}
      { dialogOpen === 'WorkflowComposer' ? <WorkflowComposer onClose={handleDialogClose} /> : null}

      <AppBar className={classes.appBar}>
        <Toolbar className={classes.titleBox}>
          <Typography variant="h3" className={classes.title}>{article.body.name}{": "}<FormattedMessage id="workflows" /> </Typography>
          <ButtonGroup >
            <Button variant="text" className={classes.button} autoFocus onClick={() => setDialogOpen("ArticleWorkflowsEdit")}><AddIcon className={classes.icon} />
              <FormattedMessage id='article.workflows.addremove' /></Button>
            <Button variant="text" className={classes.button} autoFocus onClick={() => setDialogOpen("WorkflowComposer")}><WorkOutlineOutlinedIcon className={classes.icon} />
              <FormattedMessage id='workflow.create' /></Button>
          </ButtonGroup>
        </Toolbar>
      </AppBar>

      <TableContainer component={Paper}>
        <Table className={classes.table} size="small">
          <TableHead>
            <TableRow>
              <TableCell className={classes.bold} align="left"><FormattedMessage id="workflow.composer.name" /></TableCell>
              <TableCell align="right" />
            </TableRow>
          </TableHead>
          <TableBody>
            {workflows.map((workflow, index) => (
              <TableRow key={index} hover>
                <TableCell className={classes.tableCell} align="left">{workflow.body.value}</TableCell>
                <TableCell align="right">
                  <IconButton className={classes.iconButton}>
                    <EditOutlined onClick={() => {
                      setDialogOpen('WorkflowEdit')
                      setWorkflow(workflow)
                    }
                    } />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

export { WorkflowsTable }




