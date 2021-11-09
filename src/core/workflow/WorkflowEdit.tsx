import React from 'react';
import { createStyles, makeStyles } from '@mui/styles';
import { Theme, TextField, InputLabel, FormControl, MenuItem, Select, Checkbox, ListItemText } from '@mui/material';
import { FormattedMessage } from 'react-intl';

import WorkflowDevMode from './WorkflowDevMode';
import { Composer, StencilClient } from '../context';
import { StyledDialog } from '../styles/StyledDialog';


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    select: {
      padding: theme.spacing(1),
      marginTop: theme.spacing(3),
      color: theme.palette.primary.contrastText,
      backgroundColor: theme.palette.background.paper
    }
  }),
);

interface WorkflowEditProps {
  workflowId: StencilClient.WorkflowId,
  onClose: () => void,
}

const WorkflowEdit: React.FC<WorkflowEditProps> = ({ onClose, workflowId }) => {
  const classes = useStyles();
  const { service, actions, session, site } = Composer.useComposer();
  const workflow = site.workflows[workflowId]

  const [articleId, setArticleId] = React.useState<StencilClient.ArticleId[]>(workflow.body.articles);
  const [technicalname, setTechnicalname] = React.useState(workflow.body.value);
  const articles: StencilClient.Article[] = session.getArticlesForLocales(workflow.body.labels.map(l => l.locale));

  const handleCreate = () => {
    const entity: StencilClient.WorkflowMutator = { workflowId: workflow.id, value: technicalname, articles: articleId, labels: undefined, devMode: undefined };
    service.update().workflow(entity).then(success => {
      console.log(success)
      onClose();
      actions.handleLoadSite();
    })
  }

  return (
    <StyledDialog open={true} onClose={onClose}
      color="workflow.main"
      title="workflow.edit.title"
      submit={{ title: "button.add", onClick: handleCreate, disabled: !technicalname }}>
      <>
        <TextField className={classes.select}
          label={<FormattedMessage id='workflow.technicalname' />}
          helperText={<FormattedMessage id='workflow.technicalname' />}
          variant="outlined"
          fullWidth
          value={technicalname}
          onChange={({ target }) => setTechnicalname(target.value)} />

        <FormControl variant="outlined" className={classes.select} fullWidth>
          <InputLabel><FormattedMessage id='composer.select.article' /></InputLabel>
          <Select
            multiline
            multiple
            onChange={({ target }) => setArticleId(target.value as StencilClient.ArticleId[])}
            value={articleId}
            label={<FormattedMessage id='composer.select.article' />}
            renderValue={(selected) => (selected as StencilClient.ArticleId[]).map((articleId, index) => <div key={index}>{site.articles[articleId].body.name}</div>)}
          >
            {articles.map((article, index) => (

              <MenuItem key={index} value={article.id}>
                <Checkbox checked={articleId.indexOf(article.id) > -1} />
                <ListItemText primary={article.body.name} />

              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <WorkflowDevMode />
      </>
    </StyledDialog>
  );

}

export { WorkflowEdit }