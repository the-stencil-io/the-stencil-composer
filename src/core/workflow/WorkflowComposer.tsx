import React from 'react';
import { createStyles, makeStyles } from '@mui/styles';
import {
  Theme, TextField, InputLabel, FormControl, MenuItem, Select,
  Button, Dialog, DialogTitle, DialogContent, DialogActions, ButtonGroup, ListItemText, Checkbox
} from '@mui/material';
import { FormattedMessage } from 'react-intl';

import { Composer, StencilClient } from '../context';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    title: {
      backgroundColor: theme.palette.workflow.main,
      color: theme.palette.secondary.contrastText,
    },
    select: {
      marginTop: theme.spacing(2),
      color: theme.palette.primary.contrastText,
      backgroundColor: theme.palette.background.paper
    },
    button: {
      fontWeight: 'bold',
      "&:hover, &.Mui-focusVisible": {
        color: theme.palette.workflow.main,
        fontWeight: 'bold',
      }
    },
    buttonGroup: {
      color: theme.palette.workflow.main
    },
  }),
);


const WorkflowComposer: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const classes = useStyles();
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
    <Dialog open={true} onClose={onClose} >
      <DialogTitle className={classes.title}><FormattedMessage id='workflow.composer.title' /></DialogTitle>
      <DialogContent>

        <FormControl variant="outlined" className={classes.select} fullWidth>
          <InputLabel><FormattedMessage id='locale' /></InputLabel>
          <Select
            multiple
            onChange={({ target }) => {
              const locale: StencilClient.LocaleId[] = target.value as any;
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
            value={locales}
            label={<FormattedMessage id='locale' />}
          >
            <MenuItem key={-1} value={''}><FormattedMessage id='locale' /></MenuItem>
            {siteLocales.map((locale, index) => (
              <MenuItem key={index} value={locale.id}>{locale.body.value}</MenuItem>
            ))}
          </Select>
        </FormControl>

        <TextField className={classes.select}
          label={<FormattedMessage id='workflow.technicalname' />}
          helperText={<FormattedMessage id='workflow.technicalname' />}
          variant="outlined"
          fullWidth
          value={technicalname}
          onChange={({ target }) => setTechnicalname(target.value)} />


        <TextField className={classes.select}
          label={<FormattedMessage id='workflow.composer.name' />}
          helperText={<FormattedMessage id='workflow.composer.helper' />}
          variant="outlined"
          fullWidth
          value={name}
          onChange={({ target }) => setName(target.value)} />

        <FormControl variant="outlined" className={classes.select} fullWidth>
          <InputLabel><FormattedMessage id='composer.select.article' /></InputLabel>
          <Select
            multiline
            multiple
            disabled={!locales.length}
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
      </DialogContent>

      <DialogActions>
        <ButtonGroup className={classes.buttonGroup} variant="text" >
          <Button onClick={onClose} className={classes.button}><FormattedMessage id='button.cancel' /></Button>
          <Button onClick={handleCreate} autoFocus disabled={!name || !technicalname} className={classes.button}><FormattedMessage id='button.add' /></Button>
        </ButtonGroup>
      </DialogActions>
    </Dialog>
  );

}

export { WorkflowComposer }