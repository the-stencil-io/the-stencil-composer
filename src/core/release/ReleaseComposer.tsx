import React from 'react';
import { createStyles, makeStyles } from '@mui/styles';
import {
  Theme, TextField,
  Button, Dialog, ButtonGroup, DialogTitle, DialogContent, DialogActions,
} from '@mui/material';
import { FormattedMessage } from 'react-intl';


import { Composer, StencilClient } from '../context';
import { StyledDialog } from '../styles/StyledDialog';


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    spacing: {
      marginTop: theme.spacing(3)
    }
  }),
);

const ReleaseComposer: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const classes = useStyles();
  const { service, actions, session } = Composer.useComposer();

  const [name, setName] = React.useState('');
  const [note, setNote] = React.useState('');

  const handleCreate = () => {
    const entity: StencilClient.CreateRelease = { name, note };
    service.create().release(entity).then(success => {
      console.log(success)
      onClose();
      actions.handleLoadSite();
    })
  }
  return (
    <StyledDialog open={true} onClose={onClose}
      color="release.main" title="release.composer.title"
      submit={{ title: "button.create", onClick: handleCreate, disabled: !name }}>
      <>
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
      </>
    </StyledDialog>
  );
}

export { ReleaseComposer }