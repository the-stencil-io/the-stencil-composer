import React from 'react';
import {
  makeStyles, createStyles, Theme, InputLabel, FormControl, Button,
  Dialog, Typography, DialogTitle, DialogContent, DialogActions, MenuItem, Select
} from '@material-ui/core';
import { FormattedMessage } from 'react-intl';

import { API, Ide } from '../../deps';


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    select: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.background.paper
    },
    root: {
      fontWeight: 'bold',
    },
  }),
);

const NewPage: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const classes = useStyles();
  const ide = Ide.useIde();
  const { site } = ide.session;
  const [locale, setLocale] = React.useState('');
  const [articleId, setArticleId] = React.useState('');

  const handleCreate = () => {
    const entity: API.CMS.CreatePage = { articleId, locale };
    ide.service.create().page(entity).then(success => {
      console.log(success)
      onClose();
      ide.actions.handleLoadSite();
    })
  }

  const articles: API.CMS.Article[] = Object.values(site.articles);
  const locales: API.CMS.SiteLocale[] = Object.values(site.locales);

  return (
    <Dialog open={true} onClose={onClose} >
      <DialogTitle><FormattedMessage id='newpage.title' /></DialogTitle>
      <DialogContent>
        <Typography>
          <FormattedMessage id='newpage.info' />
          <FormControl variant="outlined" className={classes.select} fullWidth>
            <InputLabel><FormattedMessage id='article.name' /></InputLabel>
            <Select
              value={articleId}
              onChange={({ target }) => setArticleId(target.value as any)}
              label={<FormattedMessage id='article.name' />}
            >
              {articles.map((article, index) => (
                <MenuItem key={index} value={article.body.name}>{article.body.order}{"_"}{article.body.name}</MenuItem>
              ))}
            </Select>
          </FormControl >
          <FormControl variant="outlined" className={classes.select} fullWidth>
            <InputLabel><FormattedMessage id='locale' /></InputLabel>
            <Select
              value={locale}
              onChange={({ target }) => setLocale(target.value as any)}
              label={<FormattedMessage id='locale' />}
            >
              {locales.map((locale, index) => (
                <MenuItem key={index} value={locale.body.value}>{locale.body.value}</MenuItem>
              ))}
            </Select>
          </FormControl >
        </Typography>
      </DialogContent>
      
      <DialogActions>
        <Button variant="text" onClick={onClose} color="primary"><FormattedMessage id='button.cancel' /></Button>
        <Button variant="contained" onClick={handleCreate} color="primary" autoFocus disabled={!locale}><FormattedMessage id='button.create' /></Button>
      </DialogActions>
    </Dialog>
  );
}

export { NewPage }