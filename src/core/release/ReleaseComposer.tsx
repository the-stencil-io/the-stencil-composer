import React from 'react';

import { Composer, StencilClient } from '../context';
import StencilStyles from '../styles';



const ReleaseComposer: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const { service, actions } = Composer.useComposer();

  const [name, setName] = React.useState('');
  const [note, setNote] = React.useState('');
  const created = new Date().toISOString();

  const handleCreate = () => {
    const entity: StencilClient.CreateRelease = { name, note, created };
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
      </>
    </StencilStyles.Dialog>
  );
}

export { ReleaseComposer }