import React from 'react';

import { API, Layout } from '../deps';
import { ReducerDispatch, Reducer } from './Reducer';
import { SessionData, ImmutableTabData } from './SessionData';

declare namespace Ide {

  type NavType = "ARTICLE_LINKS" | "ARTICLE_WORKFLOWS" | "ARTICLE_PAGES";

  interface Nav {
    type: NavType;
    value?: string;
    value2?: string;
  }

  interface TabData {
    nav?: Nav
    dualView?: boolean;
    withDualView(enabled: boolean): TabData;
    withNav(nav: Nav): TabData;
  }

  interface Tab extends Layout.Session.Tab<TabData> {

  }

  interface PageUpdate {
    saved: boolean;
    origin: API.CMS.Page;
    value: API.CMS.LocalisedContent;
    withValue(value: API.CMS.LocalisedContent): PageUpdate;
  }

  interface Session {
    site: API.CMS.Site,
    pages: Record<API.CMS.PageId, PageUpdate>;
    
    getArticlesForLocale(locale: API.CMS.LocaleId): API.CMS.Article[];
    getArticlesForLocales(locales: API.CMS.LocaleId[]): API.CMS.Article[];
    
    withPage(page: API.CMS.PageId): Session;
    withPageValue(page: API.CMS.PageId, value: API.CMS.LocalisedContent): Session;
    withoutPages(pages: API.CMS.PageId[]): Session;
    
    withSite(site: API.CMS.Site): Session;
  }

  interface Actions {
    handleLoad(): Promise<void>;
    handleLoadSite(): Promise<void>;
    handlePageUpdate(page: API.CMS.PageId, value: API.CMS.LocalisedContent): void;
    handlePageUpdateRemove(pages: API.CMS.PageId[]): void;
  }

  interface ContextType {
    session: Session;
    actions: Actions;
    service: API.CMS.Service;
  }
}

namespace Ide {
  const sessionData = new SessionData({});

  export const createTab = (props: { nav: Ide.Nav, page?: API.CMS.Page  }) => new ImmutableTabData(props);

  export const IdeContext = React.createContext<ContextType>({
    session: sessionData,
    actions: {} as Actions,
    service: {} as API.CMS.Service
  });
  
  export const useUnsaved = (article: API.CMS.Article) => {
    const ide: ContextType = React.useContext(IdeContext);
    const unsaved = Object.values(ide.session.pages).filter(p => !p.saved).filter(p => p.origin.body.article === article.id);
    return unsaved.length > 0
  }

  export const useIde = () => {
    const result: ContextType = React.useContext(IdeContext);
    return result;
  }

  export const useSite = () => {
    const result: ContextType = React.useContext(IdeContext);
    return result.session.site;
  }

  export const useNav = () => {
    const layout = Layout.useContext();
    
    const handleInTab = (props: {article: API.CMS.Article, type: Ide.NavType, locale?: string}) => {
      const nav = { type: props.type, value: props.locale };
      const tab: Ide.Tab = {
        id: props.article.id,
        label: props.type === "ARTICLE_PAGES" ? <ArticlePagesTab article={props.article} /> : props.article.body.name, 
        data: Ide.createTab({ nav })
      };

      const oldTab = layout.session.findTab(props.article.id);
      if (oldTab !== undefined) {
        layout.actions.handleTabData(props.article.id, (oldData: Ide.TabData) => oldData.withNav(nav));
      }
      layout.actions.handleTabAdd(tab);
    }

    const findTab = (article: API.CMS.Article): Ide.Tab | undefined => {
      const oldTab = layout.session.findTab(article.id);
      if (oldTab !== undefined) {
        const tabs = layout.session.tabs;
        const active = tabs[layout.session.history.open];
        const tab: Ide.Tab = active;
        return tab;
      }
      return undefined;
    }
    
    const handleDualView = (article: API.CMS.Article) => {
      const oldTab = layout.session.findTab(article.id);
      if (oldTab !== undefined) {
        layout.actions.handleTabData(article.id, (oldData: Ide.TabData) => oldData.withDualView(!oldData.dualView));
      }
    }

    return { handleInTab, findTab, handleDualView };
  }
  
  export const Provider: React.FC<{ children: React.ReactNode, service: API.CMS.Service }> = ({ children, service }) => {
    const [session, dispatch] = React.useReducer(Reducer, sessionData);
    const actions = React.useMemo(() => {
      console.log("init ide dispatch");
      return new ReducerDispatch(dispatch, service)
    }, [dispatch, service]);

    React.useLayoutEffect(() => {
      console.log("init ide data");
      actions.handleLoad();
    }, [service, actions]);

    return (<IdeContext.Provider value={{ session, actions, service }}>{children}</IdeContext.Provider>);
  };
}

const ArticlePagesTab: React.FC<{article: API.CMS.Article}> = ({ article }) => {
  const unsaved = Ide.useUnsaved(article);
  return <span>{article.body.name}{unsaved ? " *": ""}</span>;
}



export default Ide;

