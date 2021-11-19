import React from 'react';


import { FormattedMessage } from 'react-intl';
import StencilStyles from '../styles';


const handleDelete = () => {
  return null;
}


const TemplateDelete: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  return (
    <StencilStyles.Dialog onClose={onClose} open={true}
      title={"template.delete"}
      backgroundColor="uiElements.main"
      submit={{ title: 'button.delete', disabled: true, onClick: handleDelete, }}
    >
      <>
        <FormattedMessage id='template.delete.message' />
      </>
    </StencilStyles.Dialog>
  );
}

export { TemplateDelete }