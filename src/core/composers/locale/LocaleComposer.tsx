import React from 'react';
import {
  makeStyles, createStyles, Theme, TextField,
  Button, Dialog, Typography, DialogTitle, DialogContent, DialogActions,
} from '@material-ui/core';
import { FormattedMessage } from 'react-intl';

import { API, Ide } from '../../deps';


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      fontWeight: 'bold',
    },
    input: {
      margin: theme.spacing(1),
      padding: 0,
      backgroundColor: theme.palette.background.paper
    },
  }),
);


const LocaleComposer: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const classes = useStyles();
  const ide = Ide.useIde();
  const { site } = ide.session;

  const [locale, setLocale] = React.useState("");

  const handleCreate = () => {
    const entity: API.CMS.CreateLocale = { locale };
    console.log("entity", entity)
    ide.service.create().locale(entity).then(success => {
      console.log(success)
      onClose();
      ide.actions.handleLoadSite();
    });
  }


  const locales: API.CMS.Locale[] = Object.values(site.locales).map(l => l.body.value);

  return (
    <Dialog open={true} onClose={onClose} >
      <DialogTitle><FormattedMessage id='locale.composer.title'/></DialogTitle>
      <DialogContent>

        <Typography className={classes.root}>
          <TextField 
            className={classes.input} 
            helperText={<FormattedMessage id='locale.composer.helper' />}
            placeholder="en" 
            variant="outlined" 
            fullWidth 
            required
            value={locale}
            onChange={({ target }) => setLocale(target.value as any)} />
        </Typography>

      </DialogContent>
      <DialogActions>
        <Button variant="text" onClick={onClose} color="primary"><FormattedMessage id='button.cancel' /></Button>
        <Button variant="contained" onClick={handleCreate} color="primary" autoFocus disabled={!locale || locales.includes(locale) || locale.length !== 2}><FormattedMessage id='button.create' /></Button>
      </DialogActions>
    </Dialog>
  );
}

export { LocaleComposer }

