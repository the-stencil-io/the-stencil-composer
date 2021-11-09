import React from 'react';
import { makeStyles, createStyles } from '@mui/styles';
import {
  Theme, TextField, InputLabel, FormControl, MenuItem, Select,
  Button, Dialog, DialogTitle, DialogContent, DialogActions, ButtonGroup,
  ListItemText, Checkbox
} from '@mui/material'; import { FormattedMessage } from 'react-intl';

import { Composer, StencilClient } from '../context';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    select: {
      padding: theme.spacing(1),
      marginTop: theme.spacing(3),
    },
    title: {
      backgroundColor: theme.palette.link.main,
      color: theme.palette.secondary.contrastText,
      fontWeight: 300
    },
    button: {
      fontWeight: 'bold',
      "&:hover, &.Mui-focusVisible": {
        color: theme.palette.link.main,
        fontWeight: 'bold',
      }
    }
  }),
);

const linkTypes: StencilClient.LinkType[] = ["internal", "external", "phone"];

interface LinkEditProps {
  link: StencilClient.Link,
  onClose: () => void,
}

const LinkEdit: React.FC<LinkEditProps> = ({ link, onClose }) => {
  const classes = useStyles();
  const {service, actions, session, site} = Composer.useComposer();

  const [locale, setLocale] = React.useState(link.body.labels[0].locale);
  const [value, setValue] = React.useState(link.body.value);
  const [contentType, setContentType] = React.useState(link.body.contentType);
  const locales: StencilClient.SiteLocale[] = Object.values(site.locales);
  const [articleId, setArticleId] = React.useState<StencilClient.ArticleId[]>(link.body.articles);
  const articles: StencilClient.Article[] = locale ? session.getArticlesForLocale(locale) : Object.values(site.articles);


  const handleCreate = () => {
    const entity: StencilClient.LinkMutator = { linkId: link.id, value, type: contentType, articles: articleId, labels: undefined };
    console.log("entity", entity)
    service.update().link(entity).then(success => {
      console.log(success)
      onClose();
      actions.handleLoadSite();
    });
  }

  return (<>
    <Dialog open={true} onClose={onClose}>
      <DialogTitle className={classes.title}> <FormattedMessage id="link.edit.title" /></DialogTitle>
      <DialogContent>

        <FormControl variant="outlined" className={classes.select} fullWidth>
          <InputLabel ><FormattedMessage id="link.type" /></InputLabel>
          <Select
            value={contentType}
            onChange={({ target }) => setContentType(target.value as any)}
            label={<FormattedMessage id="link.type" />}
          >
            {linkTypes.map((link, index) => (
              <MenuItem key={index} value={link}>{link}</MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl variant="outlined" className={classes.select} fullWidth>
          <InputLabel ><FormattedMessage id="locale" /></InputLabel>
          <Select
            value={locale}
            label={<FormattedMessage id="locale" />}
            onChange={({ target }) => {
              const locale: StencilClient.LocaleId = target.value as any;
              if (articleId) {
                const newArticleId = [...articleId]
                const articlesForNewLocale = session.getArticlesForLocale(locale).map(article => article.id);
                for (const nextId of articleId) {
                  if (!articlesForNewLocale.includes(nextId)) {
                    const index = newArticleId.indexOf(nextId);
                    newArticleId.splice(index, 1);
                  }
                }
                setArticleId(newArticleId);
              }
              setLocale(locale);
            }}>

            <MenuItem value={""}><FormattedMessage id='link.locale.all' /></MenuItem>
            {locales.map((locale, index) => (
              <MenuItem key={index} value={locale.id}>{locale.body.value}</MenuItem>
            ))}

          </Select>
        </FormControl>

        <FormControl variant="outlined" fullWidth>
          <TextField
            label={<FormattedMessage id="link.content" />}
            variant="outlined"
            required
            placeholder={link.body.value}
            helperText={<FormattedMessage id="link.composer.valuehelper" />}
            fullWidth
            className={classes.select}
            value={value}
            onChange={({ target }) => setValue(target.value as any)} />
        </FormControl>
        <FormControl variant="outlined" className={classes.select} fullWidth>
          <InputLabel><FormattedMessage id='link.article.select' /></InputLabel>
          <Select
            multiline
            multiple
            value={articleId}
            label={<FormattedMessage id='link.article.select' />}
            onChange={({ target }) => setArticleId(target.value as StencilClient.ArticleId[])}
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
      </DialogContent >
      <DialogActions>
        <ButtonGroup variant="text">
          <Button className={classes.button} onClick={onClose}><FormattedMessage id="button.cancel" /></Button>
          <Button className={classes.button} onClick={handleCreate} autoFocus disabled={!value}  ><FormattedMessage id="button.update" /></Button>
        </ButtonGroup>
      </DialogActions>

    </Dialog >

  </>
  );
}
export { LinkEdit }
