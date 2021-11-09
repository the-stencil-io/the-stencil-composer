import React from 'react';
import { createStyles, makeStyles } from '@mui/styles';
import { Theme, FormControl, MenuItem, Select } from '@mui/material';
import { FormattedMessage } from 'react-intl';

import { Composer, StencilClient } from '../context';
import { StyledDialog } from '../styles/StyledDialog';


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    select: {
      padding: theme.spacing(1),
      marginTop: theme.spacing(3),
      //color: theme.palette.primary.contrastText,
      //backgroundColor: theme.palette.background.paper
    },
  }),
);


const PageEdit: React.FC<{ onClose: () => void, articleId: StencilClient.ArticleId }> = (props) => {
  const classes = useStyles();
  const { service, actions, site } = Composer.useComposer();
  const articleId = props.articleId;
  // const [articleId, setArticleId] = React.useState('');
  const [pageId, setPageId] = React.useState('');
  const [newLocale, setNewLocale] = React.useState('');

  const handleUpdate = () => {
    const entity: StencilClient.PageMutator = { locale: newLocale, pageId, content: site.pages[pageId].body.content };
    service.update().pages([entity]).then(_success => {
      props.onClose();
      actions.handleLoadSite();
    })
  }

  const articlePages: StencilClient.Page[] = Object.values(site.pages).filter(p => p.body.article === articleId);
  const usedLocales: StencilClient.LocaleId[] = articlePages.map(articlePage => articlePage.body.locale)
  const unusedLocales: StencilClient.SiteLocale[] = Object.values(site.locales).filter(siteLocale => !usedLocales.includes(siteLocale.id));

  const valid = pageId && articleId && newLocale;
  return (
    <StyledDialog open={true} onClose={props.onClose}
      color="page.main"
      title="pages.change"
      submit={{ title: "button.update", onClick: handleUpdate, disabled: !valid }}>

      <>
        <FormattedMessage id='pages.change.info' />
        <FormControl variant="outlined" className={classes.select} fullWidth>
          <Select
            className={classes.select}
            variant="outlined"
            value={pageId}
            onChange={({ target }) => setPageId(target.value as any)}
            label={<FormattedMessage id='pages.edit.selectpage' />}
          >
            {articlePages.map((articlePage) => (
              <MenuItem key={articlePage.id} value={articlePage.id}>{site.locales[articlePage.body.locale].body.value}</MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl variant="outlined" className={classes.select} fullWidth>
          <Select
            className={classes.select}
            variant="outlined"
            value={newLocale}
            onChange={({ target }) => setNewLocale(target.value as any)}
            label={<FormattedMessage id='pages.edit.selectTargetLocale' />}
          >
            {unusedLocales.map((unusedLocale) => (
              <MenuItem key={unusedLocale.id} value={unusedLocale.id}>{unusedLocale.body.value}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </>

    </StyledDialog>
  );
}

export { PageEdit }