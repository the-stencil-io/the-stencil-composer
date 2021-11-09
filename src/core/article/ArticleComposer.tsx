import React from 'react';
import { createStyles, makeStyles } from '@mui/styles';
import { Theme, TextField, InputLabel, FormControl, MenuItem, Select } from '@mui/material';
import { FormattedMessage } from 'react-intl';

import { StyledDialog } from '../styles/StyledDialog';
import { Composer, StencilClient } from '../context';


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    select: {
      marginTop: theme.spacing(2),
      color: theme.palette.primary.contrastText,
      backgroundColor: theme.palette.background.paper
    }
  }),
);



const ArticleComposer: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const classes = useStyles();
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

  const articles: StencilClient.Article[] = Object.values(session.site.articles);

  return (
    <StyledDialog open={true} onClose={onClose} color="article.main" title="article.composer.title"
      submit={{ title: "article.create", onClick: handleCreate, disabled: !name }}>
      <>
        <FormControl variant="outlined" className={classes.select} fullWidth>
          <InputLabel><FormattedMessage id='article.composer.parent' /></InputLabel>
          <Select
            value={parentId}
            onChange={({ target }) => setParentId(target.value as any)}
            label={<FormattedMessage id='article.composer.parent' />}
          >
            {articles.map((article, index) => (
              <MenuItem key={index} value={article.id}>{article.body.order}{"_"}{article.body.name}</MenuItem>
            ))}
            <MenuItem value={""}><FormattedMessage id='article.composer.parent.unselected' /></MenuItem>
          </Select>
        </FormControl>
        
        <TextField
          fullWidth
          className={classes.select}
          value={order}
          type={"number"}
          variant="outlined"
          placeholder="100"
          helperText={<FormattedMessage id='article.composer.orderhelper' />}
          onChange={({ target }) => setOrder(target.value as any)}
        />

        <TextField
          className={classes.select}
          label={<FormattedMessage id='article.name' />}
          variant="outlined"
          fullWidth
          required
          value={name}
          onChange={({ target }) => setName(target.value)} />
      </>
    </StyledDialog>
  );
}

export { ArticleComposer }