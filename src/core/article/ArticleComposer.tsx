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
    .filter((a) => !a.body.parentId)
    .sort((a1, a2) => {
      if (a1.body.parentId && a1.body.parentId === a2.body.parentId) {
        const children = a1.body.order - a2.body.order;
        if (children === 0) {
          return a1.body.name.localeCompare(a2.body.name);
        }
        return children;
      }

      return (a1.body.parentId ? session.site.articles[a1.body.parentId].body.order + 1 : a1.body.order)
        - (a2.body.parentId ? session.site.articles[a2.body.parentId].body.order + 1 : a2.body.order);
    })
    .map(article => ({
      id: article.id,
      value: `${article.body.order} - ${article.body.name}`,
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
            value: (<ListItemText primary={article.value}/>)
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