import React from 'react';

import LibraryBooksOutlinedIcon from '@material-ui/icons/LibraryBooksOutlined';
import NewReleasesOutlinedIcon from '@material-ui/icons/NewReleasesOutlined';
import LinkIcon from '@material-ui/icons/Link';
import PostAddOutlinedIcon from '@material-ui/icons/PostAddOutlined';
import TranslateIcon from '@material-ui/icons/Translate';
import WorkOutlineIcon from '@material-ui/icons/WorkOutline';
import AddIcon from '@material-ui/icons/Add';

import { withStyles, Badge } from '@material-ui/core';

import { Explorer } from '../explorer';
import { LocaleComposer, ArticleComposer } from '../composers';

import { Layout } from '../deps';


const StyledBadge = withStyles((theme) => ({
  badge: {
    top: -3,
    background: 'unset',
    padding: '0 0px',
  },
}))(Badge);



const toolbar = (actions: Layout.Session.Actions): Layout.Session.ToolbarItem[] => {
  return [

    {
      id: 'toolbar.newarticle',
      icon: (<StyledBadge badgeContent={<AddIcon fontSize="small" />} color="primary"><LibraryBooksOutlinedIcon /></StyledBadge>),
      enabled: true,
      type: { getDialog: (_id: string, onClose: () => void) => (<ArticleComposer onClose={onClose} />) }
    },

    {
      id: 'toolbar.newlocale',
      icon: (<StyledBadge badgeContent={<AddIcon fontSize="small" />} color="primary"><TranslateIcon /></StyledBadge>),
      enabled: true,
      type: { getDialog: (_id: string, onClose: () => void) => (<LocaleComposer onClose={onClose} />) }
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
      id: 'toolbar.createNew',
      icon: <PostAddOutlinedIcon />,
      type: {
        onClick: () => {
          actions.handleTabAdd({ id: 'newItem', label: "New Item" });
        }
      }
    },


  ];
}

export { toolbar };