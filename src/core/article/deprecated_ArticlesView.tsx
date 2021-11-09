import React from 'react';
import { createStyles, makeStyles } from '@mui/styles';
import { Theme, Collapse, Box, Typography, Tooltip, Avatar } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import AddIcon from '@mui/icons-material/AddOutlined';
import EditOutlined from '@mui/icons-material/EditOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';

import { FormattedMessage, useIntl } from 'react-intl';

import { ArticleDelete, ArticleEdit } from '../article';

import { Composer, StencilClient } from '../context';
import { NewPage } from '../page';



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
      backgroundColor: theme.palette.article.main,
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
      borderBottom: 'unset',
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
      color: theme.palette.article.main,
      "&:hover, &.Mui-focusVisible": {
        backgroundColor: theme.palette.article.main,
        color: theme.palette.background.paper,
        "& .MuiSvgIcon-root": {
          color: theme.palette.background.paper,
        }
      }
    },
  }));


const ArticlesView: React.FC<{}> = () => {
  const classes = useStyles();
  const { site } = Composer.useComposer();
  const articles = Object.values(site.articles).sort((a1, a2) => a1.body.order - a2.body.order);
  const title = useIntl().formatMessage({ id: "articles" });

  return (
    <>
      <Box display="flex">
        <Avatar className={classes.avatar}>{title.substring(0, 2)}</Avatar>
        <Typography variant="h3" className={classes.title}><FormattedMessage id="articles" />: {articles.length}</Typography>
      </Box>

      <Typography variant="body1" className={classes.title}><FormattedMessage id="articles.message" /></Typography>
      <TableContainer component={Paper}>
        <Table className={classes.table} size="small">
          <TableHead >
            <TableRow>
              <TableCell className={classes.bold} align="left" colSpan={2}><FormattedMessage id="article.name" /></TableCell>
              <TableCell className={classes.bold} align="center"><FormattedMessage id="order" /></TableCell>
              <TableCell className={classes.bold} align="center"><FormattedMessage id="pages" /></TableCell>
              <TableCell className={classes.bold} align="center"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {articles.map((article, index) => (<ArticleAndPages key={index} article={article} site={site} />))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}


const ArticleAndPages: React.FC<{ article: StencilClient.Article, site: StencilClient.Site}> = ({ article, site }) => {
  const classes = useRowStyles();
  const [expand, setExpand] = React.useState(false);
  const [pageId, setPageId] = React.useState<string | undefined>();
  const [openDialog, setOpenDialog] = React.useState<"EditArticle" | "DeleteArticle" | 'ArticleDeletePage' | 'NewPage' | undefined>();
  const parentName = article.body.parentId ? site.articles[article.body.parentId].body.name + "/" : "";

  const pages = Object.values(site.pages).filter(page => page.body.article === article.id);

  return (
    <>
      {openDialog === "EditArticle" ? <ArticleEdit articleId={article.id} onClose={() => setOpenDialog(undefined)} /> : null}
      {openDialog === "DeleteArticle" ? <ArticleDelete articleId={article.id} onClose={() => setOpenDialog(undefined)} /> : null}
      
      {openDialog === "NewPage" ? <NewPage articleId={article.id} onClose={() => setOpenDialog(undefined)} /> : null}


      <TableRow key={article.id} hover className={classes.row}>
        <TableCell className={classes.expandRow}>
          <IconButton className={classes.iconButton} size="small" onClick={() => setExpand(!expand)}>
            {expand ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell className={classes.tableCell} align="left">{parentName}{article.body.name}</TableCell>
        <TableCell className={classes.tableCell} align="center">{article.body.order}</TableCell>
        <TableCell className={classes.tableCell} align="center">{
          pages.map(p => site.locales[p.body.locale])
               .map(l => l.body.value)
               .join("/") }
        </TableCell>
        <TableCell className={classes.tableCell} align="right">
          <IconButton className={classes.iconButton} onClick={() => setOpenDialog("EditArticle")}>
            <EditOutlined />
          </IconButton>
          <IconButton className={classes.iconButton}>
            <Tooltip title={<FormattedMessage id="pages.add" />}>
              <AddIcon onClick={() => setOpenDialog('NewPage')} />
            </Tooltip>
          </IconButton>
          <IconButton className={classes.iconButton} onClick={() => setOpenDialog("DeleteArticle")}>
            <DeleteOutlinedIcon />
          </IconButton>
        </TableCell>
      </TableRow>

      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={7}>
          <Collapse in={expand} timeout="auto" unmountOnExit>
            <Box margin={2}>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell className={classes.column} align="left" style={{ paddingRight: 0 }}><FormattedMessage id="pages" /></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {pages.map((page, key) => (
                    <TableRow hover key={key} className={classes.row}>
                      <TableCell component="th" scope="row" align="left">{site.locales[page.body.locale].body.value}</TableCell>
                      <TableCell><IconButton className={classes.iconButton} onClick={() => {
                        setPageId(page.id);
                        setOpenDialog("ArticleDeletePage");
                      }}><DeleteOutlinedIcon /></IconButton></TableCell>
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

export { ArticlesView }

