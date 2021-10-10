import React from 'react';
import { createStyles, makeStyles } from '@mui/styles';
import {
  Theme, InputLabel, FormControl, Button,
  Dialog, DialogTitle, DialogContent, DialogActions, MenuItem, Select,
  ButtonGroup, Typography
} from '@mui/material';
import { FormattedMessage } from 'react-intl';

import { API, Ide } from '../../deps';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    title: {
      backgroundColor: theme.palette.page.main,
      color: theme.palette.secondary.contrastText,
      marginBottom: theme.spacing(2)
    },
    select: {
      marginTop: theme.spacing(2),
      color: theme.palette.primary.contrastText,
      backgroundColor: theme.palette.background.paper
    },
    button: {
      fontWeight: 'bold',
      "&:hover, &.Mui-focusVisible": {
        color: theme.palette.page.main,
        fontWeight: 'bold',
      }
    },
    buttonGroup: {
      color: theme.palette.page.main
    },
  }),
);

const NewPage: React.FC<{ onClose: () => void, articleId?: API.CMS.ArticleId }> = (props) => {
  const classes = useStyles();
  const ide = Ide.useIde();
  const { site } = ide.session;
  const [locale, setLocale] = React.useState('');
  const [articleId, setArticleId] = React.useState(props.articleId ? props.articleId : '');

  const handleCreate = () => {
    const entity: API.CMS.CreatePage = { articleId, locale };
    ide.service.create().page(entity).then(success => {
      console.log(success)
      props.onClose();
      ide.actions.handleLoadSite();
    })
  }

  const definedLocales: API.CMS.LocaleId[] = Object.values(ide.session.site.pages)
    .filter(p => p.body.article === articleId).map(p => p.body.locale);

  const articles: API.CMS.Article[] = Object.values(site.articles);
  const locales: API.CMS.SiteLocale[] = Object.values(site.locales).filter(l => !definedLocales.includes(l.id));

  return (<>
    <Dialog open={true} onClose={props.onClose}>
      <DialogTitle className={classes.title} ><FormattedMessage id='newpage.title' /></DialogTitle>
      <DialogContent>
        <Typography component={'div'}>

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
          
            {locales.map((locale) => ( 
              <MenuItem value={locale.id}>{locale.body.value}</MenuItem>
              ))}
          
            </Select>
          </FormControl >
        </Typography>
      </DialogContent>

      <DialogActions>
        <ButtonGroup variant="text" className={classes.buttonGroup}>
          <Button onClick={props.onClose} className={classes.button}><FormattedMessage id='button.cancel' /></Button>
          <Button onClick={handleCreate} autoFocus disabled={!locale} className={classes.button}><FormattedMessage id='button.create' /></Button>
        </ButtonGroup>
      </DialogActions>
    </Dialog>
  </>
  );
}

export { NewPage }