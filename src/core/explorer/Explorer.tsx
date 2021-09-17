import React from 'react';
import { createStyles, Theme, makeStyles, Button } from '@material-ui/core';
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
    button: {
      margin: theme.spacing(1),
      flexGrow: 1,
      color: theme.palette.background.paper,
      "&:hover, &.Mui-focusVisible": {
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
  const articles = Object.values(site.articles).sort((a1, a2) => a1.body.order - a2.body.order);
  const [openArticleComposer, setOpenArticleComposer] = React.useState(false);
  const [activeArticleId, setActiveArticleId] = React.useState<API.CMS.ArticleId | undefined>(
    articles.length === 1 ? articles[0].id : undefined
  );


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
      {articles.map((article, index) => (<ExplorerItem key={index} article={article}
        open={article.id === activeArticleId} 
        setOpen={(value: boolean) => {
          if(value === true) {
            setActiveArticleId(article.id);
          } else {
            setActiveArticleId(undefined);
          }
      }} />))}
    </div>
  );
}

export { Explorer }

