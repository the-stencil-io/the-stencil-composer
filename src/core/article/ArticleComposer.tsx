import React from 'react';
import { ListItemText } from '@mui/material';
import StencilStyles from '../styles';
import { Composer, StencilClient } from '../context';

const DUMMY_ID = "none-selected"

const ArticleComposer: React.FC<{ onClose: () => void }> = ({ onClose }) => {

  const { service, actions, session } = Composer.useComposer();

  const [name, setName] = React.useState("");
  const [order, setOrder] = React.useState(0);
  const [parentId, setParentId] = React.useState("");

  const handleCreate = () => {
    const entity: StencilClient.CreateArticle = { name, parentId: parentId && parentId !== DUMMY_ID ? parentId: undefined, order };
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
      value: `${article.body.name}`
    }));


  return (
    <StencilStyles.Dialog open={true} onClose={onClose}
      backgroundColor="uiElements.main" title="article.composer.title"
      submit={{ title: "article.create", onClick: handleCreate, disabled: !name }}>
      <>

        <StencilStyles.Select label="article.composer.parent"
          helperText={"article.parent.helper"}
          selected={parentId} 
          onChange={setParentId}
          empty={{ id: DUMMY_ID, label: 'article.composer.parent.unselected' }}
          items={articles.map((article) => ({
            id: article.id,
            value: (<ListItemText primary={article.value} />)
          }))}
        />

        <StencilStyles.NumberField label="article.order" helperText='article.composer.orderhelper'
          onChange={setOrder}
          value={order}
          placeholder={400}
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