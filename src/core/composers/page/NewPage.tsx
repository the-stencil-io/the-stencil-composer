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

const NewPage: React.FC<{ open: boolean, onClose: () => void, articleId?: API.CMS.ArticleId}> = (props) => {
  const classes = useStyles();
  const ide = Ide.useIde();
  const { site } = ide.session;
  const [locale, setLocale] = React.useState('');
  const [articleId, setArticleId] = React.useState(props.articleId ? props.articleId : '');
  const [open, setOpen] = React.useState(props.open ? props.open : false);


  const handleCreate = () => {
    const entity: API.CMS.CreatePage = { articleId, locale };
    ide.service.create().page(entity).then(success => {
      console.log(success)
      props.onClose();
      ide.actions.handleLoadSite();
    })
  }

  const handleClose = () => {
    props.onClose();
    setOpen(false);
  };
  React.useEffect(() => {
    setOpen(props.open);
    if(props.articleId){
      setArticleId(props.articleId)
    }
  }, [props]);
  


  const articles: API.CMS.Article[] = Object.values(site.articles);
  const locales: API.CMS.SiteLocale[] = Object.values(site.locales);

  return (
    <Dialog open={open} onClose={handleClose} >
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
                <MenuItem key={index} value={article.id}>{article.body.order}{"_"}{article.body.name}</MenuItem>
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
                <MenuItem key={index} value={locale.id}>{locale.body.value}</MenuItem>
              ))}
            </Select>
          </FormControl >
        </Typography>
      </DialogContent>

      <DialogActions>
        <Button variant="text" onClick={props.onClose} color="primary"><FormattedMessage id='button.cancel' /></Button>
        <Button variant="contained" onClick={handleCreate} color="primary" autoFocus disabled={!locale}><FormattedMessage id='button.create' /></Button>
      </DialogActions>
    </Dialog>
  );
}

export { NewPage }