import createMock from './mock';
import createService from './impl';


declare namespace StencilClient {

  type PageId = string;
  type LinkId = string;
  type ArticleId = string;
  type WorkflowId = string;
  type LocaleId = string;
  type Locale = string;
  type LocalisedMarkdown = string;
  type LocalisedContent = string;
  type ReleaseId = string;
  type TemplateId = string;
  type LinkType = "internal" | "external" | "phone";
  type TemplateType = "page";


  interface Site {
    name: string,
    contentType: "OK" | "NOT_CREATED" | "EMPTY" | "ERRORS" | "NO_CONNECTION",
    locales: Record<string, SiteLocale>,
    pages: Record<PageId, Page>,
    links: Record<LinkId, Link>,
    articles: Record<ArticleId, Article>,
    workflows: Record<WorkflowId, Workflow>,
    releases: Record<ReleaseId, Release>,
    templates: Record<TemplateId, Template>
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

  interface Template {
    id: TemplateId,
    body: {
      templateType: TemplateType,
      name: string,
      description: string
      content: string,
    }
  }

  interface TemplateMutator {
    id: TemplateId,
    templateType: TemplateType,
    name: string,
    description: string
    content: string,
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
      locales: LocaleReleaseItem[];
      articles: ArticleReleaseItem[];
      links: LinkReleaseItem[];
      workflows: WorkflowReleaseItem[];
      pages: PageReleaseItem[];
    }
  }

  interface LinkReleaseItem extends ReleaseItem {
    value: string;
    contentType: string;
    articles: string;
    labels: LocaleLabel[];
  }
  interface WorkflowReleaseItem extends ReleaseItem {
    value: string; // pointer to actual workflow
    articles: string[];
    labels: LocaleLabel[];
  }
  interface LocaleReleaseItem extends ReleaseItem {
    value: string; // language code
  }
  interface ArticleReleaseItem extends ReleaseItem {
    name: string;
    parentId?: string;
  }
  interface PageReleaseItem extends ReleaseItem {
    locale: string;
    h1: string;
  }
  interface ReleaseItem {
    id: string;
    hash: string;
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
      devMode?: boolean
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
    getReleaseContent(release: Release): Promise<{}>,

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
  interface CreateTemplate {
    templateType: "page" | string;
    name: string,
    description: string;
    content: string;
    created?: string,
  }
  
  interface CreateLink {
    type: "internal" | "external" | string;
    value: string;
    labels: LocaleLabel[];
    articles: ArticleId[];
  }

  interface CreateWorkflow {
    value: string;
    labels: LocaleLabel[];
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
    template(init: CreateTemplate): Promise<Template>;
    workflow(init: CreateWorkflow): Promise<Workflow>;
  }
  interface DeleteBuilder {
    locale(id: LocaleId): Promise<void>;
    article(id: ArticleId): Promise<void>;
    page(id: PageId): Promise<void>;
    link(id: LinkId): Promise<void>;
    template(id: TemplateId): Promise<void>;
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
    template(template: TemplateMutator): Promise<Template>;
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

namespace StencilClient {
  export const mock = (): Service => {
    return createMock();
  };
  export const service = (init: { store?: Store, url?: string }): Service => {
    return createService(init);
  };


  export class StoreError extends Error {
    private _props: ErrorProps;

    constructor(props: ErrorProps) {
      super(props.text);
      this._props = {
        text: props.text,
        status: props.status,
        errors: parseErrors(props.errors)
      };


      ///children.errors
    }
    get name() {
      return this._props.text;
    }
    get status() {
      return this._props.status;
    }
    get errors() {
      return this._props.errors;
    }
  }
}


const getErrorMsg = (error: any) => {
  if (error.msg) {
    return error.msg;
  }
  if (error.value) {
    return error.value
  }
  if (error.message) {
    return error.message;
  }
}

const getErrorId = (error: any) => {
  if (error.id) {
    return error.id;
  }
  if (error.code) {
    return error.code
  }
  return "";
}


const parseErrors = (props: any): StencilClient.ErrorMsg[] => {
  if (!props) {
    return []
  }

  if (props.appcode) {
    return [
      { id: props.appcode, value: props.appcode }
    ]
  }


  if (!props.map) {
    return [];
  }
  const result: StencilClient.ErrorMsg[] = props.map((error: any) => ({
    id: getErrorId(error),
    value: getErrorMsg(error)
  }));

  return result;
}

export default StencilClient;



