declare namespace CMS {

  type PageId = string;
  type LinkId = string;
  type ArticleId = string;
  type WorkflowId = string;
  type LocaleId = string;
  type Locale = string;
  type LocalisedMarkdown = string;
  type LocalisedContent = string;
  type ReleaseId = string;
  type LinkType = "internal" | "external" | "phone";
  
  
  interface Site {
    name: string,
    contentType: "OK" | "NOT_CREATED" | "EMPTY" | "ERRORS" | "NO_CONNECTION",
    locales: Record<string, SiteLocale>,
    pages: Record<PageId, Page>,
    links: Record<LinkId, Link>,
    articles: Record<ArticleId, Article>,
    workflows: Record<WorkflowId, Workflow>,
    releases: Record<ReleaseId, Release>
  }
  
  interface SiteLocale {
    id: LocaleId,
    body: {
      value: Locale,
      enabled: boolean
    }
  }
  
  interface LocaleMutator {
    localeId: LocaleId, 
    value: string,
    enabled: boolean
  }

  interface Page {
    id: PageId,
    created: string,
    modified: string,
    body: {
      article: ArticleId,
      locale: Locale,
      content: LocalisedMarkdown
    }
  }
  
  interface PageMutator {
    pageId: PageId,
    locale: Locale;
    content: LocalisedContent;
  }

  interface Article {
    id: ArticleId,
    body: {
      parentId?: ArticleId,
      name: string,
      order: number,
    }
  }
  
  interface ArticleMutator {
    articleId: ArticleId, 
    parentId?: ArticleId, 
    name: string, 
    order: number,
    links: LinkId[] | undefined,
    workflows: WorkflowId[] | undefined,
  }

  interface Release {
    id: string,
    created: string,
    body: {
      note?: string,
      name: string,
    }
  }

  interface Link {
    id: LinkId,
    body: {
      articles: ArticleId[],
      contentType: LinkType,
      value: string, //url, phone number
      labels: LocaleLabel[],
    }
  }
  
 interface LocaleLabel {
   locale: LocaleId;     // locale id
   labelValue: LocalisedContent; // translation in locale
  }
  
  
  interface LinkMutator {
    linkId: LinkId,
    type: LinkType,
    value: string,
    articles: ArticleId[] | undefined,
    labels: LocaleLabel[] | undefined,
  }

  interface Workflow {
    id: WorkflowId,
    body: {
      articles: ArticleId[],
      value: string,
      labels: LocaleLabel[],
    }
  }
  
  interface WorkflowMutator {
    workflowId: WorkflowId, 
    value: string, 
    articles: ArticleId[] | undefined,
    labels: LocaleLabel[] | undefined,
    devMode: boolean | undefined
  }

  interface FetchIntegration {
    fetch<T>(path: string, init?: RequestInit): Promise<T>;
  }

  interface Service {
    getSite(): Promise<Site>,
    create(): CreateBuilder;
    delete(): DeleteBuilder;
    update(): UpdateBuilder;
  }
  
  interface CreateArticle { 
    parentId?: ArticleId;
    name: string;
    order: number; 
  }
  
  interface CreateLocale {
    locale: Locale;
  }
  interface CreatePage {
    articleId: ArticleId;
    locale: LocaleId;
    content?: string
  }
  interface CreateLink { 
    type: "internal" | "external" | string;
    value: string;
    locales: LocaleId[];
    labelValue: LocalisedContent; 
    articles: ArticleId[]
  }
  
  interface CreateWorkflow { 
    value: string;
    locales: LocaleId[]; 
    labelValue: LocalisedContent;
    articles: ArticleId[];
    devMode: boolean | undefined 
  }
  interface CreateRelease {
    name: string,
    note?: string
  }
  
  interface CreateBuilder {
    site(): Promise<Site>;
    importData(init: string): Promise<void>;
    release(init: CreateRelease): Promise<Release>;
    locale(init: CreateLocale): Promise<SiteLocale>;
    article(init: CreateArticle): Promise<Article>;
    page(init: CreatePage): Promise<Page>;
    link(init: CreateLink): Promise<Link>;
    workflow(init: CreateWorkflow): Promise<Workflow>;
  }
  interface DeleteBuilder {
    locale(id: LocaleId): Promise<void>;
    article(id: ArticleId): Promise<void>;
    page(id: PageId): Promise<void>;
    link(id: LinkId): Promise<void>;
    linkArticlePage(link: LinkId, article: ArticleId, locale: Locale): Promise<void>;
    workflow(id: WorkflowId): Promise<void>;
    workflowArticlePage(workflow: WorkflowId, article: ArticleId, locale: Locale): Promise<void>;
    
  }
  interface UpdateBuilder {
    locale(article: LocaleMutator): Promise<SiteLocale>;
    article(article: ArticleMutator): Promise<Article>;
    pages(pages: PageMutator[]): Promise<Page[]>;
    link(link: LinkMutator): Promise<Link>;
    workflow(workflow: WorkflowMutator): Promise<Workflow>;
  }
  interface Store {
    fetch<T>(path: string, init?: RequestInit): Promise<T>;
  }
  
  interface ErrorMsg {
    id: string;
    value: string;
  }

  interface ErrorProps {
    text: string;
    status: number;
    errors: any[];
  }
}

export default CMS;