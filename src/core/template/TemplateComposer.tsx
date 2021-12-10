import React from 'react';
import { Typography, Box } from '@mui/material';
import { FormattedMessage } from 'react-intl';
import MDEditor, { ICommand, getCommands } from '@uiw/react-md-editor';

import StencilStyles from '../styles';
import { Composer, StencilClient } from '../context';



interface TemplateComposerProps {
  onClose: () => void;
}

const TemplateComposer: React.FC<TemplateComposerProps> = ({ onClose }) => {
  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [content, setContent] = React.useState('');
  const [type, setType] = React.useState<StencilClient.TemplateType>('PAGE');
  const { service, actions, site, session } = Composer.useComposer();

  const handleCreate = () => {
    const entity: StencilClient.CreateTemplate = {content, description, name, type
 };
    service.create().template(entity).then(success => {
      console.log(success, entity);
      onClose();
      actions.handleLoadSite();
    })
  }
  const handleChange = (value: string | undefined) => {
    setContent(value ? value : '')
  }

  return (
    <StencilStyles.Dialog open={true} onClose={onClose}
      title={"templates.create"}
      backgroundColor={"uiElements.main"}
      submit={{ title: "button.add", disabled: !name || !content, onClick: handleCreate }}
    >

      <>
        <Typography variant="body2" ><FormattedMessage id={"templates.description"} /></Typography>

        <StencilStyles.TextField label='templates.name' helperText='templates.name.desc'
          value={name}
          onChange={setName} />

        <StencilStyles.TextField label='templates.desc' helperText='templates.description.desc'
          value={description}
          onChange={setDescription} />

        <Typography variant="body2" sx={{ mt: 2, fontWeight: 'bold' }}><FormattedMessage id={"templates.intro"} /></Typography>

        <Box display="flex" flexDirection="row" flexWrap="wrap" sx={{ mt: 2 }}>
          <Box flex="1" sx={{ paddingRight: 1 }}>
            <MDEditor key={1} value={content} onChange={handleChange}
              textareaProps={{ placeholder: '# Title' }}
              height={300}
            />
          </Box>
        </Box>
      </>
    </StencilStyles.Dialog >
  );
}

export { TemplateComposer }