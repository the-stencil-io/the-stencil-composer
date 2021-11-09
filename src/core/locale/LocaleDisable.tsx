import React from 'react';


import { Box, Switch, DialogContentText } from '@mui/material';
import { FormattedMessage } from 'react-intl';

import { Composer, StencilClient } from '../context';
import { StyledDialog } from '../styles/StyledDialog';


interface LocaleDisableProps {
  site: StencilClient.Site;
  locale: StencilClient.SiteLocale;
}

const LocaleDisable: React.FC<LocaleDisableProps> = ({ locale }) => {

  const [open, setOpen] = React.useState(false);

  const { service, actions } = Composer.useComposer();

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const [state, setState] = React.useState({
    checkedA: true,
    checkedB: false,
  });

  const handleChange = (event: any) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };


  const handleEnable = (enabled: boolean) => {
    const entity: StencilClient.LocaleMutator = { localeId: locale.id, value: locale.body.value, enabled: enabled };
    console.log("entity", entity)
    service.update().locale(entity).then(success => {
      console.log(success)
      handleClose();
      actions.handleLoadSite();
    });
  }

  return (
    <Box sx={{ mr: 1 }}>
      {locale.body.enabled === true ?
        <Switch
          onClick={handleClickOpen}
          checked={state.checkedA}
          onChange={handleChange}
        />
        : <Switch
          onClick={handleClickOpen}
          checked={state.checkedB}
          onChange={handleChange} />}

      <StyledDialog open={open} onClose={handleClose}
        color="locale.main" title={locale.body.enabled === true ? "locale.disable.title" : "locale.enable.title"}
        submit={{
          title: locale.body.enabled ? "button.disable" : "button.enable",
          onClick: locale.body.enabled ? () => handleEnable(false) : () => handleEnable(true),
          disabled: false
        }}>

        <DialogContentText>
          {locale.body.enabled ? <FormattedMessage id="locale.disable" /> : <FormattedMessage id="locale.enable" />}
        </DialogContentText>

      </StyledDialog>
    </Box>
  );
}
export { LocaleDisable }
