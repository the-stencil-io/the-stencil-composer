import React from 'react';
import { makeStyles, createStyles } from '@mui/styles';
import {
  Theme, TextField, InputLabel, FormControl, MenuItem, Select,
  Button, Dialog, DialogTitle, DialogContent, DialogActions, ButtonGroup,
  ListItemText, Checkbox
} from '@mui/material'; import { FormattedMessage } from 'react-intl';

import { API, Ide } from '../../deps';

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
    },
    buttonGroup: {
      color: theme.palette.link.main
    },
    iconButton: {
      padding: 2,
      paddingLeft: theme.spacing(1),
      color: theme.palette.primary.dark,
      "&:hover, &.Mui-focusVisible": {
        backgroundColor: theme.palette.link.main,
        color: theme.palette.background.paper,
        "& .MuiSvgIcon-root": {
          color: theme.palette.background.paper,
        }
      }
    },
  }),
);

const linkTypes: API.CMS.LinkType[] = ["internal", "external", "phone"];

interface LinkEditProps {
  link: API.CMS.Link,
  open: boolean,
  onClose: () => void,
}

const LinkEdit: React.FC<LinkEditProps> = ({ link, onClose }) => {
  const classes = useStyles();
  const ide = Ide.useIde();
  const { site } = ide.session;


  const [locale, setLocale] = React.useState(link.body.locale);
  const [content, setContent] = React.useState(link.body.content);
  const [contentType, setContentType] = React.useState(link.body.contentType);
  const [description, setDescription] = React.useState(link.body.description);
  const locales: API.CMS.SiteLocale[] = Object.values(site.locales);
  const [articleId, setArticleId] = React.useState<API.CMS.ArticleId[]>(link.body.articles);
  const articles: API.CMS.Article[] = locale ? ide.session.getArticlesForLocale(locale) : Object.values(site.articles);
  

  const handleCreate = () => {
    const entity: API.CMS.LinkMutator = { linkId: link.id, content, locale, type: contentType, description, articles: articleId };
    console.log("entity", entity)
    ide.service.update().link(entity).then(success => {
      console.log(success)
      onClose();
      ide.actions.handleLoadSite();
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
            }}>
          
            <MenuItem value={""}><FormattedMessage id='link.locale.all' /></MenuItem>
            {locales.map((locale, index) => (
              <MenuItem key={index} value={locale.id}>{locale.body.value}</MenuItem>
            ))}

          </Select>
        </FormControl>
        <TextField
          label={<FormattedMessage id="link.composer.descriptionlabel" />}
          variant="outlined"
          placeholder={link.body.description}
          helperText={<FormattedMessage id="link.composer.descriptionhelper" />}
          fullWidth
          required
          className={classes.select}
          value={description}
          onChange={({ target }) => setDescription(target.value as any)} />

        <FormControl variant="outlined" fullWidth>
          <TextField
            label={<FormattedMessage id="link.content" />}
            variant="outlined"
            required
            placeholder={link.body.content}
            helperText={<FormattedMessage id="link.composer.valuehelper" />}
            fullWidth
            className={classes.select}
            value={content}
            onChange={({ target }) => setContent(target.value as any)} />
        </FormControl>
        <FormControl variant="outlined" className={classes.select} fullWidth>
          <InputLabel><FormattedMessage id='link.article.select' /></InputLabel>
          <Select
            multiline
            multiple
            onChange={({ target }) => setArticleId(target.value as API.CMS.ArticleId[])}
            value={articleId}
            label={<FormattedMessage id='link.article.select' />}
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
      </DialogContent >
      <DialogActions>
        <ButtonGroup variant="text">
          <Button className={classes.button} onClick={onClose}><FormattedMessage id="button.cancel" /></Button>
          <Button className={classes.button} onClick={handleCreate} autoFocus disabled={!content || !description}  ><FormattedMessage id="button.update" /></Button>
        </ButtonGroup>
      </DialogActions>

    </Dialog >

  </>
  );
}
export { LinkEdit }
