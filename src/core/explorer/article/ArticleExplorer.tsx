import React from 'react';
import { createStyles, makeStyles } from '@mui/styles';
import { Theme, Button, alpha, Box, AppBar } from '@mui/material';
import TreeView from "@mui/lab/TreeView";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";

import { FormattedMessage } from 'react-intl';
import { Composer, StencilClient } from '../../context';
import { ArticleComposer } from '../../article';
import ArticleItem from './ArticleItem'


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    title: {
      display: 'flex',
      fontSize: '15pt',
      fontWeight: 'bold',
      justifyContent: 'center',
      backgroundColor: theme.palette.article.main,
      color: theme.palette.article.contrastText,
    },
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


const findMainId = (values: string[]) => {
  const result = values.filter(id => !id.endsWith("-nested"));
  if(result.length) {
    return result[0];
  }
  return undefined;
}


const ArticleExplorer: React.FC<{}> = () => {
  const classes = useStyles();
  const { site } = Composer.useComposer();

  const articles = Object.values(site.articles)
    .filter(a => !a.body.parentId)
    .sort((a1, a2) => a1.body.order - a2.body.order);

  const childArticles = Object.values(site.articles)
    .filter(a => a.body.parentId)
    .sort((a1, a2) => a1.body.order - a2.body.order);

  const [openArticleComposer, setOpenArticleComposer] = React.useState(false);
  const [expanded, setExpanded] = React.useState<string[]>([]);

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


      <TreeView
        onNodeToggle={(_event: React.SyntheticEvent, nodeIds: string[]) => {
          const active = findMainId(expanded);
          const newId = findMainId(nodeIds.filter(n => n !== active));
          if(active !== newId && active && newId) {
            nodeIds.splice(nodeIds.indexOf(active), 1);  
          } 
          setExpanded(nodeIds);
        }}
        expanded={expanded}
        defaultCollapseIcon={<ArrowDropDownIcon />}
        defaultExpandIcon={<ArrowRightIcon />}
        defaultEndIcon={<div style={{ width: 24 }} />}
        multiSelect={false}
      >

        {articles.map((article, index) => [
          (<div key={index} className={index % 2 === 0 ? classes.article : ''}>
            <ArticleItem key={index} articleId={article.id} open={expanded.includes(article.id)} />
          </div>),
          ...getChildrenArticles(article).map((child, childIndex) => (
            (<div className={index % 2 === 0 ? classes.article : ''} key={childIndex + "-" + index + "-c"}>
              <ArticleItem key={childIndex + "-" + index + "-c"} articleId={child.id} open={expanded.includes(child.id)} />
            </div>)
          ))
        ]
        )}
      </TreeView>
    </div>
  );
}

export { ArticleExplorer }

