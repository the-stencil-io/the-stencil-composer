import React from 'react';

import { FormattedMessage } from 'react-intl';

import { Composer, StencilClient } from '../context';
import StencilStyles from '../styles';



const NewPage: React.FC<{ onClose: () => void, articleId?: StencilClient.ArticleId }> = (props) => {
  const { service, actions, site } = Composer.useComposer();
  const [locale, setLocale] = React.useState('');
  const [template, setTemplate] = React.useState<StencilClient.TemplateId | ''>('');
  const [articleId, setArticleId] = React.useState(props.articleId ? props.articleId : '');
  const { handleInTab } = Composer.useNav();

  const handleCreate = () => {

    const content = template ? site.templates[template].body.content : undefined;
    const entity: StencilClient.CreatePage = { articleId, locale, content };
    service.create().page(entity).then(success => {
      console.log(success)
      props.onClose();
      actions.handleLoadSite().then(() => {
        const article = site.articles[articleId];
        handleInTab({ article, type: "ARTICLE_PAGES", locale })
      });

    })
  }

  const definedLocales: StencilClient.LocaleId[] = Object.values(site.pages)
    .filter(p => p.body.article === articleId).map(p => p.body.locale);

  const articles: StencilClient.Article[] = Object.values(site.articles)
    .sort((a1, a2) => {
      if (a1.body.parentId && a1.body.parentId === a2.body.parentId) {
        const children = a1.body.order - a2.body.order;
        if (children === 0) {
          return a1.body.name.localeCompare(a2.body.name);
        }
        return children;
      }

      return (a1.body.parentId ? site.articles[a1.body.parentId].body.order + 1 : a1.body.order)
        - (a2.body.parentId ? site.articles[a2.body.parentId].body.order + 1 : a2.body.order);
    });
  const locales: StencilClient.SiteLocale[] = Object.values(site.locales).filter(l => !definedLocales.includes(l.id));
  const templates: StencilClient.Template[] = Object.values(site.templates);

  return (
    <StencilStyles.Dialog open={true} onClose={props.onClose}
      backgroundColor="uiElements.main"
      title="newpage.title"
      //titleArgs={{articleId ? name: articleName : undefined}}
      submit={{ title: "button.create", onClick: handleCreate, disabled: !locale }}>
      <>
        <FormattedMessage id='newpage.info' />

        <StencilStyles.Select
          selected={articleId}
          onChange={setArticleId}
          label='article.name'
          items={articles.map((article) => ({
            id: article.id,
            sx: article.body.parentId ? { ml: 2, color: "article.dark" } : undefined,
            value: `${article.body.parentId ? site.articles[article.body.parentId].body.name + "/" : ""}${article.body.name}`
          }))}
        />
        <StencilStyles.Select
          selected={locale}
          onChange={setLocale}
          label='locale'
          items={locales.map((locale) => ({ id: locale.id, value: locale.body.value }))}
        />
        {templates.length > 0 ?
          <StencilStyles.Select
            selected={template}
            onChange={setTemplate}
            label='template'
            empty={{ id: '', label: 'template.newpage.none' }}
            items={templates.map((template) => ({ id: template.id, value: template.body.name }))}
          />
          : null}

      </>
    </StencilStyles.Dialog>
  );
}

export { NewPage }