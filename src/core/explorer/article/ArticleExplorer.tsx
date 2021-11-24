import React from 'react';
import { Box, Typography } from '@mui/material';
import TreeView from "@mui/lab/TreeView";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";

import { Composer, StencilClient } from '../../context';
import ArticleItem, { ArticleItemOptions } from './ArticleItem';
import { LinkEdit } from '../../link/LinkEdit';
import { WorkflowEdit } from '../../workflow/WorkflowEdit';


const findMainId = (values: string[]) => {
  const result = values.filter(id => !id.endsWith("-nested"));
  if (result.length) {
    return result[0];
  }
  return undefined;
}


const ArticleExplorer: React.FC<{}> = () => {
  const { session } = Composer.useComposer();
  const [expanded, setExpanded] = React.useState<string[]>([]);

  const [editLink, setEditLink] = React.useState<undefined | StencilClient.LinkId>(undefined);
  const [editWorkflow, setEditWorkflow] = React.useState<undefined | StencilClient.WorkflowId>(undefined);
  const articleOptions: ArticleItemOptions = { setEditLink, setEditWorkflow }

  const articles = session.articles.filter(view => !view.article.body.parentId).map((view) => [
    (<div key={view.article.id}>
      <ArticleItem articleId={view.article.id} options={articleOptions} />
    </div>),
    ...view.children.map((child) => (
      (<div key={child.article.id}>
        <ArticleItem articleId={child.article.id} options={articleOptions} />
      </div>)
    ))
  ]);

  return (
    <Box>
      { editLink ? <LinkEdit linkId={editLink} onClose={() => setEditLink(undefined)} /> : undefined}
      { editWorkflow ? <WorkflowEdit workflowId={editWorkflow} onClose={() => setEditWorkflow(undefined)} /> : undefined}

      <Typography align="left"
        sx={{
          fontVariant: 'all-petite-caps',
          fontWeight: 'bold',
          color: 'explorerItem.main',
          ml: 1, mr: 1, mb: 1,
          borderBottom: '1px solid',
        }}>
      </Typography>

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

