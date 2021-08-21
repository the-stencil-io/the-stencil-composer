import React from 'react';

import LibraryBooksOutlinedIcon from '@material-ui/icons/LibraryBooksOutlined';
import NewReleasesOutlinedIcon from '@material-ui/icons/NewReleasesOutlined';
import LinkIcon from '@material-ui/icons/Link';
import TranslateIcon from '@material-ui/icons/Translate';
import WorkOutlineIcon from '@material-ui/icons/WorkOutline';
import HomeOutlinedIcon from '@material-ui/icons/HomeOutlined';

import { Explorer } from '../explorer';

import { Layout } from '../deps';


const toolbar = (actions: Layout.Session.Actions): Layout.Session.ToolbarItem[] => {
  return [

    {
      id: 'toolbar.dashboard',
      icon: <HomeOutlinedIcon />,
      type: {
        onClick: () => {
          actions.handleTabAdd({ id: 'newItem', label: "New Item" });
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
  ];
}

export { toolbar };