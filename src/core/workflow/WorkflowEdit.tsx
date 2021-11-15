import React from 'react';
import { Checkbox, ListItemText, Paper, FormControlLabel, Switch, FormHelperText } from '@mui/material';
import { FormattedMessage } from 'react-intl';


import { Composer, StencilClient } from '../context';
import StencilStyles from '../styles';
import { LocaleLabels } from '../locale';



interface WorkflowEditProps {
  workflowId: StencilClient.WorkflowId,
  onClose: () => void,
}

const WorkflowEdit: React.FC<WorkflowEditProps> = ({ onClose, workflowId }) => {
  const { service, actions, session, site } = Composer.useComposer();
  const workflow = site.workflows[workflowId];

  const [devMode, setDevMode] = React.useState(workflow.body.devMode);
  const [articleId, setArticleId] = React.useState<StencilClient.ArticleId[]>(workflow.body.articles);
  const [technicalname, setTechnicalname] = React.useState(workflow.body.value);
  const articles: StencilClient.Article[] = session.getArticlesForLocales(workflow.body.labels.map(l => l.locale));
  const [labels, setLabels] = React.useState<StencilClient.LocaleLabel[]>(workflow.body.labels);
  const [changeInProgress, setChangeInProgress] = React.useState(false);

  const handleCreate = () => {
    const entity: StencilClient.WorkflowMutator = { workflowId: workflow.id, value: technicalname, articles: articleId, labels, devMode };
    service.update().workflow(entity).then(success => {
      console.log(success)
      onClose();
      actions.handleLoadSite();
    })
  }

  return (
    <StencilStyles.Dialog open={true} onClose={onClose}
      backgroundColor="uiElements.main"
      title="workflow.edit.title"
      submit={{ title: "button.add", onClick: handleCreate, disabled: !technicalname || changeInProgress }}>
      <>
        <LocaleLabels
          onChange={(labels) => { setChangeInProgress(false); setLabels(labels.map(l => ({ locale: l.locale, labelValue: l.value }))); }}
          onChangeStart={() => setChangeInProgress(true)}
          selected={labels.map(label => ({ locale: label.locale, value: label.labelValue }))} />


        <StencilStyles.TextField label='workflow.technicalname' helperText='workflow.technicalname'
          value={technicalname}
          onChange={setTechnicalname} />

        <StencilStyles.SelectMultiple label='composer.select.article'
          multiline
          onChange={setArticleId}
          selected={articleId}
          renderValue={(selected) => (selected as StencilClient.ArticleId[]).map((articleId, index) => <div key={index}>{site.articles[articleId].body.name}</div>)}
          items={articles.map((article) => ({
            id: article.id,
            value: (<>
              <StencilStyles.Checkbox checked={articleId.indexOf(article.id) > -1} />
              <ListItemText primary={article.body.name} />
            </>
            )
          }))}
        />

        <Paper variant="elevation" elevation={5} sx={{ mt: 1, p: 1, borderRadius: 3 }}>
          <FormControlLabel
            sx={{ mt: 3 }}
            control={<Switch checked={devMode} onChange={(event: React.ChangeEvent<HTMLInputElement>) => setDevMode(event.target.checked)} />}
            label={<FormattedMessage id="workflow.devmode" />} />
          <FormHelperText>
            <FormattedMessage id="workflow.devmode.helper" />
          </FormHelperText>
        </Paper>


      </>
    </StencilStyles.Dialog>
  );

}

export { WorkflowEdit }