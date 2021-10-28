import React from 'react';
import { createStyles, makeStyles } from '@mui/styles';
import {
  Theme, TextField, InputLabel, FormControl, MenuItem, Select,
  Button, Dialog, DialogTitle, DialogContent, DialogActions, ButtonGroup
} from '@mui/material';

import { FormattedMessage } from 'react-intl';

import { API, Ide } from '../../deps';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    select: {
      marginTop: theme.spacing(3),
    },
    selectMain: {
      
    },
    selectSub: {
      marginLeft: theme.spacing(2),
      color: theme.palette.article.dark,
    },
    title: {
      backgroundColor: theme.palette.article.main,
      color: theme.palette.secondary.contrastText,
    },
    button: {
      fontWeight: 'bold',
      "&:hover, &.Mui-focusVisible": {
        color: theme.palette.article.main,
        fontWeight: 'bold',
      }
    },
    buttonGroup: {
      color: theme.palette.article.main
    },
    iconButton: {
      padding: 2,
      paddingLeft: theme.spacing(1),
      color: theme.palette.primary.dark,
      "&:hover, &.Mui-focusVisible": {
        backgroundColor: theme.palette.info.main,
        color: theme.palette.background.paper,
        "& .MuiSvgIcon-root": {
          color: theme.palette.background.paper,
        }
      }
    },
  }),
);

const ArticleEdit: React.FC<{ articleId: API.CMS.ArticleId, onClose: () => void }> = ({ articleId, onClose }) => {
  const classes = useStyles();
  const ide = Ide.useIde();
  const { site } = ide.session;

  const article = site.articles[articleId];
  const [name, setName] = React.useState(article.body.name);
  const [order, setOrder] = React.useState(article.body.order);
  const [parentId, setParentId] = React.useState(article.body.parentId);


  const handleCreate = () => {
    const entity: API.CMS.ArticleMutator = { articleId: article.id, name, parentId, order, links: undefined, workflows: undefined};
    ide.service.update().article(entity).then(_success => {
      onClose();
      ide.actions.handleLoadSite();
    });
  }

  const articles: API.CMS.Article[] = Object.values(site.articles)
    .sort((a1, a2) => {
      if(a1.body.parentId && a1.body.parentId === a2.body.parentId) {
        const children = a1.body.order - a2.body.order;
        if(children === 0) {
          return a1.body.name.localeCompare(a2.body.name);
        }
        return children;
      }
      
      return  (a1.body.parentId ? site.articles[a1.body.parentId].body.order + 1 : a1.body.order ) 
            - (a2.body.parentId ? site.articles[a2.body.parentId].body.order + 1 : a2.body.order );
    });
  
  return (<>
    <Dialog open={true} onClose={onClose} maxWidth="md" fullWidth={true}>
      <DialogTitle className={classes.title}><FormattedMessage id="article.edit.title" /></DialogTitle>
      <DialogContent >

        <FormControl variant="outlined" className={classes.select} fullWidth>
          <InputLabel ><FormattedMessage id="article.edit.parent" /></InputLabel>
          <Select
            value={parentId ? parentId : ''}
            onChange={({ target }) => setParentId(target.value as any)}
            label={<FormattedMessage id="article.edit.parent" />}
          >
            {articles.map((article, index) => (
              <MenuItem key={index} value={article.id} className={article.body.parentId ? classes.selectSub : classes.selectMain}>
                {article.body.order} - {article.body.parentId ? site.articles[article.body.parentId].body.name + "/" : "" }{article.body.name}
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
          
      </DialogContent>
      <DialogActions>
        <ButtonGroup variant="text">
          <Button className={classes.button} onClick={onClose}><FormattedMessage id="button.cancel" /></Button>
          <Button className={classes.button} onClick={handleCreate} autoFocus disabled={!name}><FormattedMessage id="button.update" /></Button>
        </ButtonGroup>
      </DialogActions>
    </Dialog>
  </>
  );
}

export { ArticleEdit }


