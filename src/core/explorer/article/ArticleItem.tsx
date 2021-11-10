import * as React from "react";
import { Box, Typography, useTheme, Button } from "@mui/material";

import Label from "@mui/icons-material/Label";
import ArticleRoundedIcon from "@mui/icons-material/ArticleRounded";

import LinkIcon from '@mui/icons-material/Link';
import WorkOutlineIcon from '@mui/icons-material/WorkOutline';
import SaveIcon from '@mui/icons-material/Save';
import EditIcon from '@mui/icons-material/ModeEdit';

import { FormattedMessage } from 'react-intl';
import { StyledTreeItem, StyledTreeItemRoot } from './StyledTreeItem';
import { Composer, StencilClient } from '../../context';
import { ArticleOptions } from './ArticleOptions';
import ArticleOptionItem from './ArticleOptionItem';
import ArticlePageItem from './ArticlePageItem';
import DeleteIcon from '@mui/icons-material/Delete';


function WorkflowItem(props: {
  labelText: string;
  nodeId: string;
  children?: React.ReactChild;
}) {
  return (
    <StyledTreeItemRoot
      nodeId={props.nodeId}
      label={
        <Box sx={{ display: "flex", alignItems: "center", p: 0.5, pr: 0 }}>
          <Box component={WorkOutlineIcon} color="inherit" sx={{ pl: 1, mr: 1 }} />
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
    <StyledTreeItemRoot
      nodeId={props.nodeId}
      label={
        <Box sx={{ display: "flex", alignItems: "center", p: 0.5, pr: 0 }}>
          <Box component={LinkIcon} color="inherit" sx={{ pl: 1, mr: 1 }} />
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
  const { handleInTab } = Composer.useNav();
  const view = session.getArticleView(articleId);
  const { article, pages, workflows, links } = view;
  const label = article.body.name;
  const saved = isArticleSaved(article);
  const theme = useTheme();

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

  const saveButton = saved ? <></> : (
    <Box sx={{display: "flex", alignItems: "center", p: 0.8, pr: 0 }} onClick={(e) => {
      e.stopPropagation();
      handleSavePages();
    }}>

      <Box color="inherit" sx={{ pl: 1, mr: 1, flexWrap: 'wrap' }} />
      <Button startIcon={<SaveIcon />} 
          sx={{ 
            borderRadius: 3, 
            backgroundColor: theme.palette.save.main, 
            color: theme.palette.text.primary }} >
        <Typography
          variant="body2"
          sx={{ fontWeight: "inherit", flexGrow: 1 }}
        >
          <FormattedMessage id="pages.save" />
        </Typography>
      </Button>
    </Box>

  )


  return (
    <StyledTreeItem nodeId={article.id} labelText={label} labelIcon={ArticleRoundedIcon} labelInfo={saveButton}>
      <StyledTreeItem nodeId={article.id + 'article-options-nested'} labelText={<FormattedMessage id="options" />} labelIcon={EditIcon}>
        <ArticleOptions article={article} />
      </StyledTreeItem>

      {/** Pages */}
      <StyledTreeItem nodeId={article.id + 'pages-nested'} labelText={<FormattedMessage id="pages" />} labelIcon={Label} labelInfo={`${pages.length}`}>
        {pages.map(pageView => (<ArticlePageItem key={pageView.page.id} article={view} page={pageView} />))}
      </StyledTreeItem>

      {/** Workflows options */}
      <StyledTreeItem nodeId={article.id + 'workflows-nested'} labelText={<FormattedMessage id="workflows" />} labelIcon={Label} labelInfo={`${workflows.length}`}>
        <ArticleOptionItem nodeId={article.id + 'resource.edit.workflows'}
          color='workflow'
          onClick={() => handleInTab({ article, type: "ARTICLE_WORKFLOWS" })}
          labelText={<FormattedMessage id="resource.edit.workflows" />}>
        </ArticleOptionItem>

        {workflows.map(view => (<WorkflowItem key={view.workflow.id} labelText={view.workflow.body.value} nodeId={view.workflow.id} />))}
      </StyledTreeItem>

      {/** Links options */}
      <StyledTreeItem nodeId={article.id + 'links-nested'} labelText={<FormattedMessage id="links" />} labelIcon={Label} labelInfo={`${links.length}`}>
        <ArticleOptionItem nodeId={article.id + 'resource.edit.links'}
          color='link'
          onClick={() => handleInTab({ article, type: "ARTICLE_LINKS" })}
          labelText={<FormattedMessage id="resource.edit.links" />}>
        </ArticleOptionItem>
        {links.map(view => (<LinkItem key={view.link.id} labelText={view.link.body.value} nodeId={view.link.id} />))}
      </StyledTreeItem>

    </StyledTreeItem>);
}

export default ArticleItem;
