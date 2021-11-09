import Composer from './ide';
import StencilClient from '../client';

class SiteCache {
  private _site: StencilClient.Site;
  private _articles: Record<StencilClient.ArticleId, Composer.ArticleView> = {};
  private _pagesByArticle: Record<StencilClient.ArticleId, Composer.PageView[]> = {};
  private _linksByArticle: Record<StencilClient.ArticleId, Composer.LinkView[]> = {};
  private _workflowsByArticle: Record<StencilClient.ArticleId, Composer.WorkflowView[]> = {};

  constructor(site: StencilClient.Site) {
    this._site = site;
    Object.values(site.pages).sort((l0, l1) => l0.body.locale.localeCompare(l1.body.locale)).forEach(page => this.visitPage(page))
    Object.values(site.links).sort((l0, l1) => l0.body.contentType.localeCompare(l1.body.contentType)).forEach(link => this.visitLink(link))
    Object.values(site.workflows).sort((l0, l1) => l0.body.value.localeCompare(l1.body.value)).forEach(workflow => this.visitWorkflow(workflow))
    Object.values(site.articles).sort((l0, l1) => l0.body.order - l1.body.order).forEach(article => this.visitArticle(article))
  }
  
  getArticles() {
    return this._articles;
  }
  
  private visitPage(page: StencilClient.Page) {
    const site = this._site;
    const view = new ImmutablePageView({ page, locale: site.locales[page.body.locale] });
    const articleId = page.body.article;  
    let articlePages = this._pagesByArticle[articleId];
    if (!articlePages) {
      articlePages = [];
      this._pagesByArticle[articleId] = articlePages;
    }
    articlePages.push(view);  
  }

  private visitLink(link: StencilClient.Link) {
    const site = this._site;
    const view = new ImmutableLinkView({
      link,
      labels: link.body.labels.map(l => (new ImmutableLabelView({ label: l, locale: site.locales[l.locale] })))
    });

    for (const articleId of link.body.articles) {
      let articleLinks = this._linksByArticle[articleId];
      if (!articleLinks) {
        articleLinks = [];
        this._linksByArticle[articleId] = articleLinks;
      }
      articleLinks.push(view);
    }
  }
  private visitWorkflow(workflow: StencilClient.Workflow) {
    const site = this._site;
    const view = new ImmutableWorkflowView({
      workflow,
      labels: workflow.body.labels.map(l => (new ImmutableLabelView({ label: l, locale: site.locales[l.locale] })))
    });

    for (const articleId of workflow.body.articles) {
      let articleWorkflows = this._workflowsByArticle[articleId];
      if (!articleWorkflows) {
        articleWorkflows = [];
        this._workflowsByArticle[articleId] = articleWorkflows;
      }
      articleWorkflows.push(view);
    }
  }
  private visitArticle(article: StencilClient.Article) {
    const articleId = article.id;
    const site = this._site;
    const pages: Composer.PageView[] = Object.values(site.pages)
      .filter(page => articleId === page.body.article)
      .map(page => new ImmutablePageView({ page, locale: site.locales[page.body.locale] }));
    
    const links: Composer.LinkView[] = this.empty(this._linksByArticle[articleId]);
    const workflows: Composer.WorkflowView[] = this.empty(this._workflowsByArticle[articleId]);

    const canCreate: StencilClient.SiteLocale[] = Object.values(site.locales).filter(locale => pages.filter(p => p.page.body.locale === locale.id).length === 0);
    const view = new ImmutableArticleView({ 
      article, pages, canCreate, 
      links, 
      workflows 
    });
    this._articles[articleId] = view;
  }
  
  private empty<T>(arrayType:T) {
    return arrayType ? arrayType : [];
  }
}


class SessionData implements Composer.Session {
  private _site: StencilClient.Site;
  private _pages: Record<StencilClient.PageId, Composer.PageUpdate>;
  private _cache: SiteCache;

  constructor(props: {
    site?: StencilClient.Site,
    pages?: Record<StencilClient.PageId, Composer.PageUpdate>,
    cache?: SiteCache;
  }) {

    this._site = props.site ? props.site : { name: "", contentType: "OK", releases: {}, articles: {}, links: {}, locales: {}, pages: {}, workflows: {} };
    this._pages = props.pages ? props.pages : {};
    this._cache = props.cache ? props.cache : new SiteCache(this._site);
  }

  getArticleView(articleId: StencilClient.ArticleId): Composer.ArticleView {
    return this._cache.getArticles()[articleId];
  }
  get site() {
    return this._site;
  }
  get pages() {
    return this._pages;
  }
  getArticlesForLocale(locale: StencilClient.LocaleId): StencilClient.Article[] {
    const pages = Object.values(this._site.pages)
    return locale ? Object.values(this._site.articles).filter(article => {
      for (const page of pages) {
        if (page.body.article === article.id && page.body.locale === locale) {
          return true;
        }
      }
      return false;
    }) : []
  }
  getArticlesForLocales(locales: StencilClient.LocaleId[]): StencilClient.Article[] {
    const pages = Object.values(this._site.pages)
    return locales && locales.length > 0 ? Object.values(this._site.articles).filter(article => {
      for (const page of pages) {
        if (page.body.article === article.id && locales.includes(page.body.locale)) {
          return true;
        }
      }
      return false;
    }) : []
  }

