import React from 'react';

import { ListItemText, Paper, Box, Typography } from '@mui/material';
import WarningAmberRoundedIcon from '@mui/icons-material/WarningAmberRounded';

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
      title="services.edit"
      submit={{ title: "button.add", onClick: handleCreate, disabled: !technicalname || changeInProgress }}>

      <>
        <LocaleLabels
          onChange={(labels) => { setChangeInProgress(false); setLabels(labels.map(l => ({ locale: l.locale, labelValue: l.value }))); }}
          onChangeStart={() => setChangeInProgress(true)}
          selected={labels.map(label => ({ locale: label.locale, value: label.labelValue }))} />

        <StencilStyles.TextField label='services.technicalname' helperText='services.technicalname'
          value={technicalname}
          onChange={setTechnicalname} />


        <Box display="flex" alignItems="center" sx={{ mt: 1, mb: 1 }}>
          <StencilStyles.SecondaryButton label={"allarticles"} onClick={() => setArticleId(Object.keys(site.articles))} />
          <StencilStyles.SecondaryButton label={"allarticles.individual"} onClick={() => setArticleId([])} />
          <WarningAmberRoundedIcon sx={{ ml: 3, color: "warning.main"}}/><Typography variant="caption" sx={{ ml: 1 }}><FormattedMessage id="add.allarticles.service.help" /></Typography>
        </Box>


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

        <Paper variant="elevation" sx={{ mt: 1, pl: 1, pr: 1, pb: 1, borderRadius: 2 }}>
          <StencilStyles.Switch
            checked={devMode ? devMode : false}
            onChange={setDevMode}
            helperText={"services.devmode.helper"}
            label={"services.devmode"}
          />
        </Paper>
      </>
    </StencilStyles.Dialog>
  );

}

export { WorkflowEdit }