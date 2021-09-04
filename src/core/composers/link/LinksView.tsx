import React from 'react';
import { makeStyles, Theme, createStyles, Avatar, Collapse, Box, Typography, Tooltip } from '@material-ui/core';
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
import AddIcon from '@material-ui/icons/AddOutlined';
import EditOutlined from '@material-ui/icons/EditOutlined';
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';

import { FormattedMessage, useIntl } from 'react-intl';

import { LinkRemovePage, LinkDelete, NewLinkArticle, LinkEdit } from './';
import { API, Ide } from '../../deps';

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
  const site = Ide.useSite();
  const links = Object.values(site.links);
  const title = useIntl().formatMessage({ id: "links" });


  return (
    <>
      <Box display="flex">
        <Avatar className={classes.avatar}>{title.substring(0, 2)}</Avatar>
        <Typography variant="h3" className={classes.title}><FormattedMessage id="links" />: {links.length}</Typography>
      </Box>


      <Typography variant="h3" className={classes.title}><FormattedMessage id="links" />: {links.length}</Typography>
      <Typography variant="body1" className={classes.title}><FormattedMessage id="links.message" /></Typography>

      <TableContainer component={Paper}>
        <Table className={classes.table} size="small">
          <TableHead>
            <TableRow>
              <TableCell className={classes.bold} align="center" colSpan={2}><FormattedMessage id="link.type" /></TableCell>
              <TableCell className={classes.bold} align="left"><FormattedMessage id="locale" /></TableCell>
              <TableCell className={classes.bold} align="left"><FormattedMessage id="description" /></TableCell>
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
  site: API.CMS.Site,
  link: API.CMS.Link,
}

const Row: React.FC<RowProps> = ({ site, link }) => {
  const classes = useRowStyles();

  const [open, setOpen] = React.useState(false);
  const [openDialog, setOpenDialog] = React.useState<'NewLinkArticle' | 'LinkDelete' | 'LinkEdit' | undefined>();


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
        <TableCell className={classes.tableCell} align="left">{link.body.contentType}</TableCell>
        <TableCell className={classes.tableCell} align="left">{link.body.locale}</TableCell>
        <TableCell className={classes.tableCell} align="left">{link.body.description}</TableCell>
        <TableCell className={classes.tableCell} align="left">{link.body.content}</TableCell>
        <TableCell className={classes.tableCell} align="center">{link.body.articles.length}</TableCell>
        <TableCell className={classes.tableCell} align="right">

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
                        <LinkRemovePage link={link} article={site.articles[id]} locale={link.body.locale} />
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




