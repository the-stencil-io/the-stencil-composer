import React from 'react';

import { StencilClient, Layout } from '../';
import { ReducerDispatch, Reducer } from './Reducer';
import { SessionData, ImmutableTabData } from './SessionData';

declare namespace Composer {

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
    origin: StencilClient.Page;
    value: StencilClient.LocalisedContent;
    withValue(value: StencilClient.LocalisedContent): PageUpdate;
  }

  interface Session {
    site: StencilClient.Site,
    pages: Record<StencilClient.PageId, PageUpdate>;
    
    getArticlesForLocale(locale: StencilClient.LocaleId): StencilClient.Article[];
    getArticlesForLocales(locales: StencilClient.LocaleId[]): StencilClient.Article[];
    
    withPage(page: StencilClient.PageId): Session;
    withPageValue(page: StencilClient.PageId, value: StencilClient.LocalisedContent): Session;
    withoutPages(pages: StencilClient.PageId[]): Session;
    
    withSite(site: StencilClient.Site): Session;
  }

  interface Actions {
    handleLoad(): Promise<void>;
    handleLoadSite(): Promise<void>;
    handlePageUpdate(page: StencilClient.PageId, value: StencilClient.LocalisedContent): void;
    handlePageUpdateRemove(pages: StencilClient.PageId[]): void;
  }

  interface ContextType {
    session: Session;
    actions: Actions;
    service: StencilClient.Service;
  }
}

namespace Composer {
  const sessionData = new SessionData({});

  export const createTab = (props: { nav: Composer.Nav, page?: StencilClient.Page  }) => new ImmutableTabData(props);

  export const ComposerContext = React.createContext<ContextType>({
    session: sessionData,
    actions: {} as Actions,
    service: {} as StencilClient.Service
  });
  
  export const useUnsaved = (article: StencilClient.Article) => {
    const ide: ContextType = React.useContext(ComposerContext);
    return isInsaved(article, ide);
  }
  
  const isInsaved = (article: StencilClient.Article, ide: ContextType): boolean => {
    const unsaved = Object.values(ide.session.pages).filter(p => !p.saved).filter(p => p.origin.body.article === article.id);
    return unsaved.length > 0
  }

  export const useComposer = () => {
    const result: ContextType = React.useContext(ComposerContext);
    const isArticleUnsaved = (article: StencilClient.Article): boolean => isInsaved(article, result);
    
    return {session: result.session, service: result.service, actions: result.actions, site: result.session.site, isArticleUnsaved};
  }

  export const useSite = () => {
    const result: ContextType = React.useContext(ComposerContext);
    return result.session.site;
  }

  export const useSession = () => {
    const result: ContextType = React.useContext(ComposerContext);
    return result.session;
  }

  export const useLayout = () => {
    const layout = Layout.useContext();
    return layout;
  } 

  export const useNav = () => {
    const layout = useLayout();
    
    const handleInTab = (props: {article: StencilClient.Article, type: Composer.NavType, locale?: string}) => {
      const nav = { type: props.type, value: props.locale };
      const tab: Composer.Tab = {
        id: props.article.id,
        label: props.type === "ARTICLE_PAGES" ? <ArticlePagesTab article={props.article} /> : props.article.body.name, 
        data: Composer.createTab({ nav })
      };

      const oldTab = layout.session.findTab(props.article.id);
      if (oldTab !== undefined) {
        layout.actions.handleTabData(props.article.id, (oldData: Composer.TabData) => oldData.withNav(nav));
      }
      layout.actions.handleTabAdd(tab);
    }

    const findTab = (article: StencilClient.Article): Composer.Tab | undefined => {
      const oldTab = layout.session.findTab(article.id);
      if (oldTab !== undefined) {
        const tabs = layout.session.tabs;
        const active = tabs[layout.session.history.open];
        const tab: Composer.Tab = active;
        return tab;
      }
      return undefined;
    }
    
    const handleDualView = (article: StencilClient.Article) => {
      const oldTab = layout.session.findTab(article.id);
      if (oldTab !== undefined) {
        layout.actions.handleTabData(article.id, (oldData: Composer.TabData) => oldData.withDualView(!oldData.dualView));
      }
    }

    return { handleInTab, findTab, handleDualView };
  }
  
  export const Provider: React.FC<{ children: React.ReactNode, service: StencilClient.Service }> = ({ children, service }) => {
    const [session, dispatch] = React.useReducer(Reducer, sessionData);
    const actions = React.useMemo(() => {
      console.log("init ide dispatch");
      return new ReducerDispatch(dispatch, service)
    }, [dispatch, service]);

    React.useLayoutEffect(() => {
      console.log("init ide data");
      actions.handleLoad();
    }, [service, actions]);

    return (<ComposerContext.Provider value={{ session, actions, service }}>{children}</ComposerContext.Provider>);
  };
}

const ArticlePagesTab: React.FC<{article: StencilClient.Article}> = ({ article }) => {
  const unsaved = Composer.useUnsaved(article);
  return <span>{article.body.name}{unsaved ? " *": ""}</span>;
}



export default Composer;

