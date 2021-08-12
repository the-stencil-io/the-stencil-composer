import React from 'react';
import {
  makeStyles, createStyles, Theme, TextField, InputLabel, FormControl, MenuItem, Select,
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



const ArticleComposer: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const classes = useStyles();
  const ide = Ide.useIde();
  const { site } = ide.session;

  const [name, setName] = React.useState("");
  const [order, setOrder] = React.useState(0);
  const [parentId, setParentId] = React.useState("");

  const handleCreate = () => {
    const entity: API.CMS.CreateArticle = { name, parentId, order };
    console.log("entity", entity)
    ide.service.create().article(entity).then(success => {
      console.log(success)
      onClose();
      ide.actions.handleLoadSite();
    });
  }
  
  const handleCancel = () => {
    onClose();
  }
  
  const articles: API.CMS.Article[] = Object.values(site.articles);

  return (
    <Dialog open={true} onClose={onClose} >
      <DialogTitle><FormattedMessage id='article.composer.title' /></DialogTitle>
      
      <DialogContent>
        <Typography className={classes.root}>
          <FormControl variant="outlined" className={classes.select} fullWidth>
            <InputLabel><FormattedMessage id='article.composer.parent' /></InputLabel>
            <Select
              value={parentId} 
              onChange={({ target }) => setParentId(target.value as any)}
              label={<FormattedMessage id='article.composer.parent'/>}
            >
              {articles.map((article, index) => (
                <MenuItem key={index} value={article.id}>{article.body.order}{"_"}{article.body.name}</MenuItem>
              ))}
               <MenuItem value={""}><FormattedMessage id='article.composer.parent.unselected' /></MenuItem>
            </Select>
          </FormControl >
          
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
        </Typography>

      </DialogContent>
      <DialogActions>
        <Button variant="text" onClick={handleCancel} color="primary"><FormattedMessage id='button.cancel' /></Button>
        <Button variant="contained" onClick={handleCreate} color="primary" autoFocus disabled={!name}><FormattedMessage id='button.create' /></Button>
      </DialogActions>
    </Dialog>
  );
}

export { ArticleComposer }