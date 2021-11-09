import React from 'react';
import { createStyles, makeStyles } from '@mui/styles';
import { styled } from "@mui/material/styles";
import { Theme, useTheme, Button, Dialog, DialogTitle, DialogContent, DialogActions, ButtonGroup } from '@mui/material';
import { Palette } from '@mui/material/styles';
import { FormattedMessage } from 'react-intl';


import { Composer, StencilClient } from '../context';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    title: {
      backgroundColor: theme.palette.workflow.main,
      color: theme.palette.secondary.contrastText,
    },
    select: {
      marginTop: theme.spacing(2),
      color: theme.palette.primary.contrastText,
      backgroundColor: theme.palette.background.paper
    },
  }),
);

const StyledDialogButton = styled(Button)(() => ({
  fontWeight: 'bold',
  "&:hover, &.Mui-focusVisible": {
    fontWeight: 'bold',
  }
}));

const StyledDialogTitle = styled(DialogTitle)(({theme}) => ({
  color: theme.palette.secondary.contrastText,
}));

const StyledDialog: React.FC<{
  title: string;
  onClose: () => void;
  submit: {
    title: string;
    disabled: boolean;
    onClick: () => void;
  };
  open: boolean;
  color: string;
  children: React.ReactElement;

}> = (props) => {
  
  return (
    <Dialog open={props.open} onClose={props.onClose}>
      <StyledDialogTitle sx={{backgroundColor: props.color}}><FormattedMessage id={props.title} /></StyledDialogTitle>
      <DialogContent>{props.children}</DialogContent>
      <DialogActions>
        <ButtonGroup variant="text" sx={{color: props.color}}>
          <StyledDialogButton onClick={props.onClose} color="inherit"><FormattedMessage id='button.cancel' /></StyledDialogButton>
          <StyledDialogButton onClick={props.submit.onClick} autoFocus disabled={props.submit.disabled} color="inherit">
            <FormattedMessage id={props.submit.title} />
          </StyledDialogButton>
        </ButtonGroup>
      </DialogActions>
    </Dialog>
  );
}

export { StyledDialog }