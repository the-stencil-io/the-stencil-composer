import React from 'react';
import { createStyles, makeStyles } from '@mui/styles';
import { Theme, InputLabel, FormControl, MenuItem, Select } from '@mui/material';
import { FormattedMessage } from 'react-intl';

import { Composer, StencilClient } from '../context';
import { StyledDialog } from '../styles/StyledDialog';


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    select: {
      marginTop: theme.spacing(2),
      color: theme.palette.primary.contrastText,
      backgroundColor: theme.palette.background.paper
    },
    selectSub: {
      marginLeft: theme.spacing(2),
      color: theme.palette.article.dark,
    },
  }),
);

const NewPage: React.FC<{ onClose: () => void, articleId?: StencilClient.ArticleId }> = (props) => {
  const classes = useStyles();
  const { service, actions, site } = Composer.useComposer();
  const [locale, setLocale] = React.useState('');
  const [articleId, setArticleId] = React.useState(props.articleId ? props.articleId : '');

  const handleCreate = () => {
    const entity: StencilClient.CreatePage = { articleId, locale };
    service.create().page(entity).then(success => {
      console.log(success)
      props.onClose();
      actions.handleLoadSite();
    })
  }

  const definedLocales: StencilClient.LocaleId[] = Object.values(site.pages)
    .filter(p => p.body.article === articleId).map(p => p.body.locale);

  const articles: StencilClient.Article[] = Object.values(site.articles)
    .sort((a1, a2) => {
      if (a1.body.parentId && a1.body.parentId === a2.body.parentId) {
        const children = a1.body.order - a2.body.order;
        if (children === 0) {
          return a1.body.name.localeCompare(a2.body.name);
        }
        return children;
      }

      return (a1.body.parentId ? site.articles[a1.body.parentId].body.order + 1 : a1.body.order)
        - (a2.body.parentId ? site.articles[a2.body.parentId].body.order + 1 : a2.body.order);
    });
  const locales: StencilClient.SiteLocale[] = Object.values(site.locales).filter(l => !definedLocales.includes(l.id));

  return (<StyledDialog open={true} onClose={props.onClose}
    color="page.main"
    title="newpage.title"
    submit={{ title: "button.create", onClick: handleCreate, disabled: !locale }}>
    <>
      <FormattedMessage id='newpage.info' />
      <FormControl variant="outlined" className={classes.select} fullWidth>
        <InputLabel><FormattedMessage id='article.name' /></InputLabel>
        <Select
          value={articleId}
          onChange={({ target }) => setArticleId(target.value as any)}
          label={<FormattedMessage id='article.name' />}
        >
          {articles.map((article, index) => (
            <MenuItem key={index} value={article.id} className={article.body.parentId ? classes.selectSub : ''}>
              {article.body.order} - {article.body.parentId ? site.articles[article.body.parentId].body.name + "/" : ""}{article.body.name}
            </MenuItem>
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

          {locales.map((locale) =>
            <MenuItem value={locale.id}>{locale.body.value}</MenuItem>
          )}

        </Select>
      </FormControl >
    </>
  </StyledDialog>
  );
}

export { NewPage }