import React from 'react';

import StencilStyles from '../styles';
import { Composer, StencilClient } from '../context';


const selectSub = { ml: 2, color: "article.dark" }

const ArticleEdit: React.FC<{ articleId: StencilClient.ArticleId, onClose: () => void }> = ({ articleId, onClose }) => {
  const { service, actions, session } = Composer.useComposer();

  const { site } = session;
  const article = site.articles[articleId];
  const [name, setName] = React.useState(article.body.name);
  const [order, setOrder] = React.useState(article.body.order);
  const [parentId, setParentId] = React.useState(article.body.parentId);

  const handleUpdate = () => {
    const entity: StencilClient.ArticleMutator = { articleId: article.id, name, parentId, order, links: undefined, workflows: undefined };
    service.update().article(entity).then(_success => {
      onClose();
      actions.handleLoadSite();
    });
  }

  const articles: { id: string, value: string }[] = Object.values(site.articles)
    .sort((a1, a2) => {
      if (a1.body.parentId && a1.body.parentId === a2.body.parentId) {
        const children = a1.body.order - a2.body.order;
        if (children === 0) {
          return a1.body.name.localeCompare(a2.body.name);
        }
        return children;
      }

      return (a1.body.parentId ? site.articles[a1.body.parentId].body.order + 1 : a1.body.order)
        - (a2.body.parentId ? site.articles[a2.body.parentId].body.order + 1 : a2.body.order);
    })
    .map(article => ({
      id: article.id,
      value: `${article.body.order} - ${article.body.parentId ? site.articles[article.body.parentId].body.name + "/" : ""}${article.body.name}`,
      sx: article.body.parentId ? selectSub : undefined
    }));

  return (<StencilStyles.Dialog open={true} onClose={onClose}
    backgroundColor="uiElements.main"
    title="article.edit.title"
    submit={{ title: "button.update", onClick: handleUpdate, disabled: !name }}>
    <>
      <StencilStyles.Select label="article.edit.parent" onChange={setParentId}
        selected={parentId ? parentId : ''}
        items={articles}
        empty={{ id: "", label: "article.composer.parent.unselected" }}
      />
      <StencilStyles.NumberField label="order" helperText="article.edit.orderhelper" placeholder={100} value={order} onChange={setOrder} />
      <StencilStyles.TextField label="article.name" required value={name} onChange={setName} />
    </>
  </StencilStyles.Dialog>);
}

export { ArticleEdit }


