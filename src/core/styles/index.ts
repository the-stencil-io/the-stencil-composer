import {StyledDialog, StyledDialogProps} from './StyledDialog';
import {StyledSelect, StyledSelectMultiple, StyledSelectProps} from './StyledSelect';
import {StyledTextField, StyledNumberField, StyledFileField, StyledTextFieldProps} from './StyledTextField';


declare namespace StencilStyles {
  export type { StyledDialogProps, StyledSelectProps, StyledTextFieldProps }
}

namespace StencilStyles {
  export const Dialog = StyledDialog;
  export const Select = StyledSelect;
  export const SelectMultiple = StyledSelectMultiple;
  export const TextField = StyledTextField;
  export const NumberField = StyledNumberField;
  export const FileField = StyledFileField;
}

export default StencilStyles;

