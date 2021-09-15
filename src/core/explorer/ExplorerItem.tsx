import React from 'react';
import {
  makeStyles, Theme, createStyles, Divider, Typography, TableContainer,
  Table, TableRow, TableCell, TableBody, IconButton,
  Button, ListItem, ListItemText, Collapse, Switch
} from '@material-ui/core';

import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';

import { FormattedMessage } from 'react-intl';

import { LocaleComposer, NewArticlePage, ArticleOptions } from '../composers';
import { API, Ide } from '../deps';


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
    },
    nameStyle: {
      color: theme.palette.article.dark,
      fontWeight: 'bold',
      maxWidth: '260px',
      "&:hover": {
        cursor: 'pointer',
        color: theme.palette.article.main
      }
    },
    summary: {
      fontWeight: 'bold',
      paddingLeft: 3,
      paddingRight: 3,
      color: theme.palette.secondary.dark,
      "&:hover, &.Mui-focusVisible": {
        //backgroundColor: theme.palette.primary.main,
        //color: theme.palette.background.paper,
      }
    },
    localeSummary: {
      color: theme.palette.page.dark,
      paddingLeft: 3,
      paddingRight: 3,
      fontWeight: 'bold',
      "&:hover, &.Mui-focusVisible": {
        color: theme.palette.page.main,
      }
    },
    iconButton: {
      marginTop: 1,
      color: theme.palette.secondary.dark,
    },
    modified: {
      color: theme.palette.text.primary
    },
    divider: {
      marginTop: 4,
    },
    hoverRow: {
      fontWeight: 'bold',
      textTransform: 'uppercase',
      "&:hover": {
        fontWeight: 'bold',
        cursor: 'pointer',
      }
    },
    itemHover: {
      "&:hover": {
        fontWeight: 'bold',
        cursor: 'pointer',
      }
    },
    table: {
      borderBottom: 'none',
      paddingTop: 0,
      paddingBottom: 0,
      fontVariant: 'all-small-caps',
      fontWeight: 'bold',
      lineHeight: 1,
      overflow: 'hidden',
    },
    pageButtons: {
      '& > *': {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
      },
    },
    pageButton: {
      backgroundColor: theme.palette.release.main,
      color: theme.palette.secondary.contrastText,
      fontWeight: 'bold',
      "&:hover": {
        backgroundColor: theme.palette.release.dark,
        color: theme.palette.secondary.contrastText,
      }
    },
  }),
);

interface ExplorerItemProps {
  article: API.CMS.Article;
  open: boolean;
  setOpen: (open: boolean) => void;
}

