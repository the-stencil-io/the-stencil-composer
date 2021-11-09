import React from 'react';
import { createStyles, makeStyles } from '@mui/styles';
import { Theme, TextField, InputLabel, FormControl, MenuItem, Select } from '@mui/material';
import { FormattedMessage } from 'react-intl';

import { StyledDialog } from '../styles/StyledDialog';
import { Composer, StencilClient } from '../context';


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    select: {
      marginTop: theme.spacing(3),
    },
    selectSub: {
      marginLeft: theme.spacing(2),
      color: theme.palette.article.dark,
    }
  }),
);

const ArticleEdit: React.FC<{ articleId: StencilClient.ArticleId, onClose: () => void }> = ({ articleId, onClose }) => {
  const classes = useStyles();
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

  const articles: StencilClient.Article[] = Object.values(site.articles)
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
    });

  return (<>
    <StyledDialog open={true} onClose={onClose}
      color="article.main" title="article.edit.title"
      submit={{ title: "button.update", onClick: handleUpdate, disabled: !name }}>

      <>
        <FormControl variant="outlined" className={classes.select} fullWidth>
          <InputLabel ><FormattedMessage id="article.edit.parent" /></InputLabel>
          <Select
            value={parentId ? parentId : ''}
            onChange={({ target }) => setParentId(target.value as any)}
            label={<FormattedMessage id="article.edit.parent" />}
          >
            {articles.map((article, index) => (
              <MenuItem key={index} value={article.id} className={article.body.parentId ? classes.selectSub : ''}>
                {article.body.order} - {article.body.parentId ? site.articles[article.body.parentId].body.name + "/" : ""}{article.body.name}
              </MenuItem>
            ))}
            <MenuItem value={"None"}><FormattedMessage id='article.composer.parent.unselected' /></MenuItem>
          </Select>
        </FormControl>

        <TextField
          type={"number"}
          label={<FormattedMessage id="order" />}
          variant="outlined"
          placeholder="100"
          helperText={<FormattedMessage id="article.edit.orderhelper" />}
          fullWidth
          className={classes.select}
          value={order}
          onChange={({ target }) => setOrder(target.value as any)} />

        <TextField
          className={classes.select}
          label={<FormattedMessage id="article.name" />}
          variant="outlined"
          fullWidth
          required
          value={name}
          onChange={({ target }) => setName(target.value)} />
      </>
    </StyledDialog>
  </>
  );
}

export { ArticleEdit }


