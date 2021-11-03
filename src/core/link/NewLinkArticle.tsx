import React from 'react';
import { createStyles, makeStyles } from '@mui/styles';
import {
  Theme, InputLabel, FormControl, MenuItem, Select,
  Button, Dialog, DialogTitle, DialogContent, DialogActions, ButtonGroup
} from '@mui/material';
import { FormattedMessage } from 'react-intl';

import { Composer, StencilClient } from '../context';


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
   select: {
      marginTop: theme.spacing(3),
    },
     title: {
      backgroundColor: theme.palette.link.main,
      color: theme.palette.secondary.contrastText,
      fontWeight: 300
    },
    button: {
      fontWeight: 'bold',
      "&:hover, &.Mui-focusVisible": {
        color: theme.palette.link.main,
        fontWeight: 'bold',
      }
    },
    buttonGroup: {
      color: theme.palette.link.main
    },
  }),
);


interface NewLinkArticleProps {
  link: StencilClient.Link,
  open: boolean,
  onClose: () => void
}

const NewLinkArticle: React.FC<NewLinkArticleProps> = ({ link, onClose }) => {
  const classes = useStyles();

  const {site, service, actions} = Composer.useComposer();
  const articles: StencilClient.Article[] = Object.values(site.articles);
  const [articleId, setArticleId] = React.useState("");
  const errors = !articleId || link.body.articles.includes(articleId);
    
  const handleUpdate = () => {
    const entity: StencilClient.LinkMutator = { 
      value: link.body.value,
      labels: undefined,
      linkId: link.id, 
      type: link.body.contentType,
      articles: [...link.body.articles, articleId]
    };
      
    service.update().link(entity).then(_success => {
      actions.handleLoadSite().then(() => onClose());
    });
  }

  return (
    <Dialog open={true} onClose={onClose}>
      <DialogTitle className={classes.title}><FormattedMessage id="link.article.add.title" /></DialogTitle>
      <DialogContent>

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
      </DialogContent>
      
      <DialogActions>
      <ButtonGroup className={classes.buttonGroup} variant="text">
        <Button className={classes.button} onClick={onClose}>
          <FormattedMessage id="button.cancel" />
        </Button>
        <Button className={classes.button} autoFocus onClick={() => handleUpdate()} disabled={errors ? true : false}>
          <FormattedMessage id="button.add" />
        </Button>
        </ButtonGroup>
      </DialogActions>
    </Dialog>
  );
}
export { NewLinkArticle }
