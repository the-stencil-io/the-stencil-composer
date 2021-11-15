import React from 'react';

import StencilStyles from '../styles';
import { Composer, StencilClient } from '../context';


const ArticleComposer: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const { service, actions, session } = Composer.useComposer();

  const [name, setName] = React.useState("");
  const [order, setOrder] = React.useState(0);
  const [parentId, setParentId] = React.useState("");

  const handleCreate = () => {
    const entity: StencilClient.CreateArticle = { name, parentId, order };
    console.log("entity", entity)
    service.create().article(entity).then(success => {
      console.log(success)
      onClose();
      actions.handleLoadSite();
    });
  }

  const articles: { id: string, value: string }[] = Object.values(session.site.articles)
    .map(article => ({
      id: article.id,
      value: `${article.body.order}_${article.body.name}`
    }));

  return (
    <StencilStyles.Dialog open={true} onClose={onClose}
      backgroundColor="uiElements.main" title="article.composer.title"
      submit={{ title: "article.create", onClick: handleCreate, disabled: !name }}>
      <>
        <StencilStyles.Select label="article.composer.parent"
          selected={parentId} onChange={setParentId} items={articles}
          empty={{ id: "", label: 'article.composer.parent.unselected' }}
        />
        <StencilStyles.NumberField label="article.order" helperText='article.composer.orderhelper'
          onChange={setOrder}
          value={order}
          placeholder={100}
        />
        <StencilStyles.TextField label="article.name" required
          value={name}
          onChange={setName}
        />
      </>
    </StencilStyles.Dialog>
  );
}

export { ArticleComposer }