import React from 'react';
import { ListItemText, Checkbox } from '@mui/material';

import StencilStyles from '../styles';
import { Composer, StencilClient } from '../context';
import { LocaleLabels } from '../locale';

const linkTypes: StencilClient.LinkType[] = ["internal", "external", "phone"];

interface LinkEditProps {
  linkId: StencilClient.LinkId,
  onClose: () => void,
}

const LinkEdit: React.FC<LinkEditProps> = ({ linkId, onClose }) => {
  const { service, actions, session, site } = Composer.useComposer();
  const link = site.links[linkId];

  const [value, setValue] = React.useState(link.body.value);
  const [labels, setLabels] = React.useState(link.body.labels);
  const [changeInProgress, setChangeInProgress] = React.useState(false);
  const [contentType, setContentType] = React.useState(link.body.contentType);
  
  const [articleId, setArticleId] = React.useState<StencilClient.ArticleId[]>(link.body.articles);
  const locales = labels.map(l => l.locale);
  const articles: StencilClient.Article[] = locales ? session.getArticlesForLocales(locales) : Object.values(site.articles);


  const handleUpdate = () => {
    const entity: StencilClient.LinkMutator = { linkId: link.id, type: contentType, articles: articleId, labels, value };
    console.log("entity", entity)
    service.update().link(entity).then(success => {
      console.log(success)
      onClose();
      actions.handleLoadSite();
    });
  }

  return (<StencilStyles.Dialog open={true} onClose={onClose}
    color="link.main" title="link.edit.title"
    submit={{ title: "button.update", onClick: handleUpdate, disabled: !value || changeInProgress }}>
    <>
      <LocaleLabels
        onChange={(labels) => { setChangeInProgress(false); setLabels(labels.map(l => ({ locale: l.locale, labelValue: l.value }))); }}
        onChangeStart={() => setChangeInProgress(true)}
        selected={labels.map(label => ({ locale: label.locale, value: label.labelValue }))} />

      <StencilStyles.Select label="link.type"
        selected={contentType}
        onChange={setContentType as any}
        items={linkTypes.map(link => ({ id: link, value: link }))}
      />

      <StencilStyles.TextField label="link.content" helperText="link.composer.valuehelper" placeholder={link.body.value}
        required
        value={value}
        onChange={setValue} />

      <StencilStyles.SelectMultiple label='link.article.select' multiline
        selected={articleId}
        onChange={setArticleId}
        renderValue={(selected: StencilClient.ArticleId[]) => selected.map((articleId, index) => <div key={index}>{site.articles[articleId].body.name}</div>)}
        items={articles.map((article) => ({
          id: article.id,
          value: (<>
            <Checkbox checked={articleId.indexOf(article.id) > -1} />
            <ListItemText primary={article.body.name} />
          </>)
        }
        ))}
      />
    </>
  </StencilStyles.Dialog>
  );
}
export { LinkEdit }
