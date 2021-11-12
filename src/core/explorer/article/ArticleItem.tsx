import * as React from "react";
import { Box, Typography } from "@mui/material";

import Label from "@mui/icons-material/Label";
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined';
import BuildIcon from '@mui/icons-material/Build';
import LinkIcon from '@mui/icons-material/Link';
import WorkOutlineIcon from '@mui/icons-material/WorkOutline';
import SaveIcon from '@mui/icons-material/Save';
import EditIcon from '@mui/icons-material/ModeEdit';

import { FormattedMessage } from 'react-intl';

import StencilStyles from '../../styles';
import { Composer, StencilClient } from '../../context';
import { ArticleOptions } from './ArticleOptions';
import ArticlePageItem from './ArticlePageItem';


function WorkflowItem(props: {
  labelText: string;
  nodeId: string;
  children?: React.ReactChild;
}) {
  return (
    <StencilStyles.TreeItemRoot
      nodeId={props.nodeId}
      label={
        <Box sx={{ display: "flex", alignItems: "center", p: 0.5, pr: 0 }}>
          <Box component={WorkOutlineIcon} color="workflow.main" sx={{ pl: 1, mr: 1 }} />
          <Typography
            variant="body2"
            sx={{ fontWeight: "inherit", flexGrow: 1 }}
          >
            {props.labelText}
          </Typography>
        </Box>
      }
    />
  );
}

function LinkItem(props: {
  labelText: string;
  nodeId: string;
  children?: React.ReactChild;
}) {
  return (
    <StencilStyles.TreeItemRoot
      nodeId={props.nodeId}
      label={
        <Box sx={{ display: "flex", alignItems: "center", p: 0.5, pr: 0 }}>
          <Box component={LinkIcon} color="link.main" sx={{ pl: 1, mr: 1 }} />
          <Typography
            variant="body2"
            sx={{ fontWeight: "inherit", flexGrow: 1 }}
          >
            {props.labelText}
          </Typography>
        </Box>
      }
    />
  );
}


const ArticleItem: React.FC<{
  articleId: StencilClient.ArticleId;
  open: boolean;
}> = ({ articleId }) => {

  const { session, isArticleSaved, service, actions } = Composer.useComposer();
  const view = session.getArticleView(articleId);
  const { article, pages, workflows, links } = view;
  const label = article.body.name;
  const saved = isArticleSaved(article);

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

  const saveButton = saved ? undefined : (
    <Box component={SaveIcon} onClick={(e) => {
      e.stopPropagation();
      handleSavePages();
    }}
      sx={{
        mr: 1, p: .3, border: '1px solid', borderRadius: 3, boxShadow: 2,
        backgroundColor: "save.main",
        color: "text.primary"
      }} />
  )
  
    const devButton = saved ? undefined : (
    <Box component={BuildIcon} onClick={(e) => {
      e.stopPropagation();
    }}
      sx={{
        mr: 1, p: .3, border: '1px solid', borderRadius: 3, boxShadow: 2,
        backgroundColor: "save.main",
        color: "text.primary"
      }} />
  )

  return (
    <>
      <StencilStyles.TreeItem nodeId={article.id} labelText={label} labelIcon={ArticleOutlinedIcon} labelButton={saveButton} labelcolor="explorerItem">
        <StencilStyles.TreeItem nodeId={article.id + 'article-options-nested'} labelText={<FormattedMessage id="options" />} labelIcon={EditIcon}>
          <ArticleOptions article={article} />
        </StencilStyles.TreeItem>

        {/** Pages */}
        <StencilStyles.TreeItem nodeId={article.id + 'pages-nested'} labelText={<FormattedMessage id="pages" />} labelIcon={Label} labelInfo={`${pages.length}`} labelcolor="page">
          {pages.map(pageView => (<ArticlePageItem key={pageView.page.id} article={view} page={pageView} />))}
        </StencilStyles.TreeItem>

        {/** Workflows options */}
        <StencilStyles.TreeItem nodeId={article.id + 'workflows-nested'} 
            labelText={<FormattedMessage id="workflows" />} 
            labelIcon={Label} 
            labelButton={devButton}
            labelInfo={`${workflows.length}`} 
            labelcolor="workflow">
            
          {workflows.map(view => (<WorkflowItem key={view.workflow.id} labelText={view.workflow.body.value} nodeId={view.workflow.id} />))}
        </StencilStyles.TreeItem>

        {/** Links options */}
        <StencilStyles.TreeItem nodeId={article.id + 'links-nested'} labelText={<FormattedMessage id="links" />} labelIcon={Label} labelInfo={`${links.length}`} labelcolor="link">
          {links.map(view => (<LinkItem key={view.link.id} labelText={view.link.body.value} nodeId={view.link.id} />))}
        </StencilStyles.TreeItem>

      </StencilStyles.TreeItem>
    </>)
}

export default ArticleItem;
