import React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core';
import { Layout, Ide } from '../deps';
import {
  PageComposer, Dashboard, LinkTable, LinksView, WorkflowsView,
  WorkflowsTable, ReleasesView, LocalesView, ArticlesView
} from './';

const useStyles = (props: { y: number }) => makeStyles((theme: Theme) =>
  createStyles({
    root: {
      height: `${props.y}px`,
      padding: theme.spacing(1)
    },
    left: {
      display: 'flex',
      padding: '1vw',
      backgroundColor: theme.palette.background.paper,
      height: '100%',
    },
    right: {
      flexGrow: 1,
      padding: '1vw',
      backgroundColor: theme.palette.background.default,
    },
  }),
)();


const Composer: React.FC<{}> = () => {
  const layout = Layout.useContext();
  const site = Ide.useSite();
  const classes = useStyles(layout.session.dimensions);
  const tabs = layout.session.tabs;

  if (tabs.length === 0) {
    return null;
  }

  //composers which are not linked directly with an article
  const active = tabs[layout.session.history.open];
  if (active.id === 'releases') {
    return (<div className={classes.root}><ReleasesView /></div>);
  } else if (active.id === 'links') {
    return (<div className={classes.root}><LinksView /></div>)
  } else if (active.id === 'newItem') {
    return (<div className={classes.root}><Dashboard /></div>)
  } else if (active.id === 'locales') {
    return (<div className={classes.root}><LocalesView /></div>)
  } else if (active.id === 'workflows') {
    return (<div className={classes.root}><WorkflowsView /></div>)
  } else if (active.id === 'articles') {
    return (<div className={classes.root}><ArticlesView /></div>)
  }

  //article-based composers
  const article = site.articles[active.id];
  const tab: Ide.Tab = active;
  if (!tab.data || !tab.data.nav) {
    return null;
  }


  let composer: React.ReactChild;
  if (tab.data.nav.type === "ARTICLE_PAGES") {
    const locale1 = tab.data.nav.value as string;
    const locale2 = tab.data.nav.value2 as string;
    composer = (<PageComposer key={article.id + "-" + locale1 + "-" + locale2} article={article} locale1={locale1} locale2={locale2}/>);
  } else if (tab.data.nav.type === "ARTICLE_LINKS") {
    composer = (<LinkTable key={article.id + "-links"} article={article} />)
  } else if (tab.data.nav.type === "ARTICLE_WORKFLOWS") {
    composer = (<WorkflowsTable key={article.id + "-workflows"} article={article} />)
  } else {
    composer = (<></>);
  }

  return (<div className={classes.root} key={article.id}>{composer}</div>)
}
export { Composer }


