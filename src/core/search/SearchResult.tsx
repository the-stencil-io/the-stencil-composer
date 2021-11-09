import React from 'react';
import { makeStyles } from '@mui/styles';

import { ListItem, Theme, Paper, Popper, Grow, Divider } from '@mui/material';

//import { SearchResultGroup } from './SearchResultGroup';


const useStyles = makeStyles((theme: Theme) => ({
  paper: {
    borderRadius: '3px',
    border: '2px solid',
    borderColor: theme.palette.article.dark,
    padding: theme.spacing(2, 0, 2, 0),
    // maxHeight: '75vh',
    overflow: 'auto',

  },
  popper: {
    zIndex: theme.zIndex.tooltip + 1,
    width: '100%'
  },
  warningIcon: {
    color: theme.palette.warning.dark,
    marginRight: theme.spacing(1)
  },
  warning: {
    fontWeight: 'bold'
  },
  error: {
    color: theme.palette.error.main,
    fontWeight: 'bold'
  }

}));


interface SearchResultProps {
  //searchString: string,
  anchorEl: HTMLDivElement,
}

const SearchResult: React.FC<SearchResultProps> = ({ anchorEl }) => {
  const classes = useStyles();


  /*
    const site = useSite();
    const search = React.useMemo(() => makeSearch(site), [site]);
    
    if (!site) {
      return null;
    }
  
  
    let infoRow: React.ReactNode | null = null;
    if (searchString.length < 2) {
      infoRow = <ListItem className={classes.warning}><WarningAmberIcon className={classes.warningIcon} /><FormattedMessage id="app.search.message" /></ListItem>
    }
    const searchResults = searchString.length < 2 ? [] : search.find(searchString);
    const groups: React.ReactNode[] = [];
  
    if (searchString.length >= 2 && searchResults.length === 0) {
      infoRow = <ListItem className={classes.error}><ErrorIcon sx={{ marginRight: 1 }} /><FormattedMessage id="app.search.noresults" /></ListItem>
    }
  
    for (let index = 0; index < searchResults.length; index++) {
      groups.push(<SearchResultGroup key={index + '-el-0'} searchFor={searchString}>{searchResults[index]}</SearchResultGroup>)
  
      if (index < searchResults.length - 1) {
        groups.push(<Divider key={index + '-el-1'} />)
      }
    }
  
  */

  return (
    <Popper
      className={classes.popper}
      open={Boolean(anchorEl)}
      anchorEl={anchorEl}
      transition
      disablePortal

    >
      {({ TransitionProps, placement }) => (
        <Grow
          {...TransitionProps}
          style={{
            transformOrigin:
              placement === "bottom" ? "center top" : "center bottom"
          }}
        >
          <Paper
            elevation={3}
            className={classes.paper}
            role="tooltip"
          >
            RESULTS
          </Paper>
        </Grow>
      )}
    </Popper>
  )
}



export { SearchResult }