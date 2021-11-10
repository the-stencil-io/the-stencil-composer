import React from 'react';
import { TextField, TextFieldProps, FormControl, FormControlProps, InputLabel, Input, InputProps, Box, FormHelperText } from '@mui/material';
import { styled } from "@mui/material/styles";
import { FormattedMessage } from 'react-intl';


const TextFieldRoot = styled(TextField)<TextFieldProps>(({ theme }) => ({
  marginTop: theme.spacing(2),
  color: theme.palette.primary.contrastText,
  backgroundColor: theme.palette.background.paper,
}));

const StyledFormControl = styled(FormControl)<FormControlProps>(({ theme }) => ({
  marginTop: theme.spacing(2),
  color: theme.palette.primary.contrastText,
  backgroundColor: theme.palette.background.paper
}));


const StyleInputProps = styled(Input)<InputProps>(({ theme }) => ({
  //marginTop: theme.spacing(2),
  //color: theme.palette.primary.contrastText.,
  backgroundColor: theme.palette.background.paper
}));



interface StyledTextFieldProps<T> {
  label: string;
  disabled?: boolean;
  helperText?: string;
  value: T;
  placeholder?: T;
  required?: boolean;
  onChange: (newValue: T) => void;
}

const StyledFileField: React.FC<StyledTextFieldProps<string>> = ({ onChange, label, value, required, placeholder, helperText, disabled }) => {
  const title = <FormattedMessage id={label} />;
  return (
    <Box sx={{ mt: 2 }}>
      <InputLabel sx={{fontWeight: "bold" }}>{title}</InputLabel>
      <StyledFormControl variant="outlined" fullWidth>
        <StyleInputProps
          fullWidth
          disableUnderline
          type="file"
          disabled={disabled}
          onChange={(e) => {
            const file: File = (e.target as any).files[0];
            const enc = new TextDecoder("utf-8");
            file.arrayBuffer().then(d => onChange(enc.decode(d)));
          }}
        />
      </StyledFormControl>
      {helperText ? <FormHelperText><FormattedMessage id={helperText} /></FormHelperText> : null}
    </Box>
  );
}

const StyledTextField: React.FC<StyledTextFieldProps<string>> = ({ onChange, label, value, required, placeholder, helperText, disabled }) => {
  const helperTextLocalized = helperText ? <FormattedMessage id={helperText} /> : helperText;
  return (
    <TextFieldRoot fullWidth
    disabled={disabled}
      variant="outlined"
      label={<FormattedMessage id={label} />}
      required={required}
      helperText={helperTextLocalized}
      placeholder={placeholder}
      value={value}
      onChange={({ target }) => onChange(target.value)} />
  );
}

const StyledNumberField: React.FC<StyledTextFieldProps<number>> = ({ onChange, label, value, required, placeholder, helperText, disabled }) => {
  const helperTextLocalized = helperText ? <FormattedMessage id={helperText} /> : helperText;
  return (
    <TextFieldRoot fullWidth
      disabled={disabled}
      variant="outlined"
      label={<FormattedMessage id={label} />}
      required={required}
      type={"number"}
      helperText={helperTextLocalized}
      placeholder={placeholder + ""}
      value={value}
      onChange={({ target }) => onChange(target.value as any)} />
  );
}

export type { StyledTextFieldProps }
export { StyledTextField, StyledNumberField, StyledFileField }