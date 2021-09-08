import React from 'react';
import {
  makeStyles, createStyles, Theme, TextField, InputLabel, FormControl, ButtonGroup,
  MenuItem, Select, Button, Dialog, DialogTitle, DialogContent, DialogActions,
} from '@material-ui/core';
import { FormattedMessage } from 'react-intl';

import { API, Ide } from '../../deps';


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    select: {
      padding: theme.spacing(1),
      marginTop: theme.spacing(3),
      color: theme.palette.primary.contrastText,
      backgroundColor: theme.palette.background.paper
    },
    formControl: {
      padding: theme.spacing(1),
      backgroundColor: theme.palette.background.paper
    },
    title: {
      backgroundColor: theme.palette.link.main,
      color: theme.palette.link.contrastText,
      fontWeight: 900
    },
    button: {
      fontWeight: 'bold',
      "&:hover, &.Mui-focusVisible": {
        color: theme.palette.link.main,
        fontWeight: 'bold',
      }
    },
    buttonGroup: {
      color: theme.palette.link.main
    },
  }),
);


const LinkComposer: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const classes = useStyles();
  const ide = Ide.useIde();
  const { site } = ide.session;

  const [type, setType] = React.useState<'internal' | 'external'>('internal');
  const [value, setValue] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [locale, setLocale] = React.useState('fi');

  const handleCreate = () => {
    const entity: API.CMS.CreateLink = { type, value, description, locale };
    ide.service.create().link(entity).then(success => {
      console.log(success)
      onClose();
      ide.actions.handleLoadSite();
    })
  }

  const locales: API.CMS.SiteLocale[] = Object.values(site.locales);

  return (
    <Dialog open={true} onClose={onClose} >
      <DialogTitle className={classes.title}><FormattedMessage id='link.composer.title' /></DialogTitle>

      <DialogContent>
        <FormControl variant="outlined" className={classes.select} fullWidth>
          <InputLabel><FormattedMessage id='link.type' /></InputLabel>
          <Select
            value={type}
            onChange={({ target }) => setType(target.value as any)}
            label={<FormattedMessage id='link.type' />}>
            <MenuItem value="internal"><FormattedMessage id='link.type.internal' /></MenuItem>
            <MenuItem value="external"><FormattedMessage id='link.type.external' /></MenuItem>
            <MenuItem value="phone"><FormattedMessage id='link.type.phone' /></MenuItem>
          </Select>
        </FormControl >
        <FormControl variant="outlined" className={classes.select} fullWidth>
          <InputLabel><FormattedMessage id='locale' /></InputLabel>
          <Select
            value={locale}
            onChange={({ target }) => setLocale(target.value as any)}
            label={<FormattedMessage id='locale' />}
          >
            {locales.map((locale, index) => (
              <MenuItem key={index} value={locale.body.value}>{locale.body.value}</MenuItem>
            ))}
            <MenuItem value={""}><FormattedMessage id='link.locale.all' /></MenuItem>

          </Select>
        </FormControl >

        <TextField className={classes.formControl}
          fullWidth
          required
          label={<FormattedMessage id='link.composer.descriptionlabel' />}
          helperText={<FormattedMessage id='link.composer.descriptionhelper' />}
          variant="outlined"
          value={description}
          onChange={({ target }) => setDescription(target.value)} />

        <TextField className={classes.formControl}
          fullWidth
          required
          label={<FormattedMessage id='value' />}
          helperText={<FormattedMessage id='link.composer.valuehelper' />}
          variant="outlined"
          value={value}
          onChange={({ target }) => setValue(target.value)} />


      </DialogContent>
      <DialogActions>
        <ButtonGroup variant="text" className={classes.buttonGroup}>
          <Button onClick={onClose} className={classes.button}><FormattedMessage id='button.cancel' /></Button>
          <Button onClick={handleCreate} className={classes.button} autoFocus disabled={!value || !locale || !description}><FormattedMessage id='button.create' /></Button>
        </ButtonGroup>
      </DialogActions>
    </Dialog>
  );
}

export { LinkComposer }