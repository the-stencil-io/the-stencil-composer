import React from 'react';
import {
  makeStyles, createStyles, Theme, InputLabel, FormControl, Button,
  Dialog, DialogTitle, DialogContent, DialogActions, MenuItem, Select
} from '@material-ui/core';
import { FormattedMessage } from 'react-intl';

import { API, Ide } from '../../deps';


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    select: {
      padding: theme.spacing(1),
      backgroundColor: theme.palette.background.paper
    },
    button: {
      // padding: 0,
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.background.paper,
      fontWeight: 'bold',
      "&:hover, &.Mui-focusVisible": {
        backgroundColor: theme.palette.error.dark,
        color: theme.palette.background.paper,
        fontWeight: 'bold'
      }
    },
    margin: {
      margin: theme.spacing(1)
    },
    iconButton: {
      padding: 2,
      paddingLeft: theme.spacing(1),
      color: theme.palette.primary.dark,
      "&:hover, &.Mui-focusVisible": {
        backgroundColor: theme.palette.info.main,
        color: theme.palette.background.paper,
        "& .MuiSvgIcon-root": {
          color: theme.palette.background.paper,
        }
      }
    },
  }),
);

const PageEdit: React.FC<{ open: boolean, onClose: () => void, articleId: API.CMS.ArticleId }> = (props) => {
  const classes = useStyles();
  const ide = Ide.useIde();
  const { site } = ide.session;
  const [articleId, setArticleId] = React.useState('');
  const [pageId, setPageId] = React.useState('');
  const [newLocale, setNewLocale] = React.useState('');

  const [open, setOpen] = React.useState(props.open ? props.open : false);


  const handleUpdate = () => {
    const entity: API.CMS.PageMutator = { locale: newLocale, pageId, content: site.pages[pageId].body.content };
    ide.service.update().pages([entity]).then(success => {
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
    if (props.articleId) {
      setArticleId(props.articleId)
    }
  }, [props]);

  const articlePages: API.CMS.Page[] = Object.values(site.pages).filter(p => p.body.article === articleId);
  const usedLocales: API.CMS.LocaleId[] = articlePages.map(articlePage => articlePage.body.locale)
  const unusedLocales: API.CMS.SiteLocale[] = Object.values(site.locales).filter(siteLocale => !usedLocales.includes(siteLocale.id));

  const valid = pageId && articleId && newLocale;

  return (<>
    <Dialog open={open} onClose={handleClose} >
      <DialogTitle><FormattedMessage id='pages.change' /></DialogTitle>
      <DialogContent>
        <FormattedMessage id='pages.change.info' />
        <FormControl variant="outlined" className={classes.select} fullWidth>
          <Select
            className={classes.margin}
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
            className={classes.margin}
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
        <Button variant="text" onClick={props.onClose} color="primary"><FormattedMessage id='button.cancel' /></Button>
        <Button variant="contained" onClick={handleUpdate} color="primary" autoFocus disabled={!valid}><FormattedMessage id='button.update' /></Button>
      </DialogActions>
    </Dialog>
  </>
  );
}

export { PageEdit }