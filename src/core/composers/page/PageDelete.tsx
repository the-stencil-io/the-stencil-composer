import React from 'react';
import {
  makeStyles, createStyles, Theme, FormControl, Button,
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

const PageDelete: React.FC<{onClose: () => void, articleId: API.CMS.ArticleId }> = (props) => {
  const classes = useStyles();
  const ide = Ide.useIde();
  const { site } = ide.session;
  
  const [pageId, setPageId] = React.useState('');

  const handleDelete = () => {
    //const entity: API.CMS.PageMutator = { locale: newLocale, pageId, content: site.pages[pageId].body.content };
    ide.service.delete().page(pageId).then(success => {
      props.onClose();
      ide.actions.handleLoadSite();
    })
  }


  const articlePages: API.CMS.Page[] = Object.values(site.pages).filter(p => p.body.article === props.articleId);
  //const usedLocales: API.CMS.LocaleId[] = articlePages.map(articlePage => articlePage.body.locale)

  return (<>
    <Dialog open={true} onClose={props.onClose} >
      <DialogTitle><FormattedMessage id='pages.delete' /></DialogTitle>
      <DialogContent>
        <FormattedMessage id='pages.delete.message' />
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
      </DialogContent>

      <DialogActions>
        <Button variant="text" onClick={props.onClose} color="primary"><FormattedMessage id='button.cancel' /></Button>
        <Button variant="contained" onClick={handleDelete} color="primary" autoFocus disabled={!pageId}><FormattedMessage id='button.delete' /></Button>
      </DialogActions>
    </Dialog>
  </>
  );
}

export { PageDelete }