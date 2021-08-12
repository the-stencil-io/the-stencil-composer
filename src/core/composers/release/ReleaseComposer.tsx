import React from 'react';
import {
  makeStyles, createStyles, Theme, TextField,
  Button, Dialog, Typography, DialogTitle, DialogContent, DialogActions,
} from '@material-ui/core';
import { FormattedMessage } from 'react-intl';

import { API, Ide } from '../../deps';


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formControl: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.background.paper
    },
    heading: {
      fontWeight: 'bold',
    },
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
      <DialogTitle><FormattedMessage id='release.composer.title' /></DialogTitle>
      <DialogContent>

        <Typography className={classes.heading}>
          <TextField
            className={classes.formControl}
            fullWidth
            id="outlined-basic"
            label={<FormattedMessage id='release.composer.label' />}
            variant="outlined"
            onChange={({ target }) => setName(target.value as any)}
          />
          <TextField
            className={classes.formControl}
            fullWidth
            id="outlined-basic"
            label={<FormattedMessage id='release.composer.note' />}
            helperText={<FormattedMessage id='release.composer.helper' />}
            variant="outlined"
            onChange={({ target }) => setNote(target.value as any)} />
          <TextField
            className={classes.formControl}
            disabled
            id="outlined-basic"
            label={<FormattedMessage id='date' />}
            defaultValue={new Date().toISOString()}
            variant="outlined"
            fullWidth />
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button variant="text" onClick={onClose} color="primary"><FormattedMessage id='button.cancel' /></Button>
        <Button variant="contained" onClick={handleCreate} color="primary" autoFocus disabled={!name}><FormattedMessage id='button.create' /></Button>
      </DialogActions>
    </Dialog>
  );
}

export { ReleaseComposer }