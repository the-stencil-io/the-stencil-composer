import API from '../';

const articles: API.CMS.Article[] = [
  { id: "a1", body: { order: 100, name: "residence", }},
  { id: "a1.1", body: { order: 100, parentId: "a1", name: "utilities" }},
  { id: "a1.2", body: { order: 200, parentId: "a1", name: "new_address" }},
  { id: "a1.3", body: { order: 300, parentId: "a1", name: "renovation" }},
  { id: "a1.4", body: { order: 400, parentId: "a1", name: "new_home_construction" }},
  { id: "a1.5", body: { order: 500, parentId: "a1", name: "social_housing" }},


  { id: "a2", body: { order: 200, name: "health_services", }},
  { id: "a2.1", body: { order: 100, parentId: "a2", name: "hospitals" }},
  { id: "a2.2", body: { order: 200, parentId: "a2", name: "emergency_care" }},
  { id: "a2.3", body: { order: 300, parentId: "a2", name: "specialist_services" }},
  { id: "a2.4", body: { order: 400, parentId: "a2", name: "elder_care" }},
  { id: "a2.5", body: { order: 500, parentId: "a2", name: "mental_health" }},
];

const pages: API.CMS.Page[] = [
  { id: "p1", body: { article: "a1", content: "# Residence topic", locale: "en"}, created: "04-11-2020", modified: "05-11-2020" },
  { id: "p2", body: { article: "a1", content: "# Asuinpaikka", locale: "fi"}, created: "04-11-2020", modified: "06-11-2020" },
  { id: "p3", body: { article: "a1.1", content: "# Utilities", locale: "en"}, created: "09-10-2020", modified: "09-11-2020" },
  { id: "p4", body: { article: "a1.1", content: "# apuohjelmat", locale: "fi"}, created: "10-12-2020", modified: "12-12-2020" },
  { id: "p5", body: { article: "a1.2", content: "# Registering new address", locale: "en"}, created: "04-11-2020", modified: "05-11-2020" },
  { id: "p6", body: { article: "a1.2", content: "# Osoitetiedot", locale: "fi"}, created: "04-11-2020", modified: "05-11-2020" },
  { id: "p7", body: { article: "a1.3", content: "# Renovation permits", locale: "en"}, created: "17-04-2020", modified: "24-04-2020" },
  { id: "p8", body: { article: "a1.4", content: "# Uuden kodin rakentaminen", locale: "fi"}, created: "04-11-2020", modified: "05-11-2020" },
  { id: "p9", body: { article: "a1.5", content: "# Sosiaalinen asunto", locale: "fi"}, created: "01-01-2020", modified: "16-02-2020" },


  { id: "p10", body: { article: "a2", content: "# Healthcare and services", locale: "en"}, created: "04-11-2020", modified: "05-11-2020" },
  { id: "p11", body: { article: "a2", content: "# Terveydenhuolto ja palvelut", locale: "fi"}, created: "04-11-2020", modified: "06-11-2020" },
  { id: "p12", body: { article: "a2.1", content: "# Hospitals around the city", locale: "en"}, created: "09-10-2020", modified: "09-11-2020" },
  { id: "p13", body: { article: "a2.1", content: "# sairaala", locale: "fi"}, created: "10-12-2020", modified: "12-12-2020" },
  { id: "p14", body: { article: "a2.2", content: "# Emergency", locale: "en"}, created: "04-11-2020", modified: "05-11-2020" },
  { id: "p15", body: { article: "a2.2", content: "# Hätä", locale: "fi"}, created: "04-11-2020", modified: "05-11-2020" },
  { id: "p16", body: { article: "a2.3", content: "# Elderly care services", locale: "en"}, created: "17-04-2020", modified: "24-04-2020" },
  { id: "p17", body: { article: "a2.4", content: "# Vanhustenhoito", locale: "fi"}, created: "04-11-2020", modified: "05-11-2020" },
  { id: "p18", body: { article: "a2.5", content: "# Mielenterveys", locale: "fi"}, created: "01-01-2020", modified: "16-02-2020" },
];

const links: API.CMS.Link[] = [
  { id: "l1", body: { articles: ["a1", "a2", "a2.4"], contentType: "internal", description: "new housing developments", content: "http://www.housing-sipoo.fi/fi", locale: "fi" }},
  { id: "l2", body: { articles: ["a1"], contentType: "internal", description: "new housing developments", content: "http://www.housing-sipoo.fi/en", locale: "en" }},
  { id: "l3", body: { articles: ["a1"], contentType: "external", description: "move to finland", content: "http://www.finland.fi", locale: "fi" }},
  { id: "l4", body: { articles: ["a1"], contentType: "phone", description: "office phone", content: "+664-5277-7733", locale: "en" }},
  { id: "l5", body: { articles: ["a1"], contentType: "phone", description: "päätilintarkastajan puhelin", content: "+664-4321-1223", locale: "fi" }},
  { id: "l6", body: { articles: ["a1"], contentType: "internal", description: "about the service", content: "http://www.us/service/about", locale: "en" }},
  { id: "l7", body: { articles: ["a2"], contentType: "phone", description: "secretary phone", content: "+664-4185-6512", locale: "fi" }},
  { id: "l8", body: { articles: ["a2"], contentType: "phone", description: "manager phone", content: "+124-2241-1188", locale: "en" }},
  { id: "l9", body: { articles: ["a2"], contentType: "internal", description: "hospital information", content: "http://www.hospitals.com", locale: "fi" }},
  { id: "l10", body: { articles: ["a2"], contentType: "external", description: "terveys", content: "http://www.health.fi", locale: "fi" }},
  { id: "l11", body: { articles: ["a2"], contentType: "internal", description: "elder care", content: "http://www.vanhukset.fi", locale: "fi" }},
  { id: "l12", body: { articles: ["a2"], contentType: "phone", description: "secretary phone", content: "+664-4185-6512", locale: "fi" }},
  { id: "l13", body: { articles: ["a2"], contentType: "phone", description: "manager phone", content: "+124-2241-1188", locale: "en" }},
  { id: "l14", body: { articles: ["a2"], contentType: "internal", description: "general information", content: "http://www.example.com", locale: "fi" }},
  { id: "l15", body: { articles: ["a2"], contentType: "external", description: "vocational training", content: "http://www.adult-learning.com", locale: "fi" }},
  { id: "l16", body: { articles: ["a2"], contentType: "internal", description: "education", content: "http://www.learn.fi", locale: "fi" }},


];

