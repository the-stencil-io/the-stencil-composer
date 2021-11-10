import React from 'react';
import { ListItemText, Checkbox } from '@mui/material';

import StencilStyles from '../styles';
import { Composer, StencilClient } from '../context';


const linkTypes: StencilClient.LinkType[] = ["internal", "external", "phone"];

interface LinkEditProps {
  linkId: StencilClient.LinkId,
  onClose: () => void,
}

const LinkEdit: React.FC<LinkEditProps> = ({ linkId, onClose }) => {
  const { service, actions, session, site } = Composer.useComposer();
  const link = site.links[linkId];
  const [locale, setLocale] = React.useState(link.body.labels[0].locale);
  const [value, setValue] = React.useState(link.body.value);
  const [contentType, setContentType] = React.useState(link.body.contentType);
  const locales: StencilClient.SiteLocale[] = Object.values(site.locales);
  const [articleId, setArticleId] = React.useState<StencilClient.ArticleId[]>(link.body.articles);
  const articles: StencilClient.Article[] = locale ? session.getArticlesForLocale(locale) : Object.values(site.articles);


  const handleUpdate = () => {
    const entity: StencilClient.LinkMutator = { linkId: link.id, value, type: contentType, articles: articleId, labels: undefined };
    console.log("entity", entity)
    service.update().link(entity).then(success => {
      console.log(success)
      onClose();
      actions.handleLoadSite();
    });
  }

  return (<StencilStyles.Dialog open={true} onClose={onClose}
    color="link.main" title="link.edit.title"
    submit={{ title: "button.update", onClick: handleUpdate, disabled: !value }}>
    <>
      <StencilStyles.Select label="link.type"
        selected={contentType}
        onChange={setContentType as any}
        items={linkTypes.map(link => ({ id: link, value: link }))}
      />

      <StencilStyles.Select label='locale'
        selected={locale}
        items={locales.map((locale) => ({ id: locale.id, value: locale.body.value }))}
        onChange={(locale: StencilClient.LocaleId) => {
          if (articleId) {
            const newArticleId = [...articleId]
            const articlesForNewLocale = session.getArticlesForLocale(locale).map(article => article.id);
            for (const nextId of articleId) {
              if (!articlesForNewLocale.includes(nextId)) {
                const index = newArticleId.indexOf(nextId);
                newArticleId.splice(index, 1);
              }
            }
            setArticleId(newArticleId);
          }
          setLocale(locale);
        }} />

      <StencilStyles.TextField label="link.content" helperText="link.composer.valuehelper" placeholder={link.body.value}
        required
        value={value}
        onChange={setValue} />

      <StencilStyles.SelectMultiple label='link.article.select' multiline
        selected={articleId}
        onChange={setArticleId}
        renderValue={(selected: StencilClient.ArticleId[]) => selected.map((articleId, index) => <div key={index}>{site.articles[articleId].body.name}</div>)}
        items={articles.map((article) => ({
          id: article.id,
          value: (<>
            <Checkbox checked={articleId.indexOf(article.id) > -1} />
            <ListItemText primary={article.body.name} />
          </>)
        }
        ))}
      />
    </>
  </StencilStyles.Dialog>
  );
}
export { LinkEdit }
