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

import { Composer, StencilClient } from './context';

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
  const composer = Composer.useComposer();
  const layout = Composer.useLayout();
  const drawerOpen = layout.session.drawer;
  const layoutActions = layout.actions;
  const tabs = layout.session.tabs;
  const active = tabs.length ? tabs[layout.session.history.open] : undefined;
  const article = active ? composer.site.articles[active.id] : undefined;
  const articlePagesView = active?.data?.nav?.type === "ARTICLE_PAGES";
  const unsavedPages = Object.values(composer.session.pages).filter(p => !p.saved);
  const unsavedArticlePages: Composer.PageUpdate[] = (article ? unsavedPages.filter(p => !p.saved).filter(p => p.origin.body.article === article.id) : []);


  const handleChange = (_event: React.SyntheticEvent, newValue: string) => {

    if (newValue === 'toolbar.save' && articlePagesView && article) {
      if (unsavedArticlePages.length === 0) {
        return;
      }
      const update: StencilClient.PageMutator[] = unsavedArticlePages.map(p => ({ pageId: p.origin.id, locale: p.origin.body.locale, content: p.value }));
      composer.service.update().pages(update).then(success => {
        composer.actions.handlePageUpdateRemove(success.map(p => p.id));
      }).then(() => {
        composer.actions.handleLoadSite();
      });


    } else if (newValue === 'toolbar.dashboard') {
      layoutActions.handleTabAdd({ id: 'newItem', label: "Dashboard" });

    } else if (newValue === 'toolbar.articles') {
      layoutActions.handleSecondary("toolbar.articles")

    } else if (newValue === 'toolbar.links') {
      layoutActions.handleTabAdd({ id: 'links', label: "Links" })

    } else if (newValue === 'toolbar.workflows') {
      layoutActions.handleTabAdd({ id: 'workflows', label: "Workflows" });

    } else if (newValue === 'toolbar.releases') {
      layoutActions.handleTabAdd({ id: 'releases', label: "Releases" })

    } else if (newValue === 'toolbar.locales') {
      layoutActions.handleTabAdd({ id: 'locales', label: "Locales" })

    } else if (newValue === 'toolbar.import') {
      layoutActions.handleTabAdd({ id: 'import', label: 'Import' })

    } else if (newValue === 'toolbar.help') {
      layoutActions.handleTabAdd({ id: 'help', label: "Help" })

    } else if (newValue === 'toolbar.expand') {
      layoutActions.handleDrawerOpen(!drawerOpen)
    }
  };

  // open dashboard
  React.useLayoutEffect(() => {
    console.log("init toolbar");
    layoutActions.handleSecondary("toolbar.articles")
    layoutActions.handleTabAdd({ id: 'newItem', label: "Dashboard" });
  }, [layoutActions]);

  const saveSx = unsavedPages.length ? {color: "explorerItem.contrastText"} : undefined;

  return (
    <>
      <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', width: "100%", height: "100%", backgroundColor: "explorer.main" }}>
        <StyledTabs orientation="vertical"
          onChange={handleChange}
          sx={{ borderRight: 1, borderColor: 'explorerItem.dark' }}
          value={layout.session.secondary}>

          <StyledTab value='toolbar.dashboard' icon={<HomeOutlinedIcon />} />
          <StyledTab value='toolbar.save'
            icon={<SaveIcon sx={saveSx}/>} 
            disabled={unsavedArticlePages.length === 0}
            label={unsavedPages.length ? (<Box sx={saveSx}>{unsavedPages.length}</Box>) : undefined} />
          <StyledTab value='toolbar.search' icon={<SearchOutlinedIcon />} />
          <StyledTab value='toolbar.articles' icon={<ArticleOutlinedIcon />} />
          <StyledTab value='toolbar.links' icon={<LinkIcon />} />
          <StyledTab value='toolbar.workflows' icon={<WorkOutlineIcon />} />
          <StyledTab value='toolbar.releases' icon={<NewReleasesOutlinedIcon />} />
          <StyledTab value='toolbar.locales' icon={<TranslateIcon />} />
          <StyledTab value='toolbar.import' icon={<ImportExportIcon />} />
          <StyledTab value='toolbar.help' icon={<HelpOutlineOutlinedIcon />} />
          <StyledTab value='toolbar.expand' icon={<FlipToFrontOutlinedIcon />} />
        </StyledTabs>
        <Box flexGrow={1} sx={{ borderRight: 1, borderColor: 'explorerItem.dark' }} />

        <StyledTabs orientation="vertical" sx={{ borderRight: 1, borderColor: 'explorerItem.dark' }} value="default-is-unselected-material-issue">
          <StyledTab icon={<SettingsOutlinedIcon />} />
        </StyledTabs>
      </Box>
    </>
  );
}


export default Toolbar;