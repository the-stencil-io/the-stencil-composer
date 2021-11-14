import * as React from "react";
import { Box, Typography, Theme } from "@mui/material";
import { SxProps } from '@mui/system';

import FolderOutlinedIcon from '@mui/icons-material/FolderOutlined';


import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined';
import LinkIcon from '@mui/icons-material/Link';
import AccountTreeOutlinedIcon from '@mui/icons-material/AccountTreeOutlined';
import SaveIcon from '@mui/icons-material/Save';
import EditIcon from '@mui/icons-material/ModeEdit';
import ConstructionIcon from '@mui/icons-material/Construction';
import { FormattedMessage } from 'react-intl';

import StencilStyles from '../../styles';
import { Composer, StencilClient } from '../../context';
import { ArticleOptions } from './ArticleOptions';
import ArticlePageItem from './ArticlePageItem';
import { LinkEdit } from '../../link/LinkEdit';
import { WorkflowEdit } from '../../workflow/WorkflowEdit';



function WorkflowItem(props: {
  labelText: string;
  nodeId: string;
  children?: React.ReactChild;
  devMode?: boolean,
  onClick: () => void;
}) {

  return (
    <StencilStyles.TreeItemRoot
      nodeId={props.nodeId}
      onClick={props.onClick}
      label={
        <Box sx={{ display: "flex", alignItems: "center", p: 0.5, pr: 0 }}> 
          <Box component={props.devMode ? ConstructionIcon : AccountTreeOutlinedIcon} color="workflow.main" sx={{ pl: 1, mr: 1 }} />
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

interface LinkItemProps {
  labelText: string;
  nodeId: string;
  children?: React.ReactChild;
  onClick: () => void;
}

const LinkItem: React.FC<LinkItemProps> = (props) => {
  return (
    <StencilStyles.TreeItemRoot
      nodeId={props.nodeId}
      onClick={props.onClick}
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

const saveIconColorSx: SxProps<Theme> = {
  mr: 1, p: .3, borderRadius: 3,
  backgroundColor: "explorerItem.contrastText",
  color: "text.primary",
}


const ArticleItem: React.FC<{ articleId: StencilClient.ArticleId }> = ({ articleId }) => {

  const { session, isArticleSaved } = Composer.useComposer();
  const view = session.getArticleView(articleId);
  const { article, pages, workflows, links } = view;
  const label = article.body.name;
  const saved = isArticleSaved(article);

  const [editLink, setEditLink] = React.useState<undefined | StencilClient.LinkId>(undefined);
  const [editWorkflow, setEditWorkflow] = React.useState<undefined | StencilClient.WorkflowId>(undefined);


  const saveIcon = saved ? undefined : (<Box component={SaveIcon} sx={saveIconColorSx} />)

  const isPageSaved = (pageView: Composer.PageView) => {
    const update = session.pages[pageView.page.id];
    if (!update) {
      return true;
    }
    return update.saved;
  }

  return (
    <>
      { editLink ? <LinkEdit linkId={editLink} onClose={() => setEditLink(undefined)} /> : undefined}
      { editWorkflow ? <WorkflowEdit workflowId={editWorkflow} onClose={() => setEditWorkflow(undefined)} /> : undefined}

      <StencilStyles.TreeItem nodeId={article.id} labelText={label} labelIcon={ArticleOutlinedIcon} labelButton={saveIcon} labelcolor="explorerItem">
        <StencilStyles.TreeItem nodeId={article.id + 'article-options-nested'} labelText={<FormattedMessage id="options" />} labelIcon={EditIcon}>
          <ArticleOptions article={article} />
        </StencilStyles.TreeItem>

        {/** Pages */}
        <StencilStyles.TreeItem nodeId={article.id + 'pages-nested'}
          labelText={<FormattedMessage id="pages" />}
          labelButton={saveIcon}
          labelIcon={FolderOutlinedIcon}
          labelInfo={`${pages.length}`}
          labelcolor="page">
          {pages.map(pageView => (<ArticlePageItem key={pageView.page.id}
            article={view}
            page={pageView}
            saveIcon={isPageSaved(pageView) ? undefined : saveIcon} />))}
        </StencilStyles.TreeItem>

        {/** Workflows options */}
        <StencilStyles.TreeItem nodeId={article.id + 'workflows-nested'}
          labelText={<FormattedMessage id="workflows" />}
          labelIcon={FolderOutlinedIcon}
          labelInfo={`${workflows.length}`}
          labelcolor="workflow">

          {workflows.map(view => (<WorkflowItem
            key={view.workflow.id}
            labelText={view.workflow.body.value}
            devMode={view.workflow.body.devMode}
            nodeId={view.workflow.id}

            onClick={() => setEditWorkflow(view.workflow.id)} />))}
        </StencilStyles.TreeItem>

        {/** Links options */}
        <StencilStyles.TreeItem nodeId={article.id + 'links-nested'} labelText={<FormattedMessage id="links" />} labelIcon={FolderOutlinedIcon} labelInfo={`${links.length}`} labelcolor="link">
          {links.map(view => (<LinkItem key={view.link.id}
            labelText={view.link.body.value}
            nodeId={view.link.id}
            onClick={() => setEditLink(view.link.id)} />)
          )}
        </StencilStyles.TreeItem>

      </StencilStyles.TreeItem>
    </>)
}

export default ArticleItem;
