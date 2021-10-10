import React from 'react';
import { createStyles, makeStyles } from '@mui/styles';
import {
  Theme, TextField,
  Button, Dialog, ButtonGroup, DialogTitle, DialogContent, DialogActions,
} from '@mui/material';
import { FormattedMessage } from 'react-intl';

import { API, Ide } from '../../deps';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    title: {
      backgroundColor: theme.palette.release.main,
      color: theme.palette.secondary.contrastText,
    },
    button: {
      fontWeight: 'bold',
      "&:hover, &.Mui-focusVisible": {
        color: theme.palette.release.main,
        fontWeight: 'bold',
      }
    },
    buttonGroup: {
      color: theme.palette.release.main
    },
    spacing: {
      marginTop: theme.spacing(3)
    }
  }),
);

const ReleaseComposer: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const classes = useStyles();
  const ide = Ide.useIde();

  const [name, setName] = React.useState('');
  const [note, setNote] = React.useState('');

  const handleCreate = () => {
    const entity: API.CMS.CreateRelease = { name, note };
    ide.service.create().release(entity).then(success => {
      console.log(success)
      onClose();
      ide.actions.handleLoadSite();
    })
  }
  return (
    <Dialog open={true} onClose={onClose} >
      <DialogTitle className={classes.title}><FormattedMessage id='release.composer.title' /></DialogTitle>
      <DialogContent>
        <TextField
          className={classes.spacing}
          fullWidth
          label={<FormattedMessage id='release.composer.label' />}
          variant="outlined"
          onChange={({ target }) => setName(target.value as any)}
        />
        <TextField
          className={classes.spacing}
          fullWidth
          label={<FormattedMessage id='release.composer.note' />}
          helperText={<FormattedMessage id='release.composer.helper' />}
          variant="outlined"
          onChange={({ target }) => setNote(target.value as any)} />
        <TextField
          className={classes.spacing}
          disabled
          label={<FormattedMessage id='date' />}
          defaultValue={new Date().toISOString()}
          variant="outlined"
          fullWidth />

      </DialogContent>
      <DialogActions>
      <ButtonGroup variant="text" className={classes.buttonGroup}>
        <Button onClick={onClose} className={classes.button}><FormattedMessage id='button.cancel' /></Button>
        <Button onClick={handleCreate} className={classes.button} disabled={!name}><FormattedMessage id='button.create' /></Button>
      </ButtonGroup>
      </DialogActions>
    </Dialog>
  );
}

export { ReleaseComposer }