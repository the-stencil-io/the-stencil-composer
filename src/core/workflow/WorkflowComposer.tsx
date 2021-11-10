import React from 'react';

import { ListItemText, Checkbox } from '@mui/material';

import StencilStyles from '../styles';
import { Composer, StencilClient } from '../context';



const WorkflowComposer: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const { service, actions, site, session } = Composer.useComposer();
  const siteLocales: StencilClient.SiteLocale[] = Object.values(site.locales);

  const [articleId, setArticleId] = React.useState<StencilClient.ArticleId[]>([]);

  const [locales, setLocales] = React.useState<StencilClient.LocaleId[]>([]);
  const [technicalname, setTechnicalname] = React.useState('');
  const [name, setName] = React.useState('');

  const handleCreate = () => {
    const entity: StencilClient.CreateWorkflow = { value: technicalname, locales, labelValue: name, articles: articleId, devMode: undefined };
    service.create().workflow(entity).then(success => {
      console.log(success)
      onClose();
      actions.handleLoadSite();
    })
  }

  const articles: StencilClient.Article[] = session.getArticlesForLocales(locales);
  return (
    <StencilStyles.Dialog open={true} onClose={onClose}
      color="workflow.main"
      title="workflow.composer.title"
      submit={{ title: "button.add", onClick: handleCreate, disabled: !name || !technicalname }}>
      <>
        <StencilStyles.SelectMultiple label='locale'
          selected={locales}
          items={siteLocales.map((locale) => ({ id: locale.id, value: locale.body.value }))}
          helperText="select.multiple"
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

        <StencilStyles.TextField label='workflow.technicalname' helperText='workflow.technicalname.description'
          value={technicalname}
          onChange={setTechnicalname} />

        <StencilStyles.TextField label='workflow.composer.name' helperText='workflow.composer.helper'
          value={name}
          onChange={setName} />

        <StencilStyles.SelectMultiple label='composer.select.article'
          multiline
          selected={articleId}
          disabled={!locales.length}
          onChange={setArticleId}
          renderValue={(selected) => (selected as StencilClient.ArticleId[]).map((articleId, index) => <div key={index}>{site.articles[articleId].body.name}</div>)}
          items={articles.map((article) => ({
            id: article.id,
            value: (<>
              <Checkbox checked={articleId.indexOf(article.id) > -1} />
              <ListItemText primary={article.body.name} />
              </>)
          }))}
        />
        dsfjkghskdhgkdhgldfhsgldfsglhlh
      </>
    </StencilStyles.Dialog>
  );

}

export { WorkflowComposer }