const workflows: API.CMS.Workflow[] = [
  { id: "w1", body: { articles: ["a1"], name: "generalProcess1", content: "General Inquiry", locale: "en" }},
  { id: "w2", body: { articles: ["a1"], name: "greatFlow", content: "Default Form", locale: "en" }},
  { id: "w3", body: { articles: ["a1"], name: "inquiryMgr", content: "Super good question", locale: "en" }},
  { id: "w4", body: { articles: ["a1.2"], name: "generalProcess1", content: "General Process", locale: "fi" }},
  { id: "w5", body: { articles: ["a1.3"], name: "greatFlow", content: "Default Flow", locale: "en" }},
  { id: "w6", body: { articles: ["a1.3"], name: "inquiryMgr", content: "General Question", locale: "fi" }},
];

const locales: API.CMS.SiteLocale[] = [
  { id: "l1", body: { enabled: true, value: "fi" }},
  { id: "l2", body: { enabled: true, value: "sv" }},
  { id: "l3", body: { enabled: false, value: "en" }}
]
const releases: API.CMS.Release[] = [
  { id: "r3", body: {name: "LATEST", note: "" }, created: "03/10/2021"},
  { id: "r1", body: {name: "v1.5", note: "super note here" }, created: "04/02/2021"},
  { id: "r2", body: {name: "v1.6", note: "Even better note here" }, created: "12/02/2021"},

];
const getSite = async (): Promise<API.CMS.Site> => {
  return {
    name: "mock", contentType: "OK",
    releases: toRecord(releases),
    pages: toRecord(pages),
    links: toRecord(links),
    articles: toRecord(articles),
    workflows: toRecord(workflows),
    locales: toRecord(locales),
  };
}
const createMock = (): API.CMS.Service => {

  return {
    getSite,
    create: () => new MockCreateBuilder(),
    update: () => new MockUpdateBuilder(),
    delete: () => new MockDeleteBuilder()
  } as any;
}

class MockCreateBuilder implements API.CMS.CreateBuilder {
  async site(): Promise<API.CMS.Site> {
    return getSite();
  }
  async importData(init: string): Promise<void> {
    return init as any;
  }
  async release(init: API.CMS.CreateRelease): Promise<API.CMS.Release> {
    return init as any;
  }
  async locale(init: API.CMS.CreateLocale): Promise<API.CMS.SiteLocale> {
    return init as any;
  }
  async article(init: API.CMS.CreateArticle): Promise<API.CMS.Article> {
    return init as any;
  }
  async page(init: API.CMS.CreatePage): Promise<API.CMS.Page> {
    return init as any;
  }
  async link(init: API.CMS.CreateLink): Promise<API.CMS.Link> {
    return init as any;
  }
  async workflow(init: API.CMS.CreateWorkflow): Promise<API.CMS.Workflow> {
    return init as any;
  }
}

class MockUpdateBuilder implements API.CMS.UpdateBuilder {
  async locale(init: API.CMS.LocaleMutator): Promise<API.CMS.SiteLocale> {
    return init as any;
  }
  async article(init: API.CMS.ArticleMutator): Promise<API.CMS.Article> {
    return init as any;
  }
  async pages(init: API.CMS.PageMutator[]): Promise<API.CMS.Page[]> {
    console.log("saving pages", init);
    return init as any;
  }
  async link(init: API.CMS.LinkMutator): Promise<API.CMS.Link> {
    return init as any;
  }
  async workflow(init: API.CMS.WorkflowMutator): Promise<API.CMS.Workflow> {
    return init as any;
  }
}

class MockDeleteBuilder implements API.CMS.DeleteBuilder {
  async locale(init: API.CMS.LocaleId): Promise<void> {
    return init as any;
  }
  async article(init: API.CMS.ArticleId): Promise<void> {
    return init as any;
  }
  async page(init: API.CMS.PageId): Promise<void> {
    return init as any;
  }
  async link(init: API.CMS.LinkId): Promise<void> {
    return init as any;
  }
  async workflow(init: API.CMS.WorkflowId): Promise<void> {
    return init as any;
  }
  async workflowArticlePage(workflow: API.CMS.WorkflowId, article: API.CMS.ArticleId, locale: API.CMS.Locale): Promise<void> {
    const body = {workflow, article, locale};
    console.log("delete workflow article", body);
  }
  async linkArticlePage(link: API.CMS.LinkId, article: API.CMS.ArticleId, locale: API.CMS.Locale): Promise<void> {
    const body = {link, article, locale};
    console.log("delete link article", body);
  }
}


const toRecord = (entities: { id: string }[]): Record<string, any> => {
  const result: Record<string, any> = {};
  for (const entity of entities) {
    result[entity.id] = entity;
  }
  return result;
}

export default createMock;