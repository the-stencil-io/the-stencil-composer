import React from 'react';
import { createStyles, makeStyles } from '@mui/styles';
import { IconButton, Theme } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import VisibilityIcon from '@mui/icons-material//Visibility';
import CheckCircleIcon from '@mui/icons-material//CheckCircle';
import EditIcon from '@mui/icons-material/Edit';
import Paper from '@mui/material/Paper';
import { FormattedMessage } from 'react-intl';

import { Composer, StencilClient } from '../context';



const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    table: {
      minWidth: 650,
      padding: 0,
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
    }
  }));



interface ReleaseTableProps {
  site: StencilClient.Site,
}

const ReleaseTable: React.FC<ReleaseTableProps> = ({ site }) => {
  const classes = useStyles();

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} size="small">
        <TableHead>
          <TableRow>
            <TableCell className={classes.bold} align="left"><FormattedMessage id="tag"/></TableCell>
            <TableCell className={classes.bold} align="left"><FormattedMessage id="release.composer.note"/></TableCell>
            <TableCell className={classes.bold} align="left"><FormattedMessage id="created"/></TableCell>
            <TableCell className={classes.bold} align="left"></TableCell>
            <TableCell align="left"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {Object.values(site.releases).map((release, index) => (
            <TableRow key={index}>
              <TableCell align="left">{release.body.name}</TableCell>
              <TableCell align="left">{release.body.note}</TableCell>
              <TableCell align="left">{release.created}</TableCell>
              <TableCell align="left"></TableCell>
              <TableCell align="right">
                {release.body.name === "LATEST" ?
                  <>
                    <IconButton className={classes.iconButton}> <EditIcon /> </IconButton>
                    <IconButton className={classes.iconButton}> <CheckCircleIcon /> </IconButton>
                  </>
                  : <IconButton className={classes.iconButton}><VisibilityIcon /> </IconButton>}

              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export { ReleaseTable }