const ExplorerItem: React.FC<ExplorerItemProps> = ({ article, open, setOpen }) => {
  const classes = useStyles();
  const { handleInTab, findTab, handleDualView } = Ide.useNav();
  const ide = Ide.useIde();
  const site = ide.session.site;
  const unsaved = Ide.useUnsaved(article);
  const [localeOpen, setLocaleOpen] = React.useState(false);
  const [articlePageOpen, setArticlePageOpen] = React.useState<API.CMS.SiteLocale>();
  const dualView = findTab(article)?.data?.dualView ? true : false;



  const handleSavePages = () => {
    const unsaved: API.CMS.PageMutator[] = Object.values(ide.session.pages)
      .filter(p => !p.saved)
      .filter(p => p.origin.body.article === article.id)
      .map(p => ({ pageId: p.origin.id, locale: p.origin.body.locale, content: p.value }));

    ide.service.update().pages(unsaved).then(success => {
      ide.actions.handlePageUpdateRemove(success.map(p => p.id));
    }).then(() => {
      ide.actions.handleLoadSite();
    });
  }

  const pages: API.CMS.Page[] = Object.values(site.pages).filter(page => article.id === page.body.article);
  const canCreate: API.CMS.SiteLocale[] = Object.values(site.locales).filter(locale => pages.filter(p => p.body.locale === locale.id).length === 0);
  const links: API.CMS.Link[] = Object.values(site.links).filter(link => link.body.articles.includes(article.id));
  const workflows: API.CMS.Workflow[] = Object.values(site.workflows).filter(workflow => workflow.body.articles.includes(article.id));

  const getPageLocale = (page: API.CMS.Page) => {
    try {
      return site.locales[page.body.locale].body.value;
    } catch (e) {
      console.error(page);
      return 'oops';
    }
  }


  return (
    <>
      <ListItem className={classes.itemHover}>
        <ListItemText onClick={() => setOpen(!open)}
          primary={<Typography noWrap
            variant="body1" className={classes.nameStyle}>{article.body.name}</Typography>}
        />
        {open ?
          <IconButton className={classes.iconButton} onClick={() => setOpen(false)}><ExpandLess /></IconButton> :
          <IconButton className={classes.iconButton} onClick={() => setOpen(true)}><ExpandMore /></IconButton>}
      </ListItem>

      <Collapse in={open} timeout="auto" unmountOnExit>
        <TableContainer>
          <Table size="small">
            <TableBody>
              {pages.length === 0 ? undefined : (
                <TableRow className={classes.hoverRow} >
                  <TableCell className={classes.table} colSpan={2}>
                    <FormattedMessage id="pages" /> {pages.map((page, index) => (<span className={classes.hoverRow} key={index}
                      onClick={() => handleInTab({ article, type: "ARTICLE_PAGES", locale: page.body.locale })}>
                      <span className={classes.localeSummary}>{getPageLocale(page)}&nbsp;</span></span>))}
                  </TableCell>
                </TableRow>
              )}

              {articlePageOpen ? (<NewArticlePage locale={articlePageOpen} article={article}
                onClose={() => setArticlePageOpen(undefined)}
                onCreate={(page) => handleInTab({ article, type: "ARTICLE_PAGES", locale: page.body.locale })}
              />
              ) : undefined}

              {canCreate.length === 0 ? undefined : (
                <TableRow className={classes.hoverRow}>
                  <TableCell className={classes.table} colSpan={2}>
                    <FormattedMessage id="explorer.pages.create" /> {canCreate.map((locale, index) => (<span className={classes.hoverRow} key={index}
                      onClick={() => setArticlePageOpen(locale)}>
                      <span className={classes.localeSummary}>{locale.body.value}&nbsp;</span></span>))}
                  </TableCell>
                </TableRow>

              )}

              {links.length === 0 ? undefined : (
                <TableRow className={classes.hoverRow}>
                  <TableCell className={classes.table} colSpan={2} onClick={() => handleInTab({ article, type: "ARTICLE_LINKS" })}>
                    <FormattedMessage id="links" /> <span className={classes.summary}>{links.length}</span>
                  </TableCell>
                </TableRow>)}

              {workflows.length === 0 ? undefined : (
                <TableRow className={classes.hoverRow}>
                  <TableCell className={classes.table} onClick={() => handleInTab({ article, type: "ARTICLE_WORKFLOWS" })} colSpan={2}>
                    <FormattedMessage id="workflows" /> <span className={classes.summary}>{workflows.length}</span>
                  </TableCell>
                </TableRow>)}

              <TableRow className={classes.hoverRow}>
                <TableCell className={classes.table} align="left">
                  <FormattedMessage id="explorer.pages.dualview" />
                  <Switch checked={dualView} onClick={() => handleDualView(article)} />
                </TableCell>
                <TableCell className={classes.table} align="right">
                  <ArticleOptions article={article} />
                </TableCell>
              </TableRow>

              {unsaved ? (<TableRow>
                <TableCell className={classes.table} colSpan={2}>
                  <div className={classes.pageButtons}>
                    <Button className={classes.pageButton} fullWidth onClick={handleSavePages}><FormattedMessage id="pages.save" /></Button>
                  </div>
                </TableCell>
              </TableRow>) : null}

              {localeOpen ? (<LocaleComposer onClose={() => setLocaleOpen(false)} />) : undefined}
              {pages.length === 0 && canCreate.length === 0 ? (
                <TableRow className={classes.hoverRow} onClick={() => setLocaleOpen(true)}>
                  <TableCell className={classes.table} colSpan={2}>
                    <FormattedMessage id="explorer.locale.empty" />
                  </TableCell>
                </TableRow>
              ) : undefined
              }
            </TableBody>
          </Table>
        </TableContainer>
      </Collapse>
      <Divider className={classes.divider} />

    </>
  );
}

export { ExplorerItem }





