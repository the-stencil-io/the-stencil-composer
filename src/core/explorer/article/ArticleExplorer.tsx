import React from 'react';
import { Button, Box } from '@mui/material';
import TreeView from "@mui/lab/TreeView";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";

import { FormattedMessage } from 'react-intl';
import { Composer } from '../../context';
import { ArticleComposer } from '../../article';
import ArticleItem from './ArticleItem';


const findMainId = (values: string[]) => {
  const result = values.filter(id => !id.endsWith("-nested"));
  if (result.length) {
    return result[0];
  }
  return undefined;
}


const ArticleExplorer: React.FC<{}> = () => {
  const { session } = Composer.useComposer();


  const [openArticleComposer, setOpenArticleComposer] = React.useState(false);
  const [expanded, setExpanded] = React.useState<string[]>([]);

  const articles = session.articles.filter(view => !view.article.body.parentId).map((view) => [
    (<div key={view.article.id}>
      <ArticleItem articleId={view.article.id} />
    </div>),
    ...view.children.map((child) => (
      (<div key={child.article.id}>
        <ArticleItem articleId={child.article.id} />
      </div>)
    ))
  ]);

  return (
    <Box>
      {articles.length !== 0 ? null : (
        <div>
          {openArticleComposer ? <ArticleComposer onClose={() => setOpenArticleComposer(false)} /> : null}
          <Button variant="contained" color="primary" onClick={() => setOpenArticleComposer(true)} >
            <FormattedMessage id='article.composer.title' />
          </Button>
        </div>)
      }

      <TreeView expanded={expanded}
        defaultCollapseIcon={<ArrowDropDownIcon />}
        defaultExpandIcon={<ArrowRightIcon />}
        defaultEndIcon={<div style={{ width: 24 }} />}
        onNodeToggle={(_event: React.SyntheticEvent, nodeIds: string[]) => {
          const active = findMainId(expanded);
          const newId = findMainId(nodeIds.filter(n => n !== active));
          if (active !== newId && active && newId) {
            nodeIds.splice(nodeIds.indexOf(active), 1);
          }
          setExpanded(nodeIds);
        }}>
        {articles}
      </TreeView>
    </Box>
  );
}

export { ArticleExplorer }

