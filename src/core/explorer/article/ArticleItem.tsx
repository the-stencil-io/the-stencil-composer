import * as React from "react";
import { Box, Typography, useTheme } from "@mui/material";

import Label from "@mui/icons-material/Label";
import ArticleRoundedIcon from "@mui/icons-material/ArticleRounded";

import TranslateIcon from "@mui/icons-material/Translate";
import LinkIcon from '@mui/icons-material/Link';
import SwitchLeftRoundedIcon from "@mui/icons-material/SwitchLeftRounded";
import WorkOutlineIcon from '@mui/icons-material/WorkOutline';
import SaveIcon from '@mui/icons-material/Save';
import EditIcon from '@mui/icons-material/ModeEdit';

import { FormattedMessage } from 'react-intl';
import { StyledTreeItem, StyledTreeItemRoot } from './StyledTreeItem';
import { Composer, StencilClient } from '../../context';
import { ArticleOptions } from './ArticleOptions';
import ArticleOptionItem from './ArticleOptionItem';


function PageItem(props: { article: Composer.ArticleView, page: Composer.PageView }) {


  const { handleInTab, findTab } = Composer.useNav();
  const page = props.page.page;
  const article = props.article.article;
  const nodeId = props.page.page.id

  const onLeftEdit = () => handleInTab({ article, type: "ARTICLE_PAGES", locale: page.body.locale })
  const onRightEdit = () => {
    const oldTab = findTab(article);
    const nav = oldTab?.data?.nav;
    const secondary = nav?.value ? true : false

    // Same locale on the right side
    if (nav?.value && nav?.value === page.body.locale) {
      return;
    }

    // Close the locale     
    if (nav?.value2 === page.body.locale) {
      handleInTab({ article, type: "ARTICLE_PAGES", locale: null, secondary })
    } else {
      handleInTab({ article, type: "ARTICLE_PAGES", locale: page.body.locale, secondary })
    }
  }

  return (
    <StyledTreeItemRoot
      nodeId={nodeId}
      onClick={onLeftEdit}
      label={
        <Box sx={{ display: "flex", alignItems: "center", p: 0.5, pr: 0 }}>
          <Box component={TranslateIcon} color="inherit" sx={{ pl: 1, mr: 1 }} />
          <Typography
            variant="body2"
            sx={{ fontWeight: "inherit", flexGrow: 1 }}
          >
            {props.page.locale.body.value}
          </Typography>

          <Box
            component={SwitchLeftRoundedIcon}
            color="inherit"
            sx={{ mr: 3 }}
            onClick={(event) => {
              event.stopPropagation()
              onRightEdit();
            }}
          />
        </Box>
      }
    />
  );
}

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

interface ArticleItemProps {
  articleId: StencilClient.ArticleId;
  open: boolean;
}

const ArticleItem: React.FC<ArticleItemProps> = ({ articleId }) => {

  const { session, isArticleUnsaved, service, actions } = Composer.useComposer();
  const { handleInTab } = Composer.useNav();
  const view = session.getArticleView(articleId);
  const { article, pages, workflows, links } = view;
  const label = article.body.name;
  const unsaved = isArticleUnsaved(article);
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


  return (<>
    <StyledTreeItem nodeId={article.id} labelText={label} labelIcon={ArticleRoundedIcon}>

      <StyledTreeItem nodeId={article.id + 'article-options-nested'} labelText={<FormattedMessage id="options" />} labelIcon={EditIcon}>
        <ArticleOptions article={article} />
      </StyledTreeItem>

      <StyledTreeItem nodeId={article.id + 'pages-nested'} labelText={<FormattedMessage id="pages" />} labelIcon={Label}>
        {pages.map(pageView => (<PageItem article={view} page={pageView} />))}

        {/** Save button */ unsaved ? (
          <StyledTreeItemRoot
            onClick={handleSavePages}
            nodeId={article.id + 'pages-save-nested'}
            label={
              <Box sx={{ display: "flex", alignItems: "center", p: 0.5, pr: 0 }}>
                <Box component={SaveIcon} color="inherit" sx={{ pl: 1, mr: 1 }} />
                <Typography
                  variant="body2"
                  sx={{ fontWeight: "inherit", flexGrow: 1 }}
                >
                  <FormattedMessage id="pages.save" />
                </Typography>
              </Box>
            }
            style={{
              "--tree-view-text-color": theme.palette.release.main
            }}
          />
        ) :
          null
        }
      </StyledTreeItem>

      <StyledTreeItem nodeId={article.id + 'workflows-nested'} labelText={<FormattedMessage id="workflows" />} labelIcon={Label}>
        {/** Workflows options */}
        <ArticleOptionItem nodeId={article.id + 'resource.edit.workflows'}
          color='workflow'
          onClick={() => handleInTab({ article, type: "ARTICLE_WORKFLOWS" })}
          labelText={<FormattedMessage id="resource.edit.workflows" />}>
        </ArticleOptionItem>

        {workflows.map(view => (<WorkflowItem labelText={view.workflow.body.value} nodeId={view.workflow.id} />))}
      </StyledTreeItem>

      <StyledTreeItem nodeId={article.id + 'links-nested'} labelText={<FormattedMessage id="links" />} labelIcon={Label}>
        {/** Links options */}
        <ArticleOptionItem nodeId={article.id + 'resource.edit.links'}
          color='link'
          onClick={() => handleInTab({ article, type: "ARTICLE_LINKS" })}
          labelText={<FormattedMessage id="resource.edit.links" />}>
        </ArticleOptionItem>

        {links.map(view => (<LinkItem labelText={view.link.body.value} nodeId={view.link.id} />))}
      </StyledTreeItem>

    </StyledTreeItem>

  </>);
}

export default ArticleItem;
