import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import { FormattedMessage } from 'react-intl';

import { API, Ide } from '../../deps';

interface ArticleDeleteProps {
  articleId: API.CMS.ArticleId;
  onClose: () => void;
}

const ArticleDelete: React.FC<ArticleDeleteProps> = ({ articleId, onClose }) => {
  const ide = Ide.useIde();

  const handleDelete = () => {
    ide.service.delete().article(articleId).then(_success => {
      onClose();
      ide.actions.handleLoadSite();
    });
  }

  return (
    <Dialog open={true} onClose={onClose}>
      <DialogTitle><FormattedMessage id="article.delete.title" /></DialogTitle>
      <DialogContent>
        <DialogContentText>
          <FormattedMessage id="article.delete" />
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button variant="text" onClick={onClose} color="primary">
          <FormattedMessage id="button.cancel" />
        </Button>
        <Button variant="contained" onClick={handleDelete} color="primary" autoFocus>
          <FormattedMessage id="button.delete" />
        </Button>
      </DialogActions>
    </Dialog>);
}
export { ArticleDelete }
