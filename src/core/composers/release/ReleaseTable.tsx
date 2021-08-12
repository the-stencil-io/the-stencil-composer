import React from 'react';
import { makeStyles, IconButton, Theme, createStyles } from '@material-ui/core';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import VisibilityIcon from '@material-ui/icons/Visibility';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import EditIcon from '@material-ui/icons/Edit';
import Paper from '@material-ui/core/Paper';
import { FormattedMessage } from 'react-intl';


import { API } from '../../deps';


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
  site: API.CMS.Site,
}

const ReleaseTable: React.FC<ReleaseTableProps> = ({ site }) => {
  const classes = useStyles();

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} size="small" aria-label="a dense table">
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




