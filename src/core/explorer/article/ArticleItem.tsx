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
          <Typography noWrap={true} maxWidth="300px" variant="body2"
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
          <Typography align="left" maxWidth="300px" noWrap={true} variant="body2"
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

interface ArticleItemOptions {
  setEditWorkflow: (workflowId: StencilClient.WorkflowId) => void,
  setEditLink: (linkId: StencilClient.LinkId) => void
}

const ArticleItem: React.FC<{
  articleId: StencilClient.ArticleId,
  nodeId?: string,
  options?: ArticleItemOptions
}> = ({ articleId, nodeId, options }) => {

  const { session, isArticleSaved } = Composer.useComposer();
  const view = session.getArticleView(articleId);
  const { article, pages, workflows, links } = view;
  const saved = isArticleSaved(article);

  const saveIcon = saved ? undefined : (<Box component={SaveIcon} sx={saveIconColorSx} />)

  const isPageSaved = (pageView: Composer.PageView) => {
    const update = session.pages[pageView.page.id];
    if (!update) {
      return true;
    }
    return update.saved;
  }

  const articleName = session.getArticleName(view.article.id);
  return (
    <>
      <StencilStyles.TreeItem nodeId={nodeId ? nodeId : article.id} labelText={articleName.name} labelIcon={ArticleOutlinedIcon} labelButton={saveIcon} labelcolor="explorerItem" sx={{ backgroundColor: "explorer.main" }}>

        {/** Article options */
          options ? (<StencilStyles.TreeItem nodeId={article.id + 'article-options-nested'}
            labelText={<FormattedMessage id="options" />}
            labelIcon={EditIcon}>
            <ArticleOptions article={article} />
          </StencilStyles.TreeItem>) : null
        }

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


        {/** Workflows options */
          options ? (<StencilStyles.TreeItem nodeId={article.id + 'workflows-nested'}
            labelText={<FormattedMessage id="services" />}
            labelIcon={FolderOutlinedIcon}
            labelInfo={`${workflows.length}`}
            labelcolor="workflow">

            {workflows.map(view => (<WorkflowItem
              key={view.workflow.id}
              labelText={view.workflow.body.value}
              devMode={view.workflow.body.devMode}
              nodeId={view.workflow.id}

              onClick={() => options.setEditWorkflow(view.workflow.id)} />))}
          </StencilStyles.TreeItem>) : null
        }

        {/** Links options */
          options ? (<StencilStyles.TreeItem nodeId={article.id + 'links-nested'}
            labelText={<FormattedMessage id="links" />}
            labelIcon={FolderOutlinedIcon}
            labelInfo={`${links.length}`}
            labelcolor="link">
            
            {links.map(view => (<LinkItem key={view.link.id}
              labelText={view.link.body.value}
              nodeId={view.link.id}
              onClick={() => options.setEditLink(view.link.id)} />)
            )}
          </StencilStyles.TreeItem>) : null

        }

      </StencilStyles.TreeItem>
    </>)
}

export type { ArticleItemOptions }
export default ArticleItem;
