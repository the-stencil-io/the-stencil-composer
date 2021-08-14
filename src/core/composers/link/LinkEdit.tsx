import React from 'react';
import EditOutlined from '@material-ui/icons/EditOutlined';
import {
  makeStyles, createStyles, Theme, TextField, InputLabel, FormControl, MenuItem, Select,
  Button, Dialog, Typography, DialogTitle, DialogContent, DialogActions, IconButton
} from '@material-ui/core'; import { FormattedMessage } from 'react-intl';

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

const linkTypes: API.CMS.LinkType[] = ["internal", "external", "phone"];

interface LinkEditProps {
  link: API.CMS.Link;
}

const LinkEdit: React.FC<LinkEditProps> = ({ link }) => {
  const classes = useStyles();
  const ide = Ide.useIde();
  const { site } = ide.session;

  const [open, setOpen] = React.useState(false);
  const [locale, setLocale] = React.useState(link.body.locale);
  const [content, setContent] = React.useState(link.body.content);
  const [contentType, setContentType] = React.useState(link.body.contentType);
  const [description, setDescription] = React.useState(link.body.description);

  const locales: API.CMS.SiteLocale[] = Object.values(site.locales);


  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleCreate = () => {
    const entity: API.CMS.LinkMutator = { linkId: link.id, content, locale, type: contentType, description, articles: link.body.articles };
    console.log("entity", entity)
    ide.service.update().link(entity).then(success => {
      console.log(success)
      handleClose();
      ide.actions.handleLoadSite();
    });
  }

  return (<>
    <span className={classes.margin}>
      <IconButton className={classes.iconButton} onClick={handleClickOpen}>
        <EditOutlined />
      </IconButton>
    </span>
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle> <FormattedMessage id="link.edit.title" /></DialogTitle>
      <DialogContent>
        <Typography className={classes.root}>
          <FormControl variant="outlined" className={classes.select} fullWidth>
            <InputLabel ><FormattedMessage id="link.type" /></InputLabel>
            <Select
              value={contentType}
              onChange={({ target }) => setContentType(target.value as any)}
              label={<FormattedMessage id="link.type" />}
            >
              {linkTypes.map((link, index) => (
                <MenuItem key={index} value={link}>{link}</MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl variant="outlined" className={classes.select} fullWidth>
            <InputLabel ><FormattedMessage id="locale" /></InputLabel>
            <Select
              value={locale}
              onChange={({ target }) => setLocale(target.value as any)}
              label={<FormattedMessage id="locale" />}
            >
              {locales.map((locale, index) => (
                <MenuItem key={index} value={locale.body.value}>{locale.body.value}</MenuItem>
              ))}
              <MenuItem value={""}><FormattedMessage id='link.locale.all' /></MenuItem>

            </Select>
          </FormControl>
          <TextField
            label={<FormattedMessage id="link.composer.descriptionlabel" />}
            variant="outlined"
            placeholder={link.body.description}
            helperText={<FormattedMessage id="link.composer.descriptionhelper" />}
            fullWidth
            required
            className={classes.select}
            value={description}
            onChange={({ target }) => setDescription(target.value as any)} />

          <FormControl variant="outlined" fullWidth>
            <TextField
              label={<FormattedMessage id="link.content" />}
              variant="outlined"
              required
              placeholder={link.body.content}
              helperText={<FormattedMessage id="link.composer.valuehelper" />}
              fullWidth
              className={classes.select}
              value={content}
              onChange={({ target }) => setContent(target.value as any)} />
          </FormControl>
        </Typography>
      </DialogContent >
      <DialogActions>
        <Button variant="text" onClick={handleClose} color="primary"><FormattedMessage id="button.cancel" /></Button>
        <Button variant="contained" onClick={handleCreate} color="primary" autoFocus disabled={!content || !description}  ><FormattedMessage id="button.update" /></Button>
      </DialogActions>

    </Dialog >

  </>
  );
}
export { LinkEdit }
