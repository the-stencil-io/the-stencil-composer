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
    contentType: "OK" | "NOT_CREATED" | "EMPTY" | "ERRORS",
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
    order: number
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
      content: LocalisedContent, //url, phone number
      locale: Locale,
      description: string //text that user sees
    }
  }
  
  interface LinkMutator {
    linkId: LinkId,
    content: LocalisedContent, 
    locale: Locale, 
    type: LinkType,
    description: string,
    articles: ArticleId[],
  }

  interface Workflow {
    id: WorkflowId,
    body: {
      articles: ArticleId[],
      name: string,
      locale: Locale,
      content: LocalisedContent
    }
  }
  
  interface WorkflowMutator {
    workflowId: WorkflowId, 
    name: string, 
    locale: Locale, 
    content: LocalisedContent,
    articles: ArticleId[]
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
    locale: Locale;
    content?: string
  }
  interface CreateLink { 
    type: "internal" | "external";
    value: string;
    locale: Locale;
    description: string; 
  }
  interface CreateWorkflow { 
    name: string;
    locale: Locale; 
    content: string; 
  }
  interface CreateRelease {
    name: string,
    note?: string
  }
  
  interface CreateBuilder {
    site(): Promise<Site>;
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