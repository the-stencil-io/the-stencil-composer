import React from 'react';
import {
  makeStyles, createStyles, Theme, TextField, InputLabel, FormControl, MenuItem, Select,
  Button, Dialog, Typography, DialogTitle, DialogContent, DialogActions,
} from '@material-ui/core';
import { FormattedMessage } from 'react-intl';

import { API, Ide } from '../../deps';



const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    select: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.background.paper
    },
    heading: {
      fontWeight: 'bold',
    },
  }),
);

interface WorkflowEditProps {
  workflow: API.CMS.Workflow,
  onClose: () => void,
}

const WorkflowEdit: React.FC<WorkflowEditProps> = ({ onClose, workflow }) => {
  const classes = useStyles();
  const ide = Ide.useIde();
  const { site } = ide.session;

  const [open, setOpen] = React.useState(false);
  const [locale, setLocale] = React.useState('');
  const [content, setContent] = React.useState(workflow.body.content);
  const [name, setName] = React.useState(workflow.body.name);

  const handleClose = () => {
    setOpen(false);
  };

  const handleCreate = () => {
    const entity: API.CMS.WorkflowMutator = {  workflowId: workflow.id, locale, name, content, articles: workflow.body.articles };
    ide.service.update().workflow(entity).then(success => {
      console.log(success)
      onClose();
      ide.actions.handleLoadSite();
    })
  }


  const workflows: API.CMS.Workflow[] = Object.values(site.workflows);
  const locales: API.CMS.SiteLocale[] = Object.values(site.locales);

  return (
    <Dialog open={true} onClose={handleClose} >
      <DialogTitle><FormattedMessage id='workflow.edit.title' /></DialogTitle>
      <DialogContent>

        <Typography className={classes.heading}>
          <FormControl variant="outlined" className={classes.select} fullWidth>
            <InputLabel><FormattedMessage id='locale' /></InputLabel>
            <Select
              onChange={({ target }) => setLocale(target.value as any)}
              value={locale}
              label={<FormattedMessage id='locale' />}
            >
              {locales.map((locale, index) => (
                <MenuItem key={index} value={locale.body.value}>{locale.body.value}</MenuItem>
              ))}
            </Select>

          </FormControl>
          <FormControl variant="outlined" className={classes.select} fullWidth>
            <InputLabel><FormattedMessage id='workflow.composer.select' /></InputLabel>
            <Select
              onChange={({ target }) => setContent(target.value as any)}
              value={content}
              label={<FormattedMessage id='workflow.composer.technicalname' />}
            >
              {workflows.map((workflow, index) => (
                <MenuItem key={index} value={workflow.body.name}>{workflow.body.name}</MenuItem>
              ))}
            </Select>

          </FormControl>
          <TextField className={classes.select}
            label={<FormattedMessage id='workflow.composer.name' />}
            helperText={<FormattedMessage id='workflow.composer.helper' />}
            variant="outlined" 
            fullWidth
            value={name}
            onChange={({ target }) => setName(target.value)} />
        </Typography>
      </DialogContent>
      
      <DialogActions>
        <Button variant="text" onClick={onClose} color="primary"><FormattedMessage id='button.cancel' /></Button>
        <Button variant="contained" onClick={handleCreate} color="primary" autoFocus disabled={!name}><FormattedMessage id='button.add' /></Button>
      </DialogActions>
    </Dialog>
  );

}

export { WorkflowEdit }