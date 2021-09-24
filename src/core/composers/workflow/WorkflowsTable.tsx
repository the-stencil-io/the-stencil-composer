import React from 'react';
import { makeStyles, Theme, createStyles, Typography } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { FormattedMessage } from 'react-intl';


import { API, Ide } from '../../deps';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    table: {
      minWidth: 650,
    },
    iconButton: {
      padding: 2,
      marginLeft: theme.spacing(3),
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
      fontWeight: 'bold'
    },
    tableCell: {
      paddingTop: 0,
      paddingBottom: 0
    },
    title: {
      margin: theme.spacing(1),
      color: theme.palette.workflow.dark,
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

  return (
    <>
      <Typography variant="h3" className={classes.title}>{article.body.name}{": "}<FormattedMessage id="workflows" /> </Typography>

      <TableContainer component={Paper}>
        <Table className={classes.table} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell className={classes.bold} align="left"><FormattedMessage id="workflow.technicalname" /></TableCell>
              <TableCell className={classes.bold} align="left"><FormattedMessage id="locale" /></TableCell>
              <TableCell className={classes.bold} align="left"><FormattedMessage id="workflow.composer.name" /></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {workflows.map((workflow, index) => (
              <TableRow key={index} hover>
                <TableCell className={classes.tableCell} align="left">{workflow.body.name}</TableCell>
                <TableCell className={classes.tableCell} align="left">{site.locales[workflow.body.locale].body.value}</TableCell>
                <TableCell className={classes.tableCell} align="left">{workflow.body.content}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

export { WorkflowsTable }




