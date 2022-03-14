import React from 'react';
import { useSnackbar } from 'notistack';
import { FormattedMessage } from 'react-intl';

import StencilStyles from '../styles';
import { Composer } from '../context';

const MigrationComposer: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const { enqueueSnackbar } = useSnackbar();
  const [file, setFile] = React.useState<string | undefined>();
  const [loading, setLoading] = React.useState<boolean | undefined>();
  const { service, actions } = Composer.useComposer();

  const handleCreate = () => {
    if (!file) {
      return;
    }
    setLoading(true);
    service.create().importData(file)
      .then(() => actions.handleLoadSite())
      .then(() => {
        setLoading(false);
        setFile(undefined);
        onClose();
      });
    enqueueSnackbar(message, { variant: 'success' });
  }

  const message = <FormattedMessage id="snack.migration.createdMessage" />
  


  
  return (
    <StencilStyles.Dialog open={true} onClose={onClose}
      backgroundColor="uiElements.main" title="toolbar.import"
      submit={{ title: "imports.import.action", onClick: handleCreate, disabled: loading || !file }}>
      <>
        <div>{file}</div>
        <StencilStyles.FileField value='' onChange={setFile} label="imports.select" />

      </>
    </StencilStyles.Dialog>


  );
}

export { MigrationComposer };
