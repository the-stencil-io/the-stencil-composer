import React from 'react';
import { Checkbox, ListItemText } from '@mui/material';

import { Composer, StencilClient } from '../context';
import StencilStyles from '../styles';



const LinkComposer: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const { service, actions, session, site } = Composer.useComposer();
  const siteLocales: StencilClient.SiteLocale[] = Object.values(site.locales);

  const [type, setType] = React.useState<'internal' | 'external' | 'phone' | string>('internal');
  const [value, setValue] = React.useState('');
  const [labelValue, setLabelValue] = React.useState('');
  const [locales, setLocales] = React.useState<StencilClient.LocaleId[]>([]);
  const [articleId, setArticleId] = React.useState<StencilClient.ArticleId[]>([]);
  const articles: StencilClient.Article[] = locales ? session.getArticlesForLocales(locales) : Object.values(site.articles);

  const handleCreate = () => {
    const entity: StencilClient.CreateLink = { type, value, labelValue, locales, articles: articleId };
    service.create().link(entity).then(success => {
      console.log(success)
      onClose();
      actions.handleLoadSite();
    })
  }


  return (
    <StencilStyles.Dialog open={true} onClose={onClose}
      color="link.main" title="link.composer.title"
      submit={{ title: "button.create", onClick: handleCreate, disabled: !value || !locales.length || !labelValue }}>

      <>
        <StencilStyles.Select label='link.type' selected={type} onChange={setType}
          items={[
            { id: 'internal', value: 'link.type.internal' },
            { id: 'external', value: 'link.type.external' },
            { id: 'phone', value: 'link.type.phone' }
          ]} />

        <StencilStyles.SelectMultiple label='locale' helperText='select.multiple'
          selected={locales}
          items={siteLocales.map(locale => ({ id: locale.id, value: locale.body.value }))}
          onChange={(locale: StencilClient.LocaleId[]) => {
            if (articleId) {
              const newArticleId = [...articleId]
              const articlesForNewLocale = session.getArticlesForLocales(locale).map(article => article.id);
              for (const nextId of articleId) {
                if (!articlesForNewLocale.includes(nextId)) {
                  const index = newArticleId.indexOf(nextId);
                  newArticleId.splice(index, 1);
                }
              }
              setArticleId(newArticleId);
            }
            setLocales(locale);
          }}
        />

        <StencilStyles.TextField label='link.composer.descriptionlabel' helperText='link.composer.descriptionhelper'
          required
          value={labelValue}
          onChange={setLabelValue} />

        <StencilStyles.TextField label='value' helperText='link.composer.valuehelper'
          required
          value={value}
          onChange={setValue} />

        <StencilStyles.SelectMultiple label='composer.select.article'
          multiline
          onChange={setArticleId}
          selected={articleId}
          renderValue={(selected: StencilClient.ArticleId[]) => selected.map((articleId, index) => <div key={index}>{site.articles[articleId].body.name}</div>)}
          items={articles.map(article => ({
            id: article.id,
            value: (<>
              <Checkbox checked={articleId.indexOf(article.id) > -1} />
              <ListItemText primary={article.body.name} />
            </>)
          }))}
        />
      </>
    </StencilStyles.Dialog>
  );
}

export { LinkComposer }