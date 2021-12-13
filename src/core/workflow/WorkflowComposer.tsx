import React from 'react';

import { ListItemText, Paper, Box, Typography } from '@mui/material';
import WarningAmberRoundedIcon from '@mui/icons-material/WarningAmberRounded';

import { FormattedMessage } from 'react-intl';

import StencilStyles from '../styles';
import { Composer, StencilClient } from '../context';
import { LocaleLabels } from '../locale';


const WorkflowComposer: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const { service, actions, site, session } = Composer.useComposer();

  const [devMode, setDevMode] = React.useState<boolean>(true);

  let articleSelectOpen: boolean | undefined;

  const [articleId, setArticleId] = React.useState<StencilClient.ArticleId[]>([]);
  const [technicalname, setTechnicalname] = React.useState('');
  const [labels, setLabels] = React.useState<StencilClient.LocaleLabel[]>([]);
  const [changeInProgress, setChangeInProgress] = React.useState(false);
  const locales = labels.map(l => l.locale);



  const handleCreate = () => {
    const entity: StencilClient.CreateWorkflow = { value: technicalname, articles: articleId, devMode, labels };
    service.create().workflow(entity).then(success => {
      console.log(success)
      onClose();
      actions.handleLoadSite();
    })
  }

  const articles: StencilClient.Article[] = session.getArticlesForLocales(locales);
  return (
    <StencilStyles.Dialog open={true} onClose={onClose}
      backgroundColor="uiElements.main"
      title="services.add"
      submit={{ title: "button.add", onClick: handleCreate, disabled: !technicalname || changeInProgress || labels.length < 1 }}>
      <>
        <LocaleLabels
          onChange={(labels) => { setChangeInProgress(false); setLabels(labels.map(l => ({ locale: l.locale, labelValue: l.value }))); }}
          onChangeStart={() => setChangeInProgress(true)}
          selected={labels.map(label => ({ locale: label.locale, value: label.labelValue }))} />

        <Paper variant="elevation" sx={{ mt: 1, pl: 1, pr: 1, pb: 1, borderRadius: 2 }}>

          <Box display="flex">
            <Box flexGrow={1}>
              <StencilStyles.TextField label='services.technicalname' helperText='services.technicalname.description'
                required
                value={technicalname}
                onChange={setTechnicalname} />
            </Box>
            <Box maxWidth="50%" sx={{ ml: 1 }}>
              <StencilStyles.Switch
                checked={devMode}
                helperText="services.devmode.helper"
                label="services.devmode"
                onChange={setDevMode}
              />
            </Box>

          </Box>

          <StencilStyles.SelectMultiple label='article.select'
            multiline
            open={articleSelectOpen}
            selected={articleId}
            disabled={!locales.length}
            onChange={setArticleId}
            renderValue={(selected) => (selected as StencilClient.ArticleId[]).map((articleId, index) => <div key={index}>{site.articles[articleId].body.name}</div>)}

            items={articles.map((article) => ({
              id: article.id,
              value: (<>
                <StencilStyles.Checkbox checked={articleId.indexOf(article.id) > -1} />
                <ListItemText primary={article.body.name} />
              </>)
            }))}
          />

          <Box display="flex" alignItems="center" sx={{ mt: 1, mb: 1 }}>
            <StencilStyles.SecondaryButton label={"allarticles"} onClick={() => setArticleId(Object.keys(site.articles))} />
            <StencilStyles.SecondaryButton label={"allarticles.individual"} onClick={() => setArticleId([])} />
            <WarningAmberRoundedIcon sx={{ ml: 3, color: "warning.main" }} /><Typography variant="caption" sx={{ ml: 1 }}><FormattedMessage id="add.allarticles.service.help" /></Typography>
          </Box>
        </Paper>
      </>
    </StencilStyles.Dialog>
  );

}

export { WorkflowComposer }