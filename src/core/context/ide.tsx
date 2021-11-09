import React from 'react';
import { useIntl } from 'react-intl';


import { StencilClient, Layout } from '../';
import { ReducerDispatch, Reducer } from './Reducer';
import { SessionData, ImmutableTabData } from './SessionData';

declare namespace Composer {

  type NavType = "ARTICLE_LINKS" | "ARTICLE_WORKFLOWS" | "ARTICLE_PAGES";

  interface Nav {
    type: NavType;
    value?: string | null;
    value2?: string | null;
  }

  interface TabData {
    nav?: Nav
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
    
    getArticleView(articleId: StencilClient.ArticleId): ArticleView;
    
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
  
  interface ArticleView {
    article: StencilClient.Article;
    pages: PageView[];
    canCreate: StencilClient.SiteLocale[];
    links: LinkView[];
    workflows: WorkflowView[];
  }
  
  interface PageView {
    page: StencilClient.Page;
    locale: StencilClient.SiteLocale;
  }
  
  interface LinkView {
    link: StencilClient.Link;
    labels: LabelView[];
  }
  
  interface WorkflowView {
    workflow: StencilClient.Workflow;
    labels: LabelView[];
  }
  
  interface LabelView {
    label: StencilClient.LocaleLabel;
    locale: StencilClient.SiteLocale;
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
    
    
    const handleInTab = (props: {article: StencilClient.Article, type: Composer.NavType, locale?: string | null, secondary?: boolean}) => {
      const nav = { 
        type: props.type, 
        value: props.secondary ? undefined : props.locale,
        value2: props.secondary ? props.locale : undefined};
        
      let label: string | React.ReactElement;
      if(props.type === "ARTICLE_PAGES" || props.type === "ARTICLE_LINKS" || props.type === "ARTICLE_WORKFLOWS") {
        label = <ArticleTab article={props.article} type={props.type}/>; 
      } else {
        label = props.article.body.name;
      }
      
      const tab: Composer.Tab = {
        id: props.article.id,
        label,
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
  

    return { handleInTab, findTab };
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

const ArticleTab: React.FC<{article: StencilClient.Article, type: Composer.NavType}> = ({ article, type }) => {
  const intl = useIntl();
  const unsaved = Composer.useUnsaved(article);
  
  /* TODO:::
  if(type === "ARTICLE_PAGES") {
    return <span>{`${intl.formatMessage({id: "pages"})}: ${article.body.name}`}{unsaved ? " * ": ""}</span>;
  } else if(type === "ARTICLE_LINKS")  {
    return <span>{`${intl.formatMessage({id: "links"})}: ${article.body.name}`}</span>;
  } else if(type === "ARTICLE_WORKFLOWS") {
    return <span>{`${intl.formatMessage({id: "workflows"})}: ${article.body.name}`}</span>;
  }*/
  
  return <span>{`${article.body.name}`}{unsaved ? " * ": ""}</span>;  
}



export default Composer;

