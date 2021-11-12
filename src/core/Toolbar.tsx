import React from 'react';

import { Tabs, Tab, Box, useTheme, TabProps, TabsProps } from '@mui/material';
import { styled } from "@mui/material/styles";

import FlipToFrontOutlinedIcon from '@mui/icons-material/FlipToFrontOutlined';
import ArticleRoundedIcon from "@mui/icons-material/ArticleRounded";
import NewReleasesOutlinedIcon from '@mui/icons-material/NewReleasesOutlined';
import LinkIcon from '@mui/icons-material/Link';
import TranslateIcon from '@mui/icons-material/Translate';
import WorkOutlineIcon from '@mui/icons-material/WorkOutline';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined';
import ImportExportIcon from '@mui/icons-material/ImportExport';

import { Composer } from './context';

const StyledTab = styled(Tab)<TabProps>(({ theme }) => ({
  "&.MuiButtonBase-root": {
    minWidth: "unset",
    color: theme.palette.explorerItem.main,
  },
  "&.Mui-selected": {
    color: theme.palette.explorerItem.dark,
  }
}));

const StyledTabs = styled(Tabs)<TabsProps>(({ theme }) => ({
  "& .MuiTabs-indicator": {
    backgroundColor: theme.palette.explorerItem.dark,
    marginRight: "49px"
  }
}));



const Toolbar: React.FC<{}> = () => {
  const { actions, session } = Composer.useLayout();
  const drawerOpen = session.drawer;

  const handleChange = (_event: React.SyntheticEvent, newValue: string) => {
    if (newValue === 'toolbar.dashboard') {
      actions.handleTabAdd({ id: 'newItem', label: "Dashboard" });
    } else if (newValue === 'toolbar.articles') {
      actions.handleSecondary("toolbar.articles")
    } else if (newValue === 'toolbar.links') {
      actions.handleTabAdd({ id: 'links', label: "Links" })
    } else if (newValue === 'toolbar.workflows') {
      actions.handleTabAdd({ id: 'workflows', label: "Workflows" });
      actions.handleSecondary('toolbar.workflows')

    } else if (newValue === 'toolbar.releases') {
      actions.handleTabAdd({ id: 'releases', label: "Releases" })

    } else if (newValue === 'toolbar.locales') {
      actions.handleTabAdd({ id: 'locales', label: "Locales" })

    } else if (newValue === 'toolbar.import') {
      actions.handleTabAdd({ id: 'import', label: 'Import' })

    } else if (newValue === 'toolbar.help') {
      actions.handleTabAdd({ id: 'help', label: "Help" })

    } else if (newValue === 'toolbar.expand') {
      actions.handleDrawerOpen(!drawerOpen)
    }
  };

  // open dashboard
  React.useLayoutEffect(() => {
    console.log("init toolbar");
    actions.handleSecondary("toolbar.articles")
    actions.handleTabAdd({ id: 'newItem', label: "Dashboard" });
  }, [actions]);

  return (
    <Box sx={{ flexGrow: 1, display: 'flex', width: "100%", height: "100%", backgroundColor: "explorer.main" }}>
      <StyledTabs orientation="vertical" 
        onChange={handleChange}
        sx={{ borderRight: 1, borderColor: 'explorerItem.dark' }}
        value={session.secondary}>

        <StyledTab value='toolbar.dashboard' icon={<HomeOutlinedIcon />} />
        <StyledTab value='toolbar.articles' icon={<ArticleRoundedIcon />} />
        <StyledTab value='toolbar.links' icon={<LinkIcon />} />
        <StyledTab value='toolbar.workflows' icon={<WorkOutlineIcon />} />
        <StyledTab value='toolbar.releases' icon={<NewReleasesOutlinedIcon />} />
        <StyledTab value='toolbar.locales' icon={<TranslateIcon />} />
        <StyledTab value='toolbar.import' icon={<ImportExportIcon />} />
        <StyledTab value='toolbar.help' icon={<HelpOutlineOutlinedIcon />} />
        <StyledTab value='toolbar.expand' icon={<FlipToFrontOutlinedIcon />} />
      </StyledTabs>
    </Box>);
}


export default Toolbar;