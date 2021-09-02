import React from 'react';

import {
  makeStyles, createStyles, Theme, InputLabel, FormControl, MenuItem, Select,
  Button, Dialog, Typography, DialogTitle, DialogContent, DialogActions
} from '@material-ui/core';

import { FormattedMessage } from 'react-intl';

import { API, Ide } from '../../deps';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      fontWeight: 'bold',
    },
    select: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.background.paper
    },
  }),
);


interface NewLinkArticleProps {
  link: API.CMS.Link,
  open: boolean,
  onClose: () => void
}

const NewLinkArticle: React.FC<NewLinkArticleProps> = ({ link, onClose }) => {
  const classes = useStyles();

  const ide = Ide.useIde();
  const { site } = ide.session;
  const articles: API.CMS.Article[] = Object.values(site.articles);
  const [articleId, setArticleId] = React.useState("");
  const errors = !articleId || link.body.articles.includes(articleId);
    
  const handleUpdate = () => {
    const entity: API.CMS.LinkMutator = { 
      content: link.body.content, 
      description: link.body.description, 
      linkId: link.id, 
      locale: link.body.locale,
      type: link.body.contentType,
      articles: [...link.body.articles, articleId]
    };
      
    ide.service.update().link(entity).then(_success => {
      ide.actions.handleLoadSite().then(() => onClose());
    });
  }

  return (
    <Dialog open={true} onClose={onClose}>
      <DialogTitle><FormattedMessage id="link.article.add.title" /></DialogTitle>
      <DialogContent>
        <Typography className={classes.root}>
          <FormControl variant="outlined" className={classes.select} fullWidth>
            <InputLabel><FormattedMessage id='link.article.select' /></InputLabel>
            <Select
              value={articleId}
              onChange={({ target }) => setArticleId(target.value as any)}
              label={<FormattedMessage id='link.article.select' />}
            >
              {articles.map((article, index) => (
                <MenuItem key={index} value={article.id}>{article.body.order}{"_"}{article.body.name}</MenuItem>
              ))}
            </Select>
          </FormControl >
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button variant="text" onClick={onClose} color="primary">
          <FormattedMessage id="button.cancel" />
        </Button>
        <Button variant="contained" color="primary" autoFocus onClick={() => handleUpdate()} disabled={errors ? true : false}>
          <FormattedMessage id="button.add" />
        </Button>
      </DialogActions>
    </Dialog>
  );
}
export { NewLinkArticle }
