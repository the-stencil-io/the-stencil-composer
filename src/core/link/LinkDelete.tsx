
import React from 'react';
import { DialogContentText } from '@mui/material';
import { FormattedMessage } from 'react-intl';

import { Composer, StencilClient } from '../context';
import StencilStyles from '../styles';


interface LinkDeleteProps {
  linkId: StencilClient.LinkId,
  open: boolean,
  onClose: () => void,
}

const LinkDelete: React.FC<LinkDeleteProps> = ({ linkId, onClose }) => {
  const { service, actions } = Composer.useComposer();

  const handleDelete = () => {
    service.delete().link(linkId).then(success => {
      console.log(success)
      onClose();
      actions.handleLoadSite();
    })
  }

  return (
    <StencilStyles.Dialog open={true} onClose={onClose} 
      color="article.main" title="article.composer.title"
      submit={{ title: "article.create", onClick: handleDelete, disabled: false }}>
      <DialogContentText>
        <FormattedMessage id="link.delete" />
      </DialogContentText>
    </StencilStyles.Dialog>
  );
}
export { LinkDelete }
