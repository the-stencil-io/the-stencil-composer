import React from 'react';
import { createStyles, makeStyles } from '@mui/styles';
import { Theme, Button, alpha } from '@mui/material';

import { FormattedMessage } from 'react-intl';
import { Ide, API } from '../deps';
import { ArticleComposer } from '../composers';
import { ExplorerItem } from './ExplorerItem'


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
    },
    drawerContainer: {
      overflow: 'auto',
    },
    article: {
      background: alpha(theme.palette.article.main, 0.05)
    },
    divider: {
      marginTop: 4,
    },
    button: {
      margin: theme.spacing(1),
      flexGrow: 1,
      color: theme.palette.background.paper,
      "&:hover, & .Mui-focusVisible": {
        backgroundColor: theme.palette.primary.dark,
        color: theme.palette.background.paper,
        "& .MuiSvgIcon-root": {
          color: theme.palette.background.paper,
        }
      }
    },
  }),
);


const Explorer: React.FC<{}> = () => {
  const classes = useStyles();
  const site = Ide.useSite();
  const articles = Object.values(site.articles)
    .filter(a => !a.body.parentId)
    .sort((a1, a2) => a1.body.order - a2.body.order);

  const childArticles = Object.values(site.articles)
    .filter(a => a.body.parentId)
    .sort((a1, a2) => a1.body.order - a2.body.order);

  const [openArticleComposer, setOpenArticleComposer] = React.useState(false);
  const [activeArticleId, setActiveArticleId] = React.useState<API.CMS.ArticleId | undefined>(
    articles.length === 1 ? articles[0].id : undefined
  );

  const setOpen = (value: boolean, article: API.CMS.Article) => {
    if (value === true) {
      setActiveArticleId(article.id);
    } else {
      setActiveArticleId(undefined);
    }
  };

  const getChildrenArticles = (article: API.CMS.Article): API.CMS.Article[] => {
    return childArticles.filter(a => a.body.parentId === article.id);
  }


  return (
    <div className={classes.drawerContainer}>
      { articles.length !== 0 ? null : (
        <div>
          { openArticleComposer ? <ArticleComposer onClose={() => setOpenArticleComposer(false)} /> : null}
          <Button className={classes.button} variant="contained" color="primary" onClick={() => setOpenArticleComposer(true)} >
            <FormattedMessage id='article.composer.title' />
          </Button>
        </div>)
      }
      {articles.map((article, index) => [
        (<div className={index % 2 === 0 ? classes.article : ''}>
        <ExplorerItem key={index}
          article={article}
          open={article.id === activeArticleId}
          setOpen={(value) => setOpen(value, article)}
        />
        </div>),
        ...getChildrenArticles(article).map((child, childIndex) => (
          (<div className={index % 2 === 0 ? classes.article : ''}>
            <ExplorerItem key={childIndex + "-" + index + "-c"}
              article={child}
              open={child.id === activeArticleId}
              setOpen={(value) => setOpen(value, child)}
            />
          </div>)
        ))
      ]
      )}
    </div>
  );
}

export { Explorer }

