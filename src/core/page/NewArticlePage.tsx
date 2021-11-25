import React from 'react';
import { Typography } from '@mui/material';
import { FormattedMessage } from 'react-intl';

import { Composer, StencilClient } from '../context';
import { StyledDialog } from '../styles/StyledDialog';


interface NewArticlePageProps {
  article: StencilClient.Article,
  open?: StencilClient.SiteLocale,

  onClose: () => void,
  onCreate: (page: StencilClient.Page) => void
}

const NewArticlePage: React.FC<NewArticlePageProps> = ({ article, open, onClose, onCreate }) => {
  const { service, actions, site } = Composer.useComposer();
  if (!open) {
    return null;
  }

  const handleCreate = () => {
    const entity: StencilClient.CreatePage = { articleId: article.id, locale: open.id };
    service.create().page(entity)
      .then(success => actions.handleLoadSite().then(() => success))
      .then(success => {
        onCreate(success);
        onClose();
      })
  }

  const articleName = site.articles[article.id].body.name;

  return (
    <StyledDialog open={open ? true : false} onClose={onClose}
      backgroundColor="uiElements.main"
      title="newpage.title"
      titleArgs={{name: articleName}}
      submit={{ title: "button.create", onClick: handleCreate, disabled: false }}>

      <Typography>
        <FormattedMessage id='newpage.article.info' values={{ article: article.body.name, locale: open.body.value }} />
      </Typography>
    </StyledDialog>
  );
}

export { NewArticlePage }