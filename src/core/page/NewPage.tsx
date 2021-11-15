import React from 'react';

import { FormattedMessage } from 'react-intl';

import { Composer, StencilClient } from '../context';
import StencilStyles from '../styles';



const NewPage: React.FC<{ onClose: () => void, articleId?: StencilClient.ArticleId }> = (props) => {
  const { service, actions, site } = Composer.useComposer();
  const [locale, setLocale] = React.useState('');
  const [articleId, setArticleId] = React.useState(props.articleId ? props.articleId : '');

  const handleCreate = () => {
    const entity: StencilClient.CreatePage = { articleId, locale };
    service.create().page(entity).then(success => {
      console.log(success)
      props.onClose();
      actions.handleLoadSite();
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

  return (<StencilStyles.Dialog open={true} onClose={props.onClose}
    backgroundColor="uiElements.main"
    title="newpage.title"
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
          value: `${article.body.order} - ${article.body.parentId ? site.articles[article.body.parentId].body.name + "/" : ""}${article.body.name}`
        }))}
      />
      <StencilStyles.Select
        selected={locale}
        onChange={setLocale}
        label='locale'
        items={locales.map((locale) => ({ id: locale.id, value: locale.body.value }))}
      />
    </>
  </StencilStyles.Dialog>
  );
}

export { NewPage }