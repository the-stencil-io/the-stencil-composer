import React from 'react';
import { FormattedMessage } from 'react-intl';

import { LinkComposer } from '../../link';
import { WorkflowComposer } from '../../workflow';
import { ArticleEdit, ArticleDelete } from '../../article';
import { NewPage, PageEdit, PageDelete } from '../../page';
import ArticleOptionItem from './ArticleOptionItem';
import { Composer, StencilClient } from '../../context';

interface ArticleOptionsProps {
  article: StencilClient.Article,

}
const ArticleOptions: React.FC<ArticleOptionsProps> = ({ article }) => {

  const [dialogOpen, setDialogOpen] = React.useState<undefined | 'ArticleEdit' | 'NewPage' | 'PageEdit' | 'PageDelete' | 'ArticleDelete' | 'LinkComposer' | 'WorkflowComposer'>(undefined);


  const handleDialogClose = () => setDialogOpen(undefined);
  const { handleInTab } = Composer.useNav();

  return (
    <>
      { dialogOpen === 'ArticleEdit' ? <ArticleEdit articleId={article.id} onClose={handleDialogClose} /> : null}
      { dialogOpen === 'NewPage' ? <NewPage articleId={article.id} onClose={handleDialogClose} /> : null}
      { dialogOpen === 'PageEdit' ? <PageEdit articleId={article.id} onClose={handleDialogClose} /> : null}
      { dialogOpen === 'PageDelete' ? <PageDelete articleId={article.id} onClose={handleDialogClose} /> : null}
      { dialogOpen === 'ArticleDelete' ? <ArticleDelete articleId={article.id} onClose={handleDialogClose} /> : null}
      { dialogOpen === 'LinkComposer' ? <LinkComposer onClose={handleDialogClose} /> : null}
      { dialogOpen === 'WorkflowComposer' ? <WorkflowComposer onClose={handleDialogClose} /> : null}



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


      <ArticleOptionItem nodeId={article.id + 'resource.create.links'}
        color='link'
        onClick={() => setDialogOpen('LinkComposer')}
        labelText={<FormattedMessage id="link.create" />}>
      </ArticleOptionItem>

      <ArticleOptionItem nodeId={article.id + 'resource.edit.links'}
        color='link'
        onClick={() => handleInTab({ article, type: "ARTICLE_LINKS" })}
        labelText={<FormattedMessage id="links.change" />}>
      </ArticleOptionItem>

      <ArticleOptionItem nodeId={article.id + 'resource.create.workflows'}
        color='workflow'
        onClick={() => setDialogOpen('WorkflowComposer')}
        labelText={<FormattedMessage id="workflow.create" />}>
      </ArticleOptionItem>

      <ArticleOptionItem nodeId={article.id + 'resource.edit.workflows'}
        color='workflow'
        onClick={() => handleInTab({ article, type: "ARTICLE_WORKFLOWS" })}
        labelText={<FormattedMessage id="workflows.change" />}>
      </ArticleOptionItem>
    </>
  );
}

export { ArticleOptions }
