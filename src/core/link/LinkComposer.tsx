import React from 'react';
import { ListItemText, Box, Typography } from '@mui/material';
import WarningAmberRoundedIcon from '@mui/icons-material/WarningAmberRounded';
import { FormattedMessage } from 'react-intl';

import { Composer, StencilClient } from '../context';
import StencilStyles from '../styles';
import { LocaleLabels } from '../locale';


const LinkComposer: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const { service, actions, site } = Composer.useComposer();

  const [type, setType] = React.useState<'internal' | 'external' | 'phone' | string>('internal');
  const [value, setValue] = React.useState('');
  const [labels, setLabels] = React.useState<StencilClient.LocaleLabel[]>([]);
  const [changeInProgress, setChangeInProgress] = React.useState(false);
  const [articleId, setArticleId] = React.useState<StencilClient.ArticleId[]>([]);
  const articles: StencilClient.Article[] = Object.values(site.articles);

  const handleCreate = () => {
    const entity: StencilClient.CreateLink = { type, value, articles: articleId, labels };
    service.create().link(entity).then(success => {
      console.log(success)
      onClose();
      actions.handleLoadSite();
    })
  }
  

  return (
    <StencilStyles.Dialog open={true} onClose={onClose}
      backgroundColor="uiElements.main"
      title="link.composer.title"
      submit={{ title: "button.create", onClick: handleCreate, disabled: !value || changeInProgress }}>

      <>
        <LocaleLabels
          onChange={(labels) => { setChangeInProgress(false); setLabels(labels.map(l => ({ locale: l.locale, labelValue: l.value }))); }}
          onChangeStart={() => setChangeInProgress(true)}
          selected={labels.map(label => ({ locale: label.locale, value: label.labelValue }))} />

        <StencilStyles.Select label='link.type' selected={type} onChange={setType}
          items={[
            { id: 'internal', value: 'link.type.internal' },
            { id: 'external', value: 'link.type.external' },
            { id: 'phone', value: 'link.type.phone' }
          ]} />

        <StencilStyles.TextField label='value' helperText='link.composer.valuehelper'
          required
          value={value}
          onChange={setValue} />

        <Box display="flex" alignItems="center" sx={{ mt: 1, mb: 1 }}>
          <StencilStyles.SecondaryButton label={"allarticles"} onClick={() => setArticleId(Object.keys(site.articles))} />
          <StencilStyles.SecondaryButton label={"allarticles.individual"} onClick={() => setArticleId([])} />
          <WarningAmberRoundedIcon  sx={{ ml: 3, color: "warning.main"}} /><Typography variant="caption" sx={{ ml: 1 }}><FormattedMessage id="add.allarticles.link.help" /></Typography>
        </Box>

        <StencilStyles.SelectMultiple label='composer.select.article'
          multiline
          onChange={setArticleId}
          selected={articleId}
          renderValue={(selected: StencilClient.ArticleId[]) => selected.map((articleId, index) => <div key={index}>{site.articles[articleId].body.name}</div>)}
          items={articles.map(article => ({
            id: article.id,
            value: (<>
              <StencilStyles.Checkbox checked={articleId.indexOf(article.id) > -1} />
              <ListItemText primary={article.body.name} />
            </>)
          }))}
        />
      </>
    </StencilStyles.Dialog>
  );
}

export { LinkComposer }