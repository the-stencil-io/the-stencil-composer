import React from 'react';

import LibraryBooksOutlinedIcon from '@mui/icons-material/LibraryBooksOutlined';
import NewReleasesOutlinedIcon from '@mui/icons-material/NewReleasesOutlined';
import LinkIcon from '@mui/icons-material/Link';
import TranslateIcon from '@mui/icons-material/Translate';
import WorkOutlineIcon from '@mui/icons-material/WorkOutline';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined';
import ImportExportIcon from '@mui/icons-material/ImportExport';
import PieChartIcon from '@mui/icons-material/PieChart';
import { Explorer } from '../explorer';

import { Layout } from '../deps';


const toolbar = (actions: Layout.Session.Actions): Layout.Session.ToolbarItem[] => {
  return [

    {
      id: 'toolbar.dashboard',
      icon: <HomeOutlinedIcon />,
      type: {
        onClick: () => {
          actions.handleTabAdd({ id: 'newItem', label: "Dashboard" });
        }
      }
    },

    {
      id: 'toolbar.explorer',
      enabled: true,
      type: { getView: () => (<Explorer />) }
    },

    {
      id: 'toolbar.articles',
      icon: <LibraryBooksOutlinedIcon />,
      type: {
        onClick: () => {
          actions.handleTabAdd({ id: 'articles', label: "Articles" });
        }
      }
    },

    {
      id: 'toolbar.links',
      icon: <LinkIcon />,
      type: {
        onClick: () => {
          actions.handleTabAdd({ id: 'links', label: "Links" });
        }
      }
    },

    {
      id: 'toolbar.workflows',
      icon: <WorkOutlineIcon />,
      type: {
        onClick: () => {
          actions.handleTabAdd({ id: 'workflows', label: "Workflows" });
        }
      }
    },

    {
      id: 'toolbar.releases',
      icon: <NewReleasesOutlinedIcon />,
      type: {
        onClick: () => {
          actions.handleTabAdd({ id: 'releases', label: "Releases" });
        }
      }
    },

    {
      id: 'toolbar.locales',
      icon: <TranslateIcon />,
      type: {
        onClick: () => {
          actions.handleTabAdd({ id: 'locales', label: "Locales" });
        }
      }
    },

    {
      id: 'toolbar.import',
      icon: <ImportExportIcon />,
      type: {
        onClick: () => {
          actions.handleTabAdd({ id: 'import', label: 'Import' });
        }
      }
    },
    
    {
      id: 'toolbar.graph',
      icon: <PieChartIcon />,
      type: {
        onClick: () => {
          actions.handleTabAdd({ id: 'graph', label: "Graph" });
        }
      }
    },
    {
      id: 'toolbar.help',
      icon: <HelpOutlineOutlinedIcon />,
      type: {
        onClick: () => {
          actions.handleTabAdd({ id: 'help', label: "Help" });
        }
      }
    },
  ];
}

export { toolbar };