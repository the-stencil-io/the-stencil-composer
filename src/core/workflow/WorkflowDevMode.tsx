import React from 'react';
import { createStyles, makeStyles } from '@mui/styles';
import { Theme, FormHelperText, Switch, FormControlLabel, Typography, Paper } from '@mui/material';

import { FormattedMessage } from 'react-intl';
import WorkflowDevModeIcon from './WorkflowDevModeIcon';


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    devMode: {
      marginTop: theme.spacing(2),
      padding: theme.spacing(1),
      borderRadius: 3,
    },
  }),
);

const WorkflowDevMode: React.FC<{}> = () => {
  const classes = useStyles();

  return (
    <Paper variant="elevation" elevation={5} className={classes.devMode}>
      <Typography variant="h5">
        <WorkflowDevModeIcon />{" "}
        <FormattedMessage id="workflow.devmode" />
      </Typography>
      
      <FormControlLabel control={<Switch defaultChecked />} sx={{ mt: 3 }}
        label={<FormattedMessage id="workflow.devmode" />} />
      <FormHelperText>
        <FormattedMessage id="workflow.devmode.helper" />
      </FormHelperText>
    </Paper>
  );
}

export default WorkflowDevMode;