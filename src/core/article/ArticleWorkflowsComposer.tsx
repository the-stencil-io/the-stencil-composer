import React from 'react';

import { Composer, StencilClient } from '../context';
import StencilStyles from '../styles';



const ArticleWorkflowsComposer: React.FC<{ articleId: StencilClient.ArticleId }> = ({ articleId }) => {

  const { service, actions, site, session } = Composer.useComposer();
  const layout = Composer.useLayout();
  
  const view = session.getArticleView(articleId);
  const workflows: StencilClient.Workflow[] = Object.values(site.workflows).sort((o1, o2) => o1.body.value.localeCompare(o2.body.value));


  const handleSave = (selectedWorkflows: string[]) => {
    const article = site.articles[articleId]
    const entity: StencilClient.ArticleMutator = {
      articleId: article.id,
      name: article.body.name,
      parentId: article.body.parentId,
      order: article.body.order,
      workflows: [...selectedWorkflows],
      links: undefined
    };
    console.log("saving selected workflows" + selectedWorkflows);
    service.update().article(entity)
    .then(_success => actions.handleLoadSite())
    .then(() => layout.actions.handleTabCloseCurrent()) 
  }

  return (
    <>
      <StencilStyles.TransferList
        title="article.workflows.siteworkflows"
        searchTitle="workflow.technicalname"
        selectedTitle="article.workflows.selectedworkflows"
        headers={["workflow.technicalname"]}
        rows={workflows.map(row => row.id)}
        filterRow={(row, search) => {
          const workflow = site.workflows[row];
          return workflow.body.value.toLowerCase().indexOf(search) > -1;
        }}
        renderCells={(row) => [site.workflows[row].body.value]}
        selected={view.workflows.map(v => v.workflow.id)}
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

export { ArticleWorkflowsComposer }

