import React from 'react';
import { createStyles, makeStyles } from '@mui/styles';
import {
  Theme, TextField, InputLabel, FormControl, ButtonGroup,
  MenuItem, Select, Button, Dialog, DialogTitle, DialogContent, DialogActions,
  Typography, Checkbox, ListItemText, FormHelperText
} from '@mui/material';
import { FormattedMessage } from 'react-intl';

import { API, Ide } from '../../deps';


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    title: {
      backgroundColor: theme.palette.link.main,
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
        color: theme.palette.link.main,
        fontWeight: 'bold',
      }
    },
    buttonGroup: {
      color: theme.palette.link.main
    },
  }),
);




const LinkComposer: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const classes = useStyles();
  const ide = Ide.useIde();
  const { site } = ide.session;
  const siteLocales: API.CMS.SiteLocale[] = Object.values(site.locales);

  const [type, setType] = React.useState<'internal' | 'external'>('internal');
  const [value, setValue] = React.useState('');
  const [labelValue, setLabelValue] = React.useState('');
  const [locales, setLocales] = React.useState<API.CMS.LocaleId[]>([]);
  const [articleId, setArticleId] = React.useState<API.CMS.ArticleId[]>([]);
  const articles: API.CMS.Article[] = locales ? ide.session.getArticlesForLocales(locales) : Object.values(site.articles);

  const handleCreate = () => {
    const entity: API.CMS.CreateLink = { type, value, labelValue, locales, articles: articleId };
    ide.service.create().link(entity).then(success => {
      console.log(success)
      onClose();
      ide.actions.handleLoadSite();
    })
  }


  return (
    <Dialog open={true} onClose={onClose} >
      <DialogTitle className={classes.title}><FormattedMessage id='link.composer.title' /></DialogTitle>
      <DialogContent>
        <Typography component={'div'}>

          <FormControl variant="outlined" className={classes.select} fullWidth>
            <InputLabel><FormattedMessage id='link.type' /></InputLabel>
            <Select
              value={type}
              onChange={({ target }) => setType(target.value as any)}
              label={<FormattedMessage id='link.type' />}>
              <MenuItem value="internal"><FormattedMessage id='link.type.internal' /></MenuItem>
              <MenuItem value="external"><FormattedMessage id='link.type.external' /></MenuItem>
              <MenuItem value="phone"><FormattedMessage id='link.type.phone' /></MenuItem>
            </Select>
          </FormControl >

          <FormControl variant="outlined" className={classes.select} fullWidth >
            <InputLabel><FormattedMessage id='locale' /></InputLabel>
            <Select
              multiple
              value={locales} label={<FormattedMessage id='locale' />} onChange={({ target }) => {
                const locale: API.CMS.LocaleId[] = target.value as any;
                if (articleId) {
                  const newArticleId = [...articleId]
                  const articlesForNewLocale = ide.session.getArticlesForLocales(locale).map(article => article.id);
                  for (const nextId of articleId) {
                    if (!articlesForNewLocale.includes(nextId)) {
                      const index = newArticleId.indexOf(nextId);
                      newArticleId.splice(index, 1);
                    }
                  }
                  setArticleId(newArticleId);
                }
                setLocales(locale);
              }}>

              {siteLocales.map((locale, index) => (
                <MenuItem key={index} value={locale.id}>{locale.body.value}</MenuItem>
              ))}

            </Select>
            <FormHelperText><FormattedMessage id="select.multiple" /></FormHelperText>

          </FormControl >

          <TextField
            className={classes.select}
            fullWidth
            required
            label={<FormattedMessage id='link.composer.descriptionlabel' />}
            helperText={<FormattedMessage id='link.composer.descriptionhelper' />}
            variant="outlined"
            value={labelValue}
            onChange={({ target }) => setLabelValue(target.value)} />

          <TextField
            className={classes.select}
            fullWidth
            required
            label={<FormattedMessage id='value' />}
            helperText={<FormattedMessage id='link.composer.valuehelper' />}
            variant="outlined"
            value={value}
            onChange={({ target }) => setValue(target.value)} />

          <FormControl variant="outlined" className={classes.select} fullWidth>
            <InputLabel><FormattedMessage id='composer.select.article' /></InputLabel>
            <Select
              multiline
              multiple
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
        </Typography>
      </DialogContent>
      <DialogActions>
        <ButtonGroup variant="text" className={classes.buttonGroup}>
          <Button onClick={onClose} className={classes.button}><FormattedMessage id='button.cancel' /></Button>
          <Button onClick={handleCreate} className={classes.button} autoFocus disabled={!value || !locales.length || !labelValue}><FormattedMessage id='button.create' /></Button>
        </ButtonGroup>
      </DialogActions>
    </Dialog>
  );
}

export { LinkComposer }