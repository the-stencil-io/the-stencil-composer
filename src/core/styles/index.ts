import {StyledDialog, StyledDialogProps} from './StyledDialog';
import {StyledTreeItem, StyledTreeItemRoot, StyledTreeItemProps} from './StyledTreeItem';
import {StyledSelect, StyledSelectMultiple, StyledSelectProps} from './StyledSelect';
import {StyledTextField, StyledNumberField, StyledFileField, StyledSearchField, StyledTextFieldProps } from './StyledTextField';
import {StyledTransferList, StyledTransferListProps } from './StyledTransferList';
import {StyledPrimaryButton } from './StyledButton';


declare namespace StencilStyles {
  export type { StyledDialogProps, StyledSelectProps, StyledTextFieldProps, StyledTreeItemProps, StyledTransferListProps }
}

namespace StencilStyles {
  export const Dialog = StyledDialog;
  export const Select = StyledSelect;
  export const SelectMultiple = StyledSelectMultiple;
  export const TextField = StyledTextField;
  export const NumberField = StyledNumberField;
  export const FileField = StyledFileField;
  export const TreeItem = StyledTreeItem;
  export const TreeItemRoot = StyledTreeItemRoot;
  export const SearchField = StyledSearchField;
  export const TransferList = StyledTransferList;
  export const PrimaryButton = StyledPrimaryButton;
}

export default StencilStyles;

