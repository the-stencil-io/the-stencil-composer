import React from 'react';
import {
  makeStyles, createStyles, Theme, FormControl, Button, ButtonGroup,
  Dialog, DialogTitle, DialogContent, DialogActions, MenuItem, Select
} from '@mui/material';
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
    delete: {
      color: theme.palette.error.main,
      fontWeight: 'bold'
    }
  }),
);

const PageDelete: React.FC<{ onClose: () => void, articleId: API.CMS.ArticleId }> = (props) => {
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
      <DialogTitle className={classes.title}><FormattedMessage id='pages.delete' /></DialogTitle>
      <DialogContent>
        <FormattedMessage id='pages.delete.message' />
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
      </DialogContent>

      <DialogActions>
        <ButtonGroup variant="text">
          <Button onClick={props.onClose} className={classes.button}><FormattedMessage id='button.cancel' /></Button>
          <Button onClick={handleDelete} autoFocus disabled={!pageId} className={classes.delete}><FormattedMessage id='button.delete' /></Button>
        </ButtonGroup>
      </DialogActions>
    </Dialog>
  </>
  );
}

export { PageDelete }