import React from 'react';
import { styled } from "@mui/material/styles";
import { SxProps } from '@mui/system';
import { Button, ButtonProps, Theme } from '@mui/material';
import { FormattedMessage } from 'react-intl';



const StyledButtonRoot = styled(Button)<ButtonProps>(({ theme }) => ({
  borderRadius: theme.spacing(1)
}));

const StyledPrimaryButton: React.FC<{label: string, onClick: () => void, sx?: SxProps<Theme>} > = (props) => {
  const title = <FormattedMessage id={props.label} />;
  return (
    <StyledButtonRoot variant='contained' onClick={props.onClick} sx={props.sx}>{title}</StyledButtonRoot>
  );
}

export { StyledPrimaryButton, StyledButtonRoot }