import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import { makeStyles, createStyles, Theme, Switch } from '@material-ui/core';
import { FormattedMessage } from 'react-intl';

import { API, Ide } from '../../deps';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    button: {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.background.paper,
      fontWeight: 'bold',
      "&:hover, &.Mui-focusVisible": {
        backgroundColor: theme.palette.error.dark,
        color: theme.palette.background.paper,
        fontWeight: 'bold'
      }
    },
    margin: {
      marginRight: theme.spacing(1)
    },
  }),
);


interface LocaleDisableProps {
  site: API.CMS.Site;
  locale: API.CMS.SiteLocale;
}

const LocaleDisable: React.FC<LocaleDisableProps> = ({ site, locale }) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const ide = Ide.useIde();

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
    const entity: API.CMS.LocaleMutator = { localeId: locale.id, value: locale.body.value, enabled: enabled };
    console.log("entity", entity)
    ide.service.update().locale(entity).then(success => {
      console.log(success)
      handleClose();
      ide.actions.handleLoadSite();
    });
  }

  return (
    <div className={classes.margin}>
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

      <Dialog
        open={open}
        onClose={handleClose}
      >
        <DialogTitle>{locale.body.enabled === true ? <FormattedMessage id="locale.disable.title" /> : <FormattedMessage id="locale.enable.title" />}</DialogTitle>
        <DialogContent>
          <DialogContentText >
            {locale.body.enabled ? <FormattedMessage id="locale.disable" /> : <FormattedMessage id="locale.enable" />}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant="text" onClick={handleClose} color="primary">
            <FormattedMessage id="button.cancel" />
          </Button>
          {locale.body.enabled ?
            (<Button variant="contained" onClick={() => handleEnable(false)} color="primary" autoFocus><FormattedMessage id="button.disable" /></Button>) :
            (<Button variant="contained" onClick={() => handleEnable(true)} color="primary" autoFocus><FormattedMessage id="button.enable" /></Button>)

          }

        </DialogActions>
      </Dialog>
    </div>
  );
}
export { LocaleDisable }
