import React from 'react';

import StencilStyles from '../styles';
import { Composer, StencilClient } from '../context';



const ArticleLinksComposer: React.FC<{ articleId: StencilClient.ArticleId }> = (props) => {
  const { service, actions, site, session } = Composer.useComposer();
  const layout = Composer.useLayout();
  const view = session.getArticleView(props.articleId);

  const links: StencilClient.Link[] = Object.values(site.links)
    .map((w) => ({ w, name: session.getLinkName(w.id)?.name }))
    .sort((a, b) => a.name.localeCompare(b.name))
    .map((w) => w.w);

  const handleSave = (selectedLinks: string[]) => {
    const article = site.articles[props.articleId]
    const entity: StencilClient.ArticleMutator = {
      articleId: article.id,
      name: article.body.name,
      parentId: article.body.parentId,
      order: article.body.order,
      links: [...selectedLinks],
      workflows: undefined
    };
    service.update().article(entity)
      .then(_success => actions.handleLoadSite());
  }

  const articleName = site.articles[props.articleId].body.name;

  return (
    <>
      <StencilStyles.TransferList
        title="articlelinks"
        titleArgs={{ name: articleName }}
        searchTitle="link.search.title"
        selectedTitle="article.links.selectedlinks"
        headers={["link.value", "link.type"]}
        rows={links.map(row => row.id)}
        filterRow={(row, search) => {
          const link = site.links[row];
          return link.body.value.toLowerCase().indexOf(search) > -1;
        }}
        renderCells={(row) => [session.getLinkName(site.links[row].id)?.name, site.links[row].body.contentType]}
        selected={view.links
          .map((w) => ({ w, name: session.getLinkName(w.link.id)?.name }))
          .sort((a, b) => a.name.localeCompare(b.name))
          .map((w) => w.w)
          .map(l => l.link.id)
        }
        cancel={{
          label: 'button.cancel',
          onClick: () => layout.actions.handleTabCloseCurrent()
        }}
        submit={{
          label: "button.apply",
          disabled: false,
          onClick: handleSave
        }}
      />
    </>
  );
}

export { ArticleLinksComposer }
