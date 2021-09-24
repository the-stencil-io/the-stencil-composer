import React from 'react';
import {
  makeStyles, createStyles, Theme, TextField, InputLabel, FormControl, MenuItem, Select,
  Button, Dialog, DialogTitle, DialogContent, DialogActions, ButtonGroup, ListItemText, Checkbox
} from '@mui/material';
import { FormattedMessage } from 'react-intl';

import { API, Ide } from '../../deps';

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
  const ide = Ide.useIde();
  const { site } = ide.session;

  const [articleId, setArticleId] = React.useState<API.CMS.ArticleId[]>([]);
  const [locale, setLocale] = React.useState('');
  const [technicalname, setTechnicalname] = React.useState('');
  const [name, setName] = React.useState('');

  const handleCreate = () => {
    const entity: API.CMS.CreateWorkflow = { content: technicalname, locale, name, articles: articleId };
    ide.service.create().workflow(entity).then(success => {
      console.log(success)
      onClose();
      ide.actions.handleLoadSite();
    })
  }

  
  const locales: API.CMS.SiteLocale[] = Object.values(site.locales);
  const articles: API.CMS.Article[] = ide.session.getArticlesForLocale(locale);

  return (
    <Dialog open={true} onClose={onClose} >
      <DialogTitle className={classes.title}><FormattedMessage id='workflow.composer.title' /></DialogTitle>
      <DialogContent>

        <FormControl variant="outlined" className={classes.select} fullWidth>
          <InputLabel><FormattedMessage id='locale' /></InputLabel>
          <Select onChange={({ target }) => {

              const locale: API.CMS.LocaleId = target.value as any;
              if (articleId) {
                const newArticleId = [...articleId]
                const articlesForNewLocale = ide.session.getArticlesForLocale(locale).map(article => article.id);
                for (const nextId of articleId) {
                  if (!articlesForNewLocale.includes(nextId)) {
                    const index = newArticleId.indexOf(nextId);
                    newArticleId.splice(index, 1);
                  }
                }
                setArticleId(newArticleId);
              }

              setLocale(locale);
            }}
            value={locale}
            label={<FormattedMessage id='locale' />}
          >
            <MenuItem key={-1} value={''}><FormattedMessage id='locale' /></MenuItem>
            {locales.map((locale, index) => (
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
            disabled={!locale}
            onChange={({ target }) => setArticleId(target.value as API.CMS.ArticleId[])}
            value={articleId}
            label={<FormattedMessage id='composer.select.article' />}
            renderValue={(selected) => (selected as API.CMS.ArticleId[]).map((articleId, index) => <div key={index}>{site.articles[articleId].body.name}</div>)}
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
          <Button onClick={handleCreate} autoFocus disabled={!name || !technicalname || articleId.length === 0} className={classes.button}><FormattedMessage id='button.add' /></Button>
        </ButtonGroup>
      </DialogActions>
    </Dialog>
  );

}

export { WorkflowComposer }