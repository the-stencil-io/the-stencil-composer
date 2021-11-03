import React from 'react';
import { createStyles, makeStyles } from '@mui/styles';
import {
  Theme, FormControl, Button, ButtonGroup,
  Dialog, DialogTitle, DialogContent, DialogActions, MenuItem, Select
} from '@mui/material';
import { FormattedMessage } from 'react-intl';

import { Composer, StencilClient } from '../context';


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    title: {
      backgroundColor: theme.palette.page.main,
      color: theme.palette.page.contrastText,
      marginBottom: theme.spacing(2)
    },
    select: {
     padding: theme.spacing(1),
      marginTop: theme.spacing(1),
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

const PageDelete: React.FC<{ onClose: () => void, articleId: StencilClient.ArticleId }> = (props) => {
  const classes = useStyles();
  const {service, actions, site} = Composer.useComposer();

  const [pageId, setPageId] = React.useState('');

  const handleDelete = () => {
    //const entity: StencilClient.PageMutator = { locale: newLocale, pageId, content: site.pages[pageId].body.content };
    service.delete().page(pageId).then(success => {
      props.onClose();
      actions.handleLoadSite();
    })
  }


  const articlePages: StencilClient.Page[] = Object.values(site.pages).filter(p => p.body.article === props.articleId);
  //const usedLocales: StencilClient.LocaleId[] = articlePages.map(articlePage => articlePage.body.locale)

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