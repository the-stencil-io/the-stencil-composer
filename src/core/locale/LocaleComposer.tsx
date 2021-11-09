import React from 'react';
import { TextField } from '@mui/material';
import { FormattedMessage } from 'react-intl';

import { Composer, StencilClient } from '../context';
import { StyledDialog } from '../styles/StyledDialog';


const LocaleComposer: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const { service, actions, site } = Composer.useComposer();
  const [locale, setLocale] = React.useState("");

  const handleCreate = () => {
    const entity: StencilClient.CreateLocale = { locale };
    console.log("entity", entity)
    service.create().locale(entity).then(success => {
      console.log(success)
      onClose();
      actions.handleLoadSite();
    });
  }
  const locales: StencilClient.Locale[] = Object.values(site.locales).map(l => l.body.value);
  return (
    <StyledDialog open={true} onClose={onClose}
      color="locale.main" title="locale.composer.title"
      submit={{ title: "button.create", onClick: handleCreate, disabled: !locale || locales.includes(locale) || locale.length !== 2 }}>
      <>
        <TextField
          value={locale}
          onChange={({ target }) => setLocale(target.value as any)}
          helperText={<FormattedMessage id='locale.composer.helper' />}
          placeholder="en"
          variant="outlined"
          fullWidth
          required
        />
      </>
    </StyledDialog>
  );
}

export { LocaleComposer }

