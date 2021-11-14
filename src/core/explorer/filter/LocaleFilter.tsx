import React from 'react';

import { Tabs, Tab, Box, TabProps, TabsProps } from '@mui/material';
import { styled } from "@mui/material/styles";

import FlipToFrontOutlinedIcon from '@mui/icons-material/FlipToFrontOutlined';
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined';
import NewReleasesOutlinedIcon from '@mui/icons-material/NewReleasesOutlined';
import LinkIcon from '@mui/icons-material/Link';
import TranslateIcon from '@mui/icons-material/Translate';
import WorkOutlineIcon from '@mui/icons-material/WorkOutline';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined';
import ImportExportIcon from '@mui/icons-material/ImportExport';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import SaveIcon from '@mui/icons-material/Save';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';

import { Composer, StencilClient } from '../../context';

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





const LocaleFilter: React.FC<{}> = () => {
  const site = Composer.useSite();
  const locales = Object.values(site.locales);
  const [selected, setSelected] = React.useState();

  return (<StyledTabs orientation="vertical" sx={{ borderRight: 1, borderColor: 'explorerItem.dark', maxHeight: '200px' }} value={selected}
    onChange={(_event, newValue) => setSelected(newValue)}
    variant="scrollable"
    scrollButtons="auto">{
      locales.map((locale) => <StyledTab key={locale.id} value={locale.id} icon={<SettingsOutlinedIcon />} />)
    }
    <StyledTab icon={<SettingsOutlinedIcon />} />
  </StyledTabs>);
}

export { LocaleFilter }