import React from 'react';

import { Tabs as MuiTabs, Tab as MuiTab, useTheme, Box } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

import { useLayout, Session } from './context';


const Tabs: React.FC<{}> = () => {
  const { session, actions } = useLayout();
  const theme = useTheme();

  const active = session.history.open;
  const tabs = session.tabs;


  return React.useMemo(() => {
    const handleTabChange = (_event: React.ChangeEvent<{}>, newValue: number) => {
      actions.handleTabChange(newValue);
    };
    const handleTabClose = (_event: React.ChangeEvent<{}>, newValue: Session.Tab<any>) => {
      _event.stopPropagation();
      actions.handleTabClose(newValue);
    };

    console.log("init tabs");
    return (<MuiTabs value={active} onChange={handleTabChange} variant="scrollable" scrollButtons="auto">
      {tabs.map((tab, index) => (
        <MuiTab key={index} value={index} wrapped={true}
          label={tab.label}
          iconPosition="end"
          sx={{ minHeight: 'unset' }}
          icon={(<>
            <CloseIcon color="disabled"
              onClick={(e) => handleTabClose(e, tab)}
              sx={{
                marginLeft: 5,
                color: theme.palette.primary.main,
                "&:hover": {
                  color: theme.palette.secondary.light
                }
              }}
            />
            <Box component="span" sx={{ flexGrow: 1 }}></Box>
          </>)}
        />))}
    </MuiTabs>
    )
  }, [tabs, active, theme, actions]);
}

export default Tabs;
