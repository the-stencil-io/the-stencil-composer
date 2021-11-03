import React from 'react';
import { createStyles, makeStyles } from '@mui/styles';
import {
  Theme, Avatar, Collapse, Box, Typography, Tooltip, IconButton, Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper
} from '@mui/material';

import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import AddIcon from '@mui/icons-material/AddOutlined';
import EditOutlined from '@mui/icons-material/EditOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';

import { FormattedMessage, useIntl } from 'react-intl';

import { LinkRemovePage, LinkDelete, NewLinkArticle, LinkEdit } from './';
import { Composer, StencilClient } from '../context';


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
      color: theme.palette.text.primary
    },
    avatar: {
      alignSelf: "center",
      marginLeft: theme.spacing(1),
      backgroundColor: theme.palette.link.main,
      textTransform: 'uppercase'
    }
  }));

const useRowStyles = makeStyles((theme: Theme) =>
  createStyles({
    row: {
      '& > *': {
        borderBottom: 'unset',
        padding: 0
      },
    },
    bold: {
      fontWeight: 'bold',
      borderBottom: 'unset'
    },
    column: {
      width: '25%',
      fontWeight: 'bold',
      padding: 0
    },
    expandRow: {
      width: "30px"
    },
    tableCell: {
      paddingTop: 0,
      paddingBottom: 0
    },
    iconButton: {
      padding: 2,
      margin: 2,
      color: theme.palette.link.main,
      "&:hover, &.Mui-focusVisible": {
        backgroundColor: theme.palette.link.main,
        color: theme.palette.background.paper,
        "& .MuiSvgIcon-root": {
          color: theme.palette.background.paper,
        }
      }
    },
  }));

const LinksView: React.FC<{}> = () => {
  const classes = useStyles();
  const {site} = Composer.useComposer();
  const links = Object.values(site.links).sort((o1, o2) => o1.body.value.localeCompare(o2.body.value));
  const title = useIntl().formatMessage({ id: "links" });


  return (
    <>
      <Box display="flex">
        <Avatar className={classes.avatar}>{title.substring(0, 2)}</Avatar>
        <Typography variant="h3" className={classes.title}><FormattedMessage id="links" />: {links.length}</Typography>
      </Box>

      <Typography variant="body1" className={classes.title}><FormattedMessage id="links.message" /></Typography>

      <TableContainer component={Paper}>
        <Table className={classes.table} size="small">
          <TableHead>
            <TableRow>
              <TableCell className={classes.bold} align="center" colSpan={2}><FormattedMessage id="link.type" /></TableCell>
              <TableCell className={classes.bold} align="left"><FormattedMessage id="link.url" /></TableCell>
              <TableCell className={classes.bold} align="center"><FormattedMessage id="articles" /></TableCell>
              <TableCell className={classes.bold} align="center"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {links.map((link, index) => (<Row key={index} site={site} link={link} />))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

interface RowProps {
  site: StencilClient.Site,
  link: StencilClient.Link,
}

const Row: React.FC<RowProps> = ({ site, link }) => {
  const classes = useRowStyles();

  const [open, setOpen] = React.useState(false);
  const [openDialog, setOpenDialog] = React.useState<'NewLinkArticle' | 'LinkDelete' | 'LinkEdit' | undefined>();

  /* console.log("Link type " + link.body.contentType)
   console.log("Link content " + link.body.content);
   console.log("Link description " +  link.body.description);
 
 */
  return (
    <>
      {openDialog === 'NewLinkArticle' ? <NewLinkArticle link={link} open={open} onClose={() => setOpenDialog(undefined)} /> : null}
      {openDialog === 'LinkEdit' ? <LinkEdit link={link} open={open} onClose={() => setOpenDialog(undefined)} /> : null}
      {openDialog === 'LinkDelete' ? <LinkDelete linkId={link.id} open={open} onClose={() => setOpenDialog(undefined)} /> : null}

        <TableRow key={link.id} hover className={classes.row}>
          <TableCell className={classes.expandRow}>
            <IconButton className={classes.iconButton} size="small" onClick={() => setOpen(!open)}>
              {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          </TableCell>
          
          <TableCell className={classes.tableCell} align="center">{link.body.contentType}</TableCell>
          <TableCell className={classes.tableCell} align="left">{link.body.value}</TableCell>
          <TableCell className={classes.tableCell} align="center">{link.body.articles.length}</TableCell>
          <TableCell className={classes.tableCell} align="right" width="10%">

            <Tooltip title={<FormattedMessage id="link.edit.title" />}>
              <IconButton className={classes.iconButton} onClick={() => setOpenDialog("LinkEdit")}>
                <EditOutlined />
              </IconButton>
            </Tooltip>

            <Tooltip title={<FormattedMessage id="associations.add" />}>
              <IconButton className={classes.iconButton} onClick={() => setOpenDialog("NewLinkArticle")}>
                <AddIcon />
              </IconButton>
            </Tooltip>

            <Tooltip title={<FormattedMessage id="link.delete.title" />}>
              <IconButton className={classes.iconButton} onClick={() => setOpenDialog("LinkDelete")}>
                <DeleteOutlinedIcon />
              </IconButton>
            </Tooltip>

          </TableCell>
        </TableRow>

        <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={7}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <Box margin={2}>
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell className={classes.column} align="left" style={{ paddingRight: 0 }}><FormattedMessage id="articles" /></TableCell>
                    </TableRow>
                  </TableHead>

                  <TableBody>
                    {link.body.articles.map((id) => (

                      <TableRow hover key={id} className={classes.row}>
                        <TableCell component="th" scope="row" align="left">
                          {site.articles[id].body.name}
                        </TableCell>
                        <TableCell>
                        {"hahah remove mis missing"/*
                          <LinkRemovePage link={link} article={site.articles[id]} locale={link.body.locale} />
                         */} 
                        </TableCell>
                        <TableCell>
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

export { LinksView }




