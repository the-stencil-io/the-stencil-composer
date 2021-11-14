import React from 'react';

import { ListItemText, Checkbox } from '@mui/material';

import StencilStyles from '../styles';
import { Composer, StencilClient } from '../context';
import { LocaleLabels } from '../locale';


const WorkflowComposer: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const { service, actions, site, session } = Composer.useComposer();
  const [articleId, setArticleId] = React.useState<StencilClient.ArticleId[]>([]);
  const [technicalname, setTechnicalname] = React.useState('');
  const [labels, setLabels] = React.useState<StencilClient.LocaleLabel[]>([]);
  const [changeInProgress, setChangeInProgress] = React.useState(false);
  const locales = labels.map(l => l.locale);

  console.log(labels);

  const handleCreate = () => {
    const entity: StencilClient.CreateWorkflow = { value: technicalname, articles: articleId, devMode: undefined, labels };
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
      submit={{ title: "button.add", onClick: handleCreate, disabled: !technicalname || changeInProgress }}>
      <>
        <LocaleLabels
          onChange={(labels) => { setChangeInProgress(false); setLabels(labels.map(l => ({ locale: l.locale, labelValue: l.value }))); }}
          onChangeStart={() => setChangeInProgress(true)}
          selected={labels.map(label => ({ locale: label.locale, value: label.labelValue }))} />

        <StencilStyles.TextField label='workflow.technicalname' helperText='workflow.technicalname.description'
          value={technicalname}
          onChange={setTechnicalname} />

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
      </>
    </StencilStyles.Dialog>
  );

}

export { WorkflowComposer }