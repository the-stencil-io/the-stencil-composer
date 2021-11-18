import React from 'react';
import { Typography } from '@mui/material';
import { FormattedMessage, useIntl } from 'react-intl';

import StencilStyles from '../styles';





const TemplateComposer: React.FC<{ onClose: () => void }> = ({ onClose }) => {

  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");

  const handleCreate = () => {
    return null;
  }

  return (
    <StencilStyles.Dialog open={true} onClose={onClose}
      title={"templates.create"}
      backgroundColor={"uiElements.main"}
      submit={{ title: "button.add", disabled: !name, onClick: handleCreate }}
    >
      <>
        <Typography variant="body2" ><FormattedMessage id={"templates.description"} /></Typography>

        <StencilStyles.TextField label='templates.name' helperText='templates.name.desc'
          value={name}
          onChange={setName} />

        <StencilStyles.TextField label='templates.desc' helperText='templates.description.desc'
          value={description}
          onChange={setDescription} />
      </>
    </StencilStyles.Dialog >
  );
}

export { TemplateComposer }