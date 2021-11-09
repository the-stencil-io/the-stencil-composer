import React from 'react';
import { makeStyles } from '@mui/styles';
import {
  Theme, Tooltip, ClickAwayListener, Box,
  InputAdornment, OutlinedInput
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { FormattedMessage, useIntl } from 'react-intl';
import { SearchResult } from './SearchResult';

const useStyles = makeStyles((theme: Theme) => ({

  search: {
    marginRight: theme.spacing(1),
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  },
  searchIcon: {
    color: theme.palette.article.main,
  },
  inputRoot: {
    color: 'inherit',
    width: '100%'
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    color: theme.palette.text.primary,
    '&:focus': {
      borderColor: theme.palette.info.main
    },
  },
}));


interface SearchProps {
}

const Search: React.FC<SearchProps> = () => {
  const classes = useStyles();
  const intl = useIntl();
  const [anchorEl, setAnchorEl] = React.useState<HTMLDivElement>();
  const [value, setValue] = React.useState("");

  const handleAnchor = (event: React.MouseEvent<HTMLDivElement>) => {
    setAnchorEl(event.currentTarget);
  };

  return (
    <>
      <div className={classes.search}>
        <Tooltip title={<FormattedMessage id={"search"} />} aria-label={intl.formatMessage({ id: "search" })}>
          <>
            <Box sx={{ m: 1 }} >
              <OutlinedInput
                type="search"
                role="search"
                onClick={handleAnchor}
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
                onChange={({ currentTarget }) => setValue(currentTarget.value)}
                placeholder={intl.formatMessage({ id: "search.tooltip" })}
                id="input-with-icon-adornment"
                inputProps={{ 'aria-label': intl.formatMessage({ id: "app.search" }) }}
                startAdornment={
                  <InputAdornment position="start">
                    <SearchIcon className={classes.searchIcon}/>
                  </InputAdornment>
                }
              />
            </Box>
          </>
        </Tooltip>
      </div>
      {anchorEl ? (
        <ClickAwayListener onClickAway={() => setAnchorEl(undefined)}>
          <div>
            <SearchResult anchorEl={anchorEl} />
          </div>
        </ClickAwayListener>
      ) : null}
    </>);
}


export { Search }


