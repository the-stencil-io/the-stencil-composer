import React from 'react';
import { makeStyles, Theme, createStyles, Collapse, Box, Typography } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import EditOutlined from '@material-ui/icons/EditOutlined';
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';


import { FormattedMessage } from 'react-intl';

import { API, Ide } from '../../deps';
import { WorkflowRemovePage } from './WorkflowRemovePage';
import { WorkflowDelete } from './WorkflowDelete';
import { WorkflowEdit } from './WorkflowEdit';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    table: {
      minWidth: 650,
    },
    bold: {
      fontWeight: 'bold'
    },
    title: {
      margin: theme.spacing(1),
      color: theme.palette.primary.main
    },
  }));

const useRowStyles = makeStyles((theme: Theme) =>
  createStyles({
    row: {
      '& > *': {
        borderBottom: 'unset',
        padding: 0
      },
    },
    expandRow: {
      width: "30px"
    },
    bold: {
      fontWeight: 'bold',
      borderBottom: 'unset'
    },
    column: {
      width: '25%',
      fontWeight: 'bold',
      borderBottom: 'unset',
      padding: 0
    },
    tableCell: {
      paddingTop: 0,
      paddingBottom: 0
    },
    iconButton: {
      padding: 2,
      color: theme.palette.primary.dark,
      "&:hover, &.Mui-focusVisible": {
        backgroundColor: theme.palette.info.main,
        color: theme.palette.background.paper,
        "& .MuiSvgIcon-root": {
          color: theme.palette.background.paper,
        }
      }
    },
  }));


const WorkflowsView: React.FC<{}> = () => {
  const classes = useStyles();
  const site = Ide.useSite();
  const workflows = Object.values(site.workflows);

  return (
    <>
      <Typography variant="h3" className={classes.title}><FormattedMessage id="workflows" />: {workflows.length} </Typography>

      <TableContainer component={Paper}>
        <Table className={classes.table} size="small">
          <TableHead>
            <TableRow>
              <TableCell className={classes.bold} align="center" colSpan={2}><FormattedMessage id="workflow.technicalname" /></TableCell>
              <TableCell className={classes.bold} align="left"><FormattedMessage id="locale" /></TableCell>
              <TableCell className={classes.bold} align="left"><FormattedMessage id="workflow.composer.name" /></TableCell>
              <TableCell className={classes.bold} align="center"><FormattedMessage id="articles" /></TableCell>
              <TableCell className={classes.bold} align="center"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {workflows.map((workflow, index) => (<Row key={index} site={site} workflow={workflow} />))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

interface RowProps {
  site: API.CMS.Site,
  workflow: API.CMS.Workflow,

}

const Row: React.FC<RowProps> = ({ site, workflow }) => {
  const classes = useRowStyles();
  const [open, setOpen] = React.useState(false);
  const articles = workflow.body.articles.map(articleId => site.articles[articleId]);
  const [openDialog, setOpenDialog] = React.useState<"WorkflowEdit" | "WorkflowDelete" | undefined>();

  return (
    <>
      {openDialog === 'WorkflowEdit' ? <WorkflowEdit workflow={workflow} onClose={() => setOpenDialog(undefined)} /> : null}
      {openDialog === 'WorkflowDelete' ? <WorkflowDelete workflow={workflow} onClose={() => setOpenDialog(undefined)} /> : null}

      <TableRow key={workflow.id} hover className={classes.row}>
        <TableCell className={classes.expandRow}>
          <IconButton className={classes.iconButton} size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell className={classes.tableCell} align="left">{workflow.body.name}</TableCell>
        <TableCell className={classes.tableCell} align="left">{workflow.body.locale}</TableCell>
        <TableCell className={classes.tableCell} align="left">{workflow.body.content}</TableCell>
        <TableCell className={classes.tableCell} align="center">{workflow.body.articles.length}</TableCell>
        <TableCell className={classes.tableCell} align="right">
          <IconButton className={classes.iconButton} onClick={() => setOpenDialog("WorkflowEdit")}>
            <EditOutlined />
          </IconButton>
          <IconButton className={classes.iconButton} onClick={() => setOpenDialog("WorkflowDelete")}>
            <DeleteOutlinedIcon />
          </IconButton>
        </TableCell>
      </TableRow>

      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={2}>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell className={classes.column} align="left" style={{ paddingRight: 0 }}><FormattedMessage id="articles" /></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {articles.map((article, id) => (

                    <TableRow hover key={id} className={classes.row}>
                      <TableCell component="th" scope="row" align="left" >
                        {article.body.name}
                      </TableCell>

                      <TableCell align="left">
                        <WorkflowRemovePage locale={workflow.body.locale} workflow={workflow} article={article} />
                      </TableCell>

                    </TableRow>

                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  )
}

export { WorkflowsView }




