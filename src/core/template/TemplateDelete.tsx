import React from 'react';

import { FormattedMessage } from 'react-intl';
import { useSnackbar } from 'notistack';

import { Composer, StencilClient } from '../context';
import StencilStyles from '../styles';


interface TemplateDeleteProps {
  templateId: StencilClient.TemplateId;
  onClose: () => void;
}


const TemplateDelete: React.FC<TemplateDeleteProps> = ({ templateId, onClose }) => {
  const { enqueueSnackbar } = useSnackbar();
  const { service, actions } = Composer.useComposer();

  const handleDelete = () => {
    service.delete().template(templateId).then(success => {
      enqueueSnackbar(message, { variant: 'warning' });
      console.log(success)
      onClose();
      actions.handleLoadSite();
    })
    return null;
  }

  const message = <FormattedMessage id="snack.template.deletedMessage" />


  return (
    <StencilStyles.Dialog onClose={onClose} open={true}
      title={"template.delete"}
      backgroundColor="uiElements.main"
      submit={{ title: 'button.delete', disabled: false, onClick: handleDelete, }}
    >
      <>
        <FormattedMessage id='template.delete.message' />
      </>
    </StencilStyles.Dialog>
  );
}

export { TemplateDelete }