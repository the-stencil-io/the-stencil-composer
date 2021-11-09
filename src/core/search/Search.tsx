import * as React from 'react';
import { Box, Theme, Input, InputLabel, FormControl } from '@mui/material';
import { createStyles, makeStyles } from '@mui/styles';
import SearchIcon from '@mui/icons-material/Search';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';

import { FormattedMessage } from 'react-intl';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    select: {
      marginTop: theme.spacing(3),
    },
    selectSub: {
      marginLeft: theme.spacing(2),
      color: theme.palette.article.dark,
    },
    title: {
      backgroundColor: theme.palette.article.main,
      color: theme.palette.secondary.contrastText,
    },
  }),
);


const Search: React.FC<{}> = () => {
  return (
    <Box
      component="form"
      noValidate
      autoComplete="off"
      sx={{ m: 1 }}
    >     
    
        <TextField
          sx={{ width: '100%' }}
          label={<FormattedMessage id="search" />}
          placeholder="something here"
          color="info"
          focused
          type="search"
          variant="outlined"
        />
    </Box>
  );
}

export default Search;