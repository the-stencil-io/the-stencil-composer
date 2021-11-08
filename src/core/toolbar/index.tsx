import React from 'react';

import {
  List, ListItem, Tooltip, IconButton, Box, useTheme
} from '@mui/material';


import LibraryBooksOutlinedIcon from '@mui/icons-material/LibraryBooksOutlined';
import NewReleasesOutlinedIcon from '@mui/icons-material/NewReleasesOutlined';
import LinkIcon from '@mui/icons-material/Link';
import TranslateIcon from '@mui/icons-material/Translate';
import WorkOutlineIcon from '@mui/icons-material/WorkOutline';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined';
import ImportExportIcon from '@mui/icons-material/ImportExport';

import { FormattedMessage } from 'react-intl';
import { Composer } from '../context';


const ToolbarItem: React.FC<{
  id: string,
  enabled: boolean,
  onClick: () => void,
  icon?: React.ReactElement
}> = ({ id, enabled, icon, onClick }) => {

  const color = enabled ? "primary" : "inherit";
  return (
    <Tooltip title={<FormattedMessage id={id} />} key={id}>
      <ListItem disableGutters>
        <Box display="flex" justifyContent="center" sx={{ width: '100%' }}>
          <IconButton color={color} onClick={onClick}>
            {icon}
          </IconButton>
        </Box>
      </ListItem>
    </Tooltip>);
}

const Toolbar: React.FC<{}> = () => {
  const { actions } = Composer.useLayout();
  const theme = useTheme();
  return (
    <List dense={true} disablePadding sx={{ width: `calc(${theme.spacing(7)} + 1px)` }}>
      <ToolbarItem id='toolbar.dashboard' icon={<HomeOutlinedIcon />} enabled={false}
        onClick={() => actions.handleTabAdd({ id: 'newItem', label: "Dashboard" })}
      />
      <ToolbarItem id='toolbar.articles' icon={<LibraryBooksOutlinedIcon />} enabled={false}
        onClick={() => {


          actions.handleTabAdd({ id: 'articles', label: "Articles" })
          actions.handleSecondary("toolbar.explorer")
        }}
      />
      <ToolbarItem id='toolbar.links' icon={<LinkIcon />} enabled={false}
        onClick={() => actions.handleTabAdd({ id: 'links', label: "Links" })}
      />
      <ToolbarItem id='toolbar.workflows' icon={<WorkOutlineIcon />} enabled={false}
        onClick={() => {

          actions.handleTabAdd({ id: 'workflows', label: "Workflows" });
          actions.handleSecondary('toolbar.workflows')
        }}
      />
      <ToolbarItem id='toolbar.releases' icon={<NewReleasesOutlinedIcon />} enabled={false}
        onClick={() => actions.handleTabAdd({ id: 'releases', label: "Releases" })}
      />
      <ToolbarItem id='toolbar.locales' icon={<TranslateIcon />} enabled={false}
        onClick={() => actions.handleTabAdd({ id: 'locales', label: "Locales" })}
      />
      <ToolbarItem id='toolbar.import' icon={<ImportExportIcon />} enabled={false}
        onClick={() => actions.handleTabAdd({ id: 'import', label: 'Import' })}
      />
      <ToolbarItem id='toolbar.help' icon={<HelpOutlineOutlinedIcon />} enabled={false}
        onClick={() => actions.handleTabAdd({ id: 'help', label: "Help" })}
      />
    </List>);
}

export default Toolbar;