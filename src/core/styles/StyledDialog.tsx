import React from 'react';
import { styled } from "@mui/material/styles";
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, ButtonGroup } from '@mui/material';
import { FormattedMessage } from 'react-intl';
import StencilStyles from '../styles';


const StyledDialogButton = styled(Button)(() => ({
  fontWeight: 'bold',
  "&:hover, &.Mui-focusVisible": {
    fontWeight: 'bold',
  },
}));

const StyledDialogTitle = styled(DialogTitle)(({ theme }) => ({
  color: theme.palette.secondary.contrastText
}));


interface StyledDialogProps {
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
}

const StyledDialog: React.FC<StyledDialogProps> = (props) => {

  return (
    <Dialog open={props.open} onClose={props.onClose} fullWidth maxWidth="md">
      <StyledDialogTitle sx={{ backgroundColor: props.color }}><FormattedMessage id={props.title} /></StyledDialogTitle>
      <DialogContent>{props.children}</DialogContent>
      <DialogActions>
        <ButtonGroup variant="text" sx={{ color: props.color }}>
          <StencilStyles.SecondaryButton sx={{ mr: 1 }} onClick={props.onClose} label="button.cancel" />
          <StencilStyles.PrimaryButton onClick={props.submit.onClick} disabled={props.submit.disabled} label={props.submit.title} />
        </ButtonGroup>
      </DialogActions>
    </Dialog>
  );
}

export type { StyledDialogProps }
export { StyledDialog }