  withSite(site: StencilClient.Site) {
    return new SessionData({ site: site });
  }
  withoutPages(pageIds: StencilClient.PageId[]): Composer.Session {
    const pages = {};
    for (const page of Object.values(this._pages)) {
      if (pageIds.includes(page.origin.id)) {
        continue;
      }
      pages[page.origin.id] = page;
    }
    return new SessionData({ site: this._site, pages, cache: this._cache });
  }
  withPage(page: StencilClient.PageId): Composer.Session {
    if (this._pages[page]) {
      return this;
    }
    const pages = Object.assign({}, this._pages);
    const origin = this._site.pages[page];
    pages[page] = new ImmutablePageUpdate({ origin, saved: true, value: origin.body.content });
    return new SessionData({ site: this._site, pages, cache: this._cache });
  }
  withPageValue(page: StencilClient.PageId, value: StencilClient.LocalisedContent): Composer.Session {
    const session = this.withPage(page);
    const pageUpdate = session.pages[page];

    const pages = Object.assign({}, session.pages);
    pages[page] = pageUpdate.withValue(value);

    return new SessionData({ site: session.site, pages, cache: this._cache });
  }
}

class ImmutablePageUpdate implements Composer.PageUpdate {
  private _saved: boolean;
  private _origin: StencilClient.Page;
  private _value: StencilClient.LocalisedContent;

  constructor(props: {
    saved: boolean;
    origin: StencilClient.Page;
    value: StencilClient.LocalisedContent;
  }) {
    this._saved = props.saved;
    this._origin = props.origin;
    this._value = props.value;
  }

  get saved() {
    return this._saved;
  }
  get origin() {
    return this._origin;
  }
  get value() {
    return this._value;
  }
  withValue(value: StencilClient.LocalisedContent): Composer.PageUpdate {
    return new ImmutablePageUpdate({ saved: false, origin: this._origin, value });
  }
}

class ImmutableTabData implements Composer.TabData {
  private _nav: Composer.Nav;

  constructor(props: { nav: Composer.Nav }) {
    this._nav = props.nav;
  }
  get nav() {
    return this._nav;
  }
  withNav(nav: Composer.Nav) {
    return new ImmutableTabData({
      nav: {
        type: nav.type,
        value: nav.value === undefined ? this._nav.value : nav.value,
        value2: nav.value2 === undefined ? this._nav.value2 : nav.value2
      }
    });
  }
}

class ImmutableArticleView implements Composer.ArticleView {
  private _article: StencilClient.Article;
  private _pages: Composer.PageView[];
  private _canCreate: StencilClient.SiteLocale[];
  private _links: Composer.LinkView[];
  private _workflows: Composer.WorkflowView[];

  constructor(props: {
    article: StencilClient.Article;
    pages: Composer.PageView[];
    canCreate: StencilClient.SiteLocale[];
    links: Composer.LinkView[];
    workflows: Composer.WorkflowView[];
  }) {
    this._article = props.article;
    this._pages = props.pages;
    this._canCreate = props.canCreate;
    this._links = props.links;
    this._workflows = props.workflows;
  }

  get article(): StencilClient.Article { return this._article };
  get pages(): Composer.PageView[] { return this._pages };
  get canCreate(): StencilClient.SiteLocale[] { return this._canCreate };
  get links(): Composer.LinkView[] { return this._links };
  get workflows(): Composer.WorkflowView[] { return this._workflows };
}

class ImmutablePageView implements Composer.PageView {
  private _page: StencilClient.Page;
  private _locale: StencilClient.SiteLocale;

  constructor(props: {
    page: StencilClient.Page;
    locale: StencilClient.SiteLocale;
  }) {
    this._page = props.page;
    this._locale = props.locale;
  }

  get page(): StencilClient.Page { return this._page };
  get locale(): StencilClient.SiteLocale { return this._locale };
}


class ImmutableLinkView implements Composer.LinkView {
  private _link: StencilClient.Link;
  private _labels: Composer.LabelView[];

  constructor(props: {
    link: StencilClient.Link;
    labels: Composer.LabelView[];
  }) {
    this._link = props.link;
    this._labels = props.labels;
  }

  get link(): StencilClient.Link { return this._link };
  get labels(): Composer.LabelView[] { return this._labels };
}

class ImmutableWorkflowView implements Composer.WorkflowView {
  private _workflow: StencilClient.Workflow;
  private _labels: Composer.LabelView[];

  constructor(props: {
    workflow: StencilClient.Workflow;
    labels: Composer.LabelView[];
  }) {
    this._workflow = props.workflow;
    this._labels = props.labels;
  }

  get workflow(): StencilClient.Workflow { return this._workflow };
  get labels(): Composer.LabelView[] { return this._labels };
}

class ImmutableLabelView implements Composer.LabelView {
  private _label: StencilClient.LocaleLabel;
  private _locale: StencilClient.SiteLocale;

  constructor(props: {
    label: StencilClient.LocaleLabel;
    locale: StencilClient.SiteLocale;
  }) {
    this._label = props.label;
    this._locale = props.locale;
  }

  get locale(): StencilClient.SiteLocale { return this._locale };
  get label(): StencilClient.LocaleLabel { return this._label };
}


export { SessionData, ImmutableTabData };
