import React from 'react';
import { Typography, Box } from '@mui/material';
import { FormattedMessage } from 'react-intl';
import MDEditor, { ICommand, getCommands } from '@uiw/react-md-editor';
import { Composer, StencilClient } from '../context';

import StencilStyles from '../styles';



interface TemplateComposerProps {
  onClose: () => void
}

const TemplateComposer: React.FC<TemplateComposerProps> = ({ onClose }) => {
  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [content, setContent] = React.useState('');
  const handleCreate = () => {
    return null;
  }
  const handleChange = (value: string | undefined) => {
    setContent(value ? value : '' ) 
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


        <Box display="flex" flexDirection="row" flexWrap="wrap" sx={{mt: 2}}>
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