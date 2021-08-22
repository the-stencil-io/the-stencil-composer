import React from 'react';
import {
  makeStyles, createStyles, Theme, TextField, InputLabel, FormControl, MenuItem, Select,
  Button, Dialog, Typography, DialogTitle, DialogContent, DialogActions, IconButton
} from '@material-ui/core';
import EditOutlined from '@material-ui/icons/EditOutlined';
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
    button: {
      // padding: 0,
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.background.paper,
      fontWeight: 'bold',
      "&:hover, &.Mui-focusVisible": {
        backgroundColor: theme.palette.error.dark,
        color: theme.palette.background.paper,
        fontWeight: 'bold'
      }
    },
    margin: {
      marginRight: theme.spacing(1)
    },
    iconButton: {
      padding: 2,
      marginLeft: theme.spacing(1),
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



const ArticleEdit: React.FC<{ article: API.CMS.Article, init?: { open: boolean, onClose: () => void } }> = ({ article, init }) => {
  const classes = useStyles();
  const ide = Ide.useIde();
  const { site } = ide.session;

  const [name, setName] = React.useState(article.body.name);
  const [order, setOrder] = React.useState(article.body.order);
  const [parentId, setParentId] = React.useState(article.body.parentId);
  const [open, setOpen] = React.useState(init ? init.open : false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    if (init) {
      init.onClose();
    }
    setOpen(false);
  };


  const handleCreate = () => {
    const entity: API.CMS.ArticleMutator = { articleId: article.id, name, parentId, order };
    ide.service.update().article(entity).then(_success => {
      handleClose();
      ide.actions.handleLoadSite();
    });
  }
  const handleCancel = () => {
    handleClose();
  }

  const articles: API.CMS.Article[] = Object.values(site.articles);
  return (<>
    { init ? null : (<span className={classes.margin}>
      <IconButton className={classes.iconButton} onClick={handleClickOpen}>
        <EditOutlined />
      </IconButton>
    </span>)}


    <Dialog open={open} onClose={handleClose} >
      <DialogTitle><FormattedMessage id="article.edit.title" /></DialogTitle>
      <DialogContent>
        <Typography className={classes.root}>
          <FormControl variant="outlined" className={classes.select} fullWidth>
            <InputLabel ><FormattedMessage id="article.edit.parent" /></InputLabel>
            <Select
              value={parentId}
              onChange={({ target }) => setParentId(target.value as any)}
              label={<FormattedMessage id="article.edit.parent" />}
            >
              {articles.map((article, index) => (
                <MenuItem key={index} value={article.id}>{article.body.order}{"_"}{article.body.name}</MenuItem>
              ))}
              <MenuItem value={""}><FormattedMessage id='article.composer.parent.unselected' /></MenuItem>
            </Select>
          </FormControl >
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
        </Typography>

      </DialogContent>
      <DialogActions>
        <Button variant="text" onClick={handleCancel} color="primary"><FormattedMessage id="button.cancel" /></Button>
        <Button variant="contained" onClick={handleCreate} color="primary" autoFocus disabled={!name}><FormattedMessage id="button.update" /></Button>
      </DialogActions>
    </Dialog>
  </>
  );
}

export { ArticleEdit }


