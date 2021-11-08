import React from 'react';
import { createStyles, makeStyles } from '@mui/styles';
import { Theme, Button, alpha } from '@mui/material';

import { FormattedMessage } from 'react-intl';
import { Composer, StencilClient } from '../context';
import { ArticleComposer } from '../article';
import { ArticleExplorerItem } from './ArticleExplorerItem'


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    drawerContainer: {
      overflow: 'auto',
    },
    article: {
      background: alpha(theme.palette.article.main, 0.05)
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


const ArticleExplorer: React.FC<{}> = () => {
  const classes = useStyles();
  const {site} = Composer.useComposer();
  
  const articles = Object.values(site.articles)
    .filter(a => !a.body.parentId)
    .sort((a1, a2) => a1.body.order - a2.body.order);

  const childArticles = Object.values(site.articles)
    .filter(a => a.body.parentId)
    .sort((a1, a2) => a1.body.order - a2.body.order);

  const [openArticleComposer, setOpenArticleComposer] = React.useState(false);
  const [activeArticleId, setActiveArticleId] = React.useState<StencilClient.ArticleId | undefined>(
    articles.length === 1 ? articles[0].id : undefined
  );

  const setOpen = (value: boolean, article: StencilClient.Article) => {
    if (value === true) {
      setActiveArticleId(article.id);
    } else {
      setActiveArticleId(undefined);
    }
  };

  const getChildrenArticles = (article: StencilClient.Article): StencilClient.Article[] => {
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
        (<div key={index} className={index % 2 === 0 ? classes.article : ''}>
          <ArticleExplorerItem key={index}
            article={article}
            open={article.id === activeArticleId}
            setOpen={(value) => setOpen(value, article)}
          />
        </div>),
        ...getChildrenArticles(article).map((child, childIndex) => (
          (<div className={index % 2 === 0 ? classes.article : ''} key={childIndex + "-" + index + "-c"}>
            <ArticleExplorerItem key={childIndex + "-" + index + "-c"}
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

export { ArticleExplorer }

