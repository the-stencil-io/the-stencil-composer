import React from 'react';
import {
  makeStyles, createStyles, Theme, FormControl, Button,
  Dialog, DialogTitle, DialogContent, DialogActions, MenuItem, Select,
  ButtonGroup
} from '@material-ui/core';
import { FormattedMessage } from 'react-intl';

import { API, Ide } from '../../deps';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    title: {
      backgroundColor: theme.palette.page.main,
      color: theme.palette.secondary.contrastText,
    },
    select: {
      padding: theme.spacing(1),
      marginTop: theme.spacing(3),
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


const PageEdit: React.FC<{ onClose: () => void, articleId: API.CMS.ArticleId }> = (props) => {
  const classes = useStyles();
  const ide = Ide.useIde();
  const { site } = ide.session;
  const articleId = props.articleId;
 // const [articleId, setArticleId] = React.useState('');
  const [pageId, setPageId] = React.useState('');
  const [newLocale, setNewLocale] = React.useState('');

  const handleUpdate = () => {
    const entity: API.CMS.PageMutator = { locale: newLocale, pageId, content: site.pages[pageId].body.content };
    ide.service.update().pages([entity]).then(_success => {
      props.onClose();
      ide.actions.handleLoadSite();
    })
  }

  const articlePages: API.CMS.Page[] = Object.values(site.pages).filter(p => p.body.article === articleId);
  const usedLocales: API.CMS.LocaleId[] = articlePages.map(articlePage => articlePage.body.locale)
  const unusedLocales: API.CMS.SiteLocale[] = Object.values(site.locales).filter(siteLocale => !usedLocales.includes(siteLocale.id));

  const valid = pageId && articleId && newLocale;

  return (<>
    <Dialog open={true} onClose={props.onClose} >
      <DialogTitle className={classes.title}><FormattedMessage id='pages.change' /></DialogTitle>
      <DialogContent>
        <FormattedMessage id='pages.change.info' />
        <FormControl variant="outlined" className={classes.select} fullWidth>
          <Select
            className={classes.select}
            variant="outlined"
            value={pageId}
            onChange={({ target }) => setPageId(target.value as any)}
            label={<FormattedMessage id='pages.edit.selectpage' />}
          >
            {articlePages.map((articlePage, index) => (
              <MenuItem key={index} value={articlePage.id}>{site.locales[articlePage.body.locale].body.value}</MenuItem>
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
            {unusedLocales.map((unusedLocale, index) => (
              <MenuItem key={index} value={unusedLocale.id}>{unusedLocale.body.value}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </DialogContent>

      <DialogActions>
      <ButtonGroup variant="text">
        <Button className={classes.button} onClick={props.onClose}><FormattedMessage id='button.cancel' /></Button>
        <Button className={classes.button} onClick={handleUpdate} autoFocus disabled={!valid}><FormattedMessage id='button.update' /></Button>
     </ButtonGroup>
      </DialogActions>
    </Dialog>
  </>
  );
}

export { PageEdit }