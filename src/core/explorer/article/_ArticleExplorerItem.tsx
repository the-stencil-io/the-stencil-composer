import React from 'react';
import { createStyles, makeStyles } from '@mui/styles';
import {
  Theme, Typography, IconButton, List,
  Button, ListItem, ListItemText, Collapse
} from '@mui/material';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';

import SubdirectoryArrowRightIcon from '@mui/icons-material/SubdirectoryArrowRight';
import { FormattedMessage } from 'react-intl';

import { LocaleComposer } from '../../locale';
import { NewArticlePage } from '../../page';
import { LinkLabels } from '../../link/LinkLabels';
import { Composer, StencilClient } from '../../context';


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      paddingTop: theme.spacing(0.5),
      paddingBottom: theme.spacing(0.5),
    },
    nameStyle: {
      fontWeight: 500,
      color: theme.palette.text.primary,
      "&:hover": {
        cursor: 'pointer',
        color: theme.palette.article.dark
      },
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
    iconButtonArrow: {
      marginTop: 1,
      padding: 0,
      color: theme.palette.secondary.dark,
    },
    indentedRow: {
      fontWeight: 300,
      marginLeft: theme.spacing(3),
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
    order: {
      marginRight: theme.spacing(1),
      fontSize: '9pt',

    }
  }),
);

const ArticlePages: React.FC<{ page: StencilClient.Page, article: StencilClient.Article }> = ({ page, article }) => {
  const { handleInTab } = Composer.useNav();
  const { site } = Composer.useComposer();

  const getPageLocale = (page: StencilClient.Page) => {
    try {
      return site.locales[page.body.locale].body.value;
    } catch (e) {
      console.error(page);
      return 'oops';
    }
  }

  return (
    <ListItem>
      <ListItemText inset>
        <Typography variant="body1"
          onClick={() => handleInTab({ article, type: "ARTICLE_PAGES", locale: page.body.locale })}>
          {getPageLocale(page)}
        </Typography>
      </ListItemText>
    </ListItem>)
}

const ArticleLinks: React.FC<{ link: StencilClient.Link, article: StencilClient.Article }> = ({ link, article }) => {
  const { handleInTab } = Composer.useNav();

  const getLinkLabels = (link: StencilClient.Link) => {
    return null;
  }
  
  return (
    <ListItem>
      <ListItemText inset>
        <Typography variant="body1">
          link labels (value, locale)
        </Typography>
      </ListItemText>
    </ListItem>
  )
}


interface ArticleExplorerItemProps {
  article: StencilClient.Article;
  open: boolean;
  setOpen: (open: boolean) => void;
}

const ArticleExplorerItem: React.FC<ArticleExplorerItemProps> = ({ article, open, setOpen }) => {
  const classes = useStyles();
  const { handleInTab, findTab } = Composer.useNav();
  const { service, actions, site, session, isArticleUnsaved } = Composer.useComposer();
  const unsaved = isArticleUnsaved(article);

  const [localeOpen, setLocaleOpen] = React.useState(false);
  const [articlePageOpen, setArticlePageOpen] = React.useState<StencilClient.SiteLocale>();



  const handleSavePages = () => {
    const unsaved: StencilClient.PageMutator[] = Object.values(session.pages)
      .filter(p => !p.saved)
      .filter(p => p.origin.body.article === article.id)
      .map(p => ({ pageId: p.origin.id, locale: p.origin.body.locale, content: p.value }));

    service.update().pages(unsaved).then(success => {
      actions.handlePageUpdateRemove(success.map(p => p.id));
    }).then(() => {
      actions.handleLoadSite();
    });
  }

  const pages: StencilClient.Page[] = Object.values(site.pages).filter(page => article.id === page.body.article);
  const canCreate: StencilClient.SiteLocale[] = Object.values(site.locales).filter(locale => pages.filter(p => p.body.locale === locale.id).length === 0);
  const links: StencilClient.Link[] = Object.values(site.links).filter(link => link.body.articles.includes(article.id));
  const workflows: StencilClient.Workflow[] = Object.values(site.workflows).filter(workflow => workflow.body.articles.includes(article.id));


  return (
    <List
      className={classes.root}
      sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
      component="nav"
      aria-labelledby="nested-list-subheader"
    >
      <NewArticlePage article={article} open={articlePageOpen}
        onClose={() => setArticlePageOpen(undefined)}
        onCreate={(page) => handleInTab({ article, type: "ARTICLE_PAGES", locale: page.body.locale })}
      />


      <ListItem className={classes.itemHover}>
        <div className={classes.order}>{article.body.order}</div>
        {article.body.parentId ? <SubdirectoryArrowRightIcon /> : null}
        <ListItemText onClick={() => setOpen(!open)}
          primary={<Typography noWrap
            className={classes.nameStyle}>{article.body.name}</Typography>}
        />

        {open ?
          <IconButton className={classes.iconButtonArrow} onClick={() => setOpen(false)}><ExpandLess /></IconButton> :
          <IconButton className={classes.iconButtonArrow} onClick={() => setOpen(true)}><ExpandMore /></IconButton>}
      </ListItem>

      <Collapse in={open} timeout="auto" unmountOnExit >
        {pages.map((page, index) => <ArticlePages key={index} page={page} article={article} />)}

        {canCreate.length === 0 ? undefined : (
          <ListItem>
            <FormattedMessage id="explorer.pages.create" /> {canCreate.map((locale, index) => (
              <ListItem className={classes.indentedRow} key={index}
                onClick={() => setArticlePageOpen(locale)}>
                {locale.body.value}
              </ListItem>))}
          </ListItem>
        )}

        {links.length === 0 ? undefined : (
          <ListItem onClick={() => handleInTab({ article, type: "ARTICLE_LINKS" })}>
            <FormattedMessage id="links" />
            {links.map((link, index) => (
              <ListItem key={index}><ArticleLinks article={article} link={link} />link</ListItem>
            ))}
          </ListItem>)}




        {workflows.length === 0 ? undefined : (
          <ListItem onClick={() => handleInTab({ article, type: "ARTICLE_WORKFLOWS" })}>
            <FormattedMessage id="workflows" /> <div className={classes.summary}>{workflows.length}</div>
          </ListItem>)}

        {unsaved ? (
          <ListItem>
            <div className={classes.pageButtons}>
              <Button className={classes.pageButton} fullWidth onClick={handleSavePages}><FormattedMessage id="pages.save" /></Button>
            </div>
          </ListItem>) : null}

        {localeOpen ? (<LocaleComposer onClose={() => setLocaleOpen(false)} />) : undefined}
        {pages.length === 0 && canCreate.length === 0 ? (
          <ListItem onClick={() => setLocaleOpen(true)}>
            <FormattedMessage id="explorer.locale.empty" />
          </ListItem>
        ) : undefined
        }

      </Collapse>
    </List>
  );
}

export { ArticleExplorerItem }





