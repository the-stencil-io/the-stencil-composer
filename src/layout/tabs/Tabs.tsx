import React from 'react';

import {Tabs as MaterialTabs, Tab as MaterialTab, makeStyles} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';

import { useLayout } from '../context';



const useStyles = makeStyles((theme) => ({
  tab: {
    flexDirection: 'row-reverse',
    color: theme.palette.primary.contrastText
  },
  tabLabel: {
    minHeight: 'unset',
    textTransform: 'unset'
  },
  close: {
    marginBottom: 'unset !important',
    padding: 'unset !important'
  },
  closeSpacing: {
    flexGrow: 1
  },
  closeIcon: {
    marginLeft: 5,
     color: theme.palette.primary.contrastText,
    "&:hover": {
      color: theme.palette.secondary.main
    }
  }
}));



const Tabs: React.FC<{}> = () => {
  const classes = useStyles();

  const { session, actions } = useLayout();
  
  const active = session.history.open;
  const tabs = session.tabs;
  const activeTab = session.tabs[active];
  
  const handleTabChange = (_event: React.ChangeEvent<{}>, newValue: number) => {
    actions.handleTabChange(newValue);
  };
  const handleTabClose = (_event: React.ChangeEvent<{}>, _newValue: number) => {
    _event.stopPropagation();
    actions.handleTabClose(activeTab);
  };
    
  return (<MaterialTabs value={active} onChange={handleTabChange} variant="scrollable" scrollButtons="auto">
      { tabs.map((tab, index) => (
        <MaterialTab key={index} value={index}
          label={tab.label} 
          classes={{wrapper: classes.tab, labelIcon: classes.tabLabel}}
          icon={(<>
            <CloseIcon color="disabled" className={classes.closeIcon} onClick={(e) => handleTabClose(e, index)}/>
            <span className={classes.closeSpacing}></span></>)} 
        />)) }
    </MaterialTabs>
  );
}

export default Tabs;
