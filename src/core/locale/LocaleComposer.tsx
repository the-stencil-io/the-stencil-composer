import React from 'react';
import { createStyles, makeStyles } from '@mui/styles';
import {
  Theme, TextField, ButtonGroup,
  Button, Dialog, DialogTitle, DialogContent, DialogActions,
} from '@mui/material';
import { FormattedMessage } from 'react-intl';

import { Composer, StencilClient } from '../context';


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    title: {
      backgroundColor: theme.palette.locale.main,
      color: theme.palette.secondary.contrastText,
      marginBottom: theme.spacing(2)
    },
    button: {
      fontWeight: 'bold',
      "&:hover, &.Mui-focusVisible": {
        color: theme.palette.locale.main,
        fontWeight: 'bold',
      }
    },
    buttonGroup: {
      color: theme.palette.locale.main
    },
  }),
);


const LocaleComposer: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const classes = useStyles();
  const {service, actions, site} = Composer.useComposer();

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
    <Dialog open={true} onClose={onClose} >
      <DialogTitle className={classes.title}><FormattedMessage id='locale.composer.title' /></DialogTitle>
      <DialogContent>
        <TextField
          value={locale}
          onChange={({ target }) => setLocale(target.value as any)}
          helperText={<FormattedMessage id='locale.composer.helper' />}
          placeholder="en"
          variant="outlined"
          fullWidth
          required
        />

      </DialogContent>
      <DialogActions>
        <ButtonGroup variant="text" className={classes.buttonGroup}>
          <Button onClick={onClose} className={classes.button}><FormattedMessage id='button.cancel' /></Button>
          <Button onClick={handleCreate} className={classes.button} autoFocus disabled={!locale || locales.includes(locale) || locale.length !== 2}><FormattedMessage id='button.create' /></Button>
        </ButtonGroup>
      </DialogActions>
    </Dialog>
  );
}

export { LocaleComposer }

