import React from 'react';

import { Composer, StencilClient } from '../context';
import StencilStyles from '../styles';



const ReleaseComposer: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const { service, actions, session } = Composer.useComposer();

  const [name, setName] = React.useState('');
  const [note, setNote] = React.useState('');

  const handleCreate = () => {
    const entity: StencilClient.CreateRelease = { name, note };
    service.create().release(entity).then(success => {
      console.log(success)
      onClose();
      actions.handleLoadSite();
    })
  }
  return (
    <StencilStyles.Dialog open={true} onClose={onClose}
      backgroundColor="uiElements.main"
      title="release.composer.title"
      submit={{ title: "button.create", onClick: handleCreate, disabled: !name }}>
      <>
        <StencilStyles.TextField label='release.composer.label' onChange={setName} value={name} />
        <StencilStyles.TextField label='release.composer.note' helperText='release.composer.helper' onChange={setNote} value={note} />
        <StencilStyles.TextField disabled label='date' value={new Date().toISOString()} onChange={() => { }} />
      </>
    </StencilStyles.Dialog>
  );
}

export { ReleaseComposer }