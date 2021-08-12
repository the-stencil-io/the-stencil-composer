import React from 'react';
import {
  Button, Dialog, Typography, DialogTitle, DialogContent, DialogActions
} from '@material-ui/core';
import { FormattedMessage } from 'react-intl';

import { API, Ide } from '../../deps';

const NewArticlePage: React.FC<{
  article: API.CMS.Article,
  locale: API.CMS.SiteLocale,
  onClose: () => void,
  onCreate: (page: API.CMS.Page) => void
}> = ({ article, locale, onClose, onCreate }) => {
  
  const ide = Ide.useIde();

  const handleCreate = () => {
    const entity: API.CMS.CreatePage = { articleId: article.id, locale: locale.id };
    ide.service.create().page(entity)
    .then(success => ide.actions.handleLoadSite().then(() => success))
    .then(success => {
      onCreate(success);
      onClose();
    })
  }

  return (
    <Dialog open={true} onClose={onClose} >
      <DialogTitle><FormattedMessage id='newpage.title' /></DialogTitle>
      <DialogContent>
        <Typography>
          <FormattedMessage id='newpage.article.info' values={{article: article.body.name, locale: locale.body.value}}/>
        </Typography>
      </DialogContent>
      
      <DialogActions>
        <Button variant="text" onClick={onClose} color="primary"><FormattedMessage id='button.cancel' /></Button>
        <Button variant="contained" onClick={handleCreate} color="primary" autoFocus disabled={!locale}><FormattedMessage id='button.create' /></Button>
      </DialogActions>
    </Dialog>
  );
}

export { NewArticlePage }