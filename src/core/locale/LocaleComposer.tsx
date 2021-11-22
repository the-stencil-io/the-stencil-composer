import React from 'react';

import { Composer, StencilClient } from '../context';
import StencilStyles from '../styles';


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
    <StencilStyles.Dialog open={true} onClose={onClose}
      backgroundColor="uiElements.main"
      title="locale.composer.title"
      submit={{ title: "button.create", onClick: handleCreate, disabled: !locale || locales.includes(locale) || locale.length !== 2 }}>

      <StencilStyles.TextField label='locale.composer.placeholder' helperText='locale.composer.helper' placeholder="en"
        required
        value={locale}
        onChange={setLocale}
      />
    </StencilStyles.Dialog>
  );
}

export { LocaleComposer }

