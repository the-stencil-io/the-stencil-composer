import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Box, Typography, useTheme } from "@mui/material";
import EditIcon from '@mui/icons-material/ModeEdit';


import { StencilClient, Composer } from '../../context';
import { ArticleEdit } from '../../article';
import { NewPage, PageEdit, PageDelete } from '../../page';
import { StyledTreeItemRoot } from './StyledTreeItem';


const ArticleOptionItem: React.FC<{
  labelText: React.ReactNode;
  nodeId: string;
  color: string;
  onClick: () => void
}> = (props) => {
  const theme = useTheme();

  return (
    <StyledTreeItemRoot
      onClick={props.onClick}
      nodeId={props.nodeId}

      label={
        <Box sx={{ display: "flex", alignItems: "center", p: 0.5, pr: 0 }}>
          <Box component={EditIcon} color={theme.palette[props.color].main} sx={{ pl: 1, mr: 1 }} />
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


interface ArticleOptionsProps {
  article: StencilClient.Article,
}
const ArticleOptions: React.FC<ArticleOptionsProps> = ({ article }) => {
  const { handleInTab } = Composer.useNav();
  const [dialogOpen, setDialogOpen] = React.useState<undefined | 'ArticleEdit' | 'NewPage' | 'PageEdit' | 'PageDelete'>(undefined);

  const handleDialogClose = () => setDialogOpen(undefined);

  return (
    <>
      { dialogOpen === 'ArticleEdit' ? <ArticleEdit articleId={article.id} onClose={handleDialogClose} /> : null}
      { dialogOpen === 'NewPage' ? <NewPage articleId={article.id} onClose={handleDialogClose} /> : null}
      { dialogOpen === 'PageEdit' ? <PageEdit articleId={article.id} onClose={handleDialogClose} /> : null}
      { dialogOpen === 'PageDelete' ? <PageDelete articleId={article.id} onClose={handleDialogClose} /> : null}

      {/** Article options */}
      <ArticleOptionItem nodeId={article.id + 'edit-nested'}
        color='article'
        onClick={() => setDialogOpen('ArticleEdit')}
        labelText={<FormattedMessage id="article.edit.title" />}>
      </ArticleOptionItem>

      {/** Page options */}
      <ArticleOptionItem nodeId={article.id + 'pages.add'}
        color='page'
        onClick={() => setDialogOpen('NewPage')}
        labelText={<FormattedMessage id="pages.add" />}>
      </ArticleOptionItem>
      <ArticleOptionItem nodeId={article.id + 'pages.change'}
        color='page'
        onClick={() => setDialogOpen('PageEdit')}
        labelText={<FormattedMessage id="pages.change" />}>
      </ArticleOptionItem>
      <ArticleOptionItem nodeId={article.id + 'pages.delete'}
        color='page'
        onClick={() => setDialogOpen('PageDelete')}
        labelText={<FormattedMessage id="pages.delete" />}>
      </ArticleOptionItem>

      {/** Links options */}
      <ArticleOptionItem nodeId={article.id + 'resource.edit.links'}
        color='link'
        onClick={() =>handleInTab({ article, type: "ARTICLE_LINKS" })}
        labelText={<FormattedMessage id="resource.edit.links" />}>
      </ArticleOptionItem>

      {/** Workflows options */}
      <ArticleOptionItem nodeId={article.id + 'resource.edit.workflows'}
        color='workflow'
        onClick={() =>handleInTab({ article, type: "ARTICLE_WORKFLOWS" })}
        labelText={<FormattedMessage id="resource.edit.workflows" />}>
      </ArticleOptionItem>

    </>
  );
}

export { ArticleOptions }
