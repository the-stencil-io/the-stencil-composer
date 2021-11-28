import React from 'react';
import { Box, TextField, TextFieldProps } from '@mui/material';
import { styled } from "@mui/material/styles";
import { useIntl } from 'react-intl';


// needs to know which tab is currently open and show search results accordingly
// need individual searchSecondary components, like linkResults, workflowResults, etc?
// workflows in dev mode should always appear at the top of the workflowResults

const TextFieldRoot = styled(TextField)<TextFieldProps>(({ theme }) => ({

  color: theme.palette.explorerItem.main,
  backgroundColor: theme.palette.explorer.main,
  '& .MuiOutlinedInput-input': {
    color: theme.palette.explorerItem.main,
  },
  '& .MuiOutlinedInput-root': {
    fontSize: '10pt',
    height: '2rem',
    '&.Mui-focused fieldset': {
      borderColor: theme.palette.explorerItem.dark,
    },
  },
  '& .MuiFormLabel-root': {
    color: theme.palette.explorerItem.main,
  },
  '& .MuiFormHelperText-root': {
    color: theme.palette.explorerItem.main,
    marginLeft: 1
  }
}));


interface SearchSecondaryProps {

}

const SearchSecondary: React.FC<SearchSecondaryProps> = () => {
  const intl = useIntl();
  const getPlaceholder = (id: string) => intl.formatMessage({ id });
  const [searchString, setSearchString] = React.useState("");
  const searchKeyword = searchString.toLowerCase();

  return (
    <Box alignSelf="center" sx={{ m: 1 }}>
      <TextFieldRoot placeholder={getPlaceholder("explorer.tabs.search")} value={searchString} onChange={({ target }) => setSearchString(target.value)} focused />
    </Box>
  );
}

export { SearchSecondary }