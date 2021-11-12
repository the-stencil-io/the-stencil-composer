import React from 'react';
import { FormattedMessage } from 'react-intl';

import { ArticleEdit, ArticleDelete } from '../../article';
import { NewPage, PageEdit, PageDelete } from '../../page';
import ArticleOptionItem from './ArticleOptionItem';
import { Composer, StencilClient } from '../../context';

interface ArticleOptionsProps {
  article: StencilClient.Article,
}
const ArticleOptions: React.FC<ArticleOptionsProps> = ({ article }) => {
  const [dialogOpen, setDialogOpen] = React.useState<undefined | 'ArticleEdit' | 'NewPage' | 'PageEdit' | 'PageDelete' | 'ArticleDelete'>(undefined);

  const handleDialogClose = () => setDialogOpen(undefined);
  const { handleInTab } = Composer.useNav();
  
  return (
    <>
      { dialogOpen === 'ArticleEdit' ? <ArticleEdit articleId={article.id} onClose={handleDialogClose} /> : null}
      { dialogOpen === 'NewPage' ? <NewPage articleId={article.id} onClose={handleDialogClose} /> : null}
      { dialogOpen === 'PageEdit' ? <PageEdit articleId={article.id} onClose={handleDialogClose} /> : null}
      { dialogOpen === 'PageDelete' ? <PageDelete articleId={article.id} onClose={handleDialogClose} /> : null}
      { dialogOpen === 'ArticleDelete' ? <ArticleDelete articleId={article.id} onClose={handleDialogClose} /> : null}

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

      {/** Article options */}
      <ArticleOptionItem nodeId={article.id + 'edit-nested'}
        color='article'
        onClick={() => setDialogOpen('ArticleEdit')}
        labelText={<FormattedMessage id="article.edit.title" />}>
      </ArticleOptionItem>
      <ArticleOptionItem nodeId={article.id + 'delete-nested'}
        color='article'
        onClick={() => setDialogOpen('ArticleDelete')}
        labelText={<FormattedMessage id="article.delete.title" />}>
      </ArticleOptionItem>



      <ArticleOptionItem nodeId={article.id + 'resource.edit.links'}
        color='link'
        onClick={() => handleInTab({ article, type: "ARTICLE_LINKS" })}
        labelText={<FormattedMessage id="links.addremove" />}>
      </ArticleOptionItem>

      <ArticleOptionItem nodeId={article.id + 'resource.edit.workflows'}
        color='workflow'
        onClick={() => handleInTab({ article, type: "ARTICLE_WORKFLOWS" })}
        labelText={<FormattedMessage id="workflows.addremove" />}>
      </ArticleOptionItem>
    </>
  );
}

export { ArticleOptions }
