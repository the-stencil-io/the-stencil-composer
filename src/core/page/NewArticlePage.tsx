import React from 'react';
import { Typography } from '@mui/material';
import { useSnackbar } from 'notistack';

import { FormattedMessage } from 'react-intl';

import { Composer, StencilClient } from '../context';
import StencilStyles from '../styles';


interface NewArticlePageProps {
  article: StencilClient.Article,
  open?: StencilClient.SiteLocale,

  onClose: () => void,
  onCreate: (page: StencilClient.Page) => void
}

const NewArticlePage: React.FC<NewArticlePageProps> = ({ article, open, onClose, onCreate }) => {
  const { enqueueSnackbar } = useSnackbar();
  const { service, actions, site } = Composer.useComposer();
  const [template, setTemplate] = React.useState<StencilClient.TemplateId | ''>('');

  if (!open) {
    return null;
  }

  const handleCreate = () => {
    // const content = template ? site.templates[template].body.content : undefined;
    const entity: StencilClient.CreatePage = { articleId: article.id, locale: open.id };
    service.create().page(entity)
      .then(success => actions.handleLoadSite().then(() => success))
      .then(success => {
        onCreate(success);
        onClose();
      })
    enqueueSnackbar(message, { variant: 'success' });

  }
  const message = <FormattedMessage id="snack.page.createdMessage" />


  const articleName = site.articles[article.id].body.name;
  const templates: StencilClient.Template[] = Object.values(site.templates);

  return (
    <StencilStyles.Dialog open={open ? true : false} onClose={onClose}
      backgroundColor="uiElements.main"
      title="newpage.title"
      titleArgs={{ name: articleName }}
      submit={{ title: "button.create", onClick: handleCreate, disabled: false }}>
      <>
        <Typography>
          <FormattedMessage id='newpage.article.info' values={{ article: article.body.name, locale: open.body.value }} />
        </Typography>
        {templates.length > 0 ?
          <StencilStyles.Select
            selected={template}
            onChange={setTemplate}
            label='template'
            empty={{ id: '', label: 'newpage.template.none' }}
            items={templates.map((template) => ({ id: template.id, value: template.body.name }))}
          />
          : null}
      </>
    </StencilStyles.Dialog>
  );
}

export { NewArticlePage }