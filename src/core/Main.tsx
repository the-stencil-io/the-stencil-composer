import React from 'react';
import { Box } from '@mui/material';

import {
  Dashboard, ArticlePageComposer, ArticleWorkflowsComposer, ArticleLinksComposer, WorkflowsView,
  ReleasesView, LocalesView, ImportView,
  HelpView
} from './';

import { Composer } from './context';


const root = { height: `100%`, padding: 1 };

const Main: React.FC<{}> = () => {
  const layout = Composer.useLayout();
  const site = Composer.useSite();
  const tabs = layout.session.tabs;

  if (site.contentType === "NO_CONNECTION") {
    return (<Box>{site.contentType}</Box>);
  }

  if (tabs.length === 0) {
    return null;
  }

  //composers which are NOT linked directly with an article
  const active = tabs[layout.session.history.open];
  if (active.id === 'releases') {
    return (<Box sx={root}><ReleasesView /></Box>);
  } else if (active.id === 'newItem') {
    return (<Box sx={root}><Dashboard /></Box>);
  } else if (active.id === 'locales') {
    return (<Box sx={root}><LocalesView /></Box>);
  } else if (active.id === 'workflows') {
    return (<Box sx={root}><WorkflowsView /></Box>);
  } else if (active.id === 'import') {
    return (<Box sx={root}><ImportView /></Box>);

  } else if (active.id === 'help') {
    return (<Box sx={root}><HelpView /></Box>);
  }

  //article-based composers
  const article = site.articles[active.id];
  const tab: Composer.Tab = active;
  if (!tab.data || !tab.data.nav) {
    return null;
  }


  let composer: React.ReactChild;
  if (tab.data.nav.type === "ARTICLE_PAGES") {
    const locale1 = tab.data.nav.value as string;
    const locale2 = tab.data.nav.value2 as string;
    composer = (<ArticlePageComposer key={article.id + "-" + locale1 + "-" + locale2} articleId={article.id} locale1={locale1} locale2={locale2} />);
  } else if (tab.data.nav.type === "ARTICLE_LINKS") {
    composer = (<ArticleLinksComposer key={article.id + "-links"} articleId={article.id} />)
  } else if (tab.data.nav.type === "ARTICLE_WORKFLOWS") {
    composer = (<ArticleWorkflowsComposer key={article.id + "-workflows"} articleId={article.id} />)
  } else {
    composer = (<></>);
  }

  return (<Box sx={root} key={article.id}>{composer}</Box>)
}
export { Main }


