import React from 'react';
import { makeStyles, createStyles, Theme, Box } from '@material-ui/core';

import MDEditor from '@uiw/react-md-editor';
import { API, Ide } from '../../deps';

const useStyles = () => makeStyles((theme: Theme) =>
  createStyles({
    left: {
      paddingRight: theme.spacing(1)
    },
    title: {
      margin: theme.spacing(1),
      color: theme.palette.primary.light,
      fontWeight: 'bold',
      textTransform: 'uppercase',
    },
  }),
)();


type PageComposerProps = {
  article: API.CMS.Article,
  locale1: API.CMS.LocaleId,
  locale2?: API.CMS.LocaleId,
}

const PageComposer: React.FC<PageComposerProps> = ({ article, locale1, locale2 }) => {
  const classes = useStyles();
  const ide = Ide.useIde();
  const page1 = Object.values(ide.session.site.pages)
    .filter(p => p.body.article === article.id)
    .filter(p => p.body.locale === locale1).pop() as API.CMS.Page;

  const page2 = Object.values(ide.session.site.pages)
    .filter(p => p.body.article === article.id)
    .filter(p => p.body.locale === locale2).pop() as API.CMS.Page | undefined;

  const value1 = ide.session.pages[page1.id] ? ide.session.pages[page1.id].value : page1.body.content;
  const value2 = page2 ? (ide.session.pages[page2.id] ? ide.session.pages[page2.id].value : page2.body.content) : undefined;

  const handleChange1 = (value: string | undefined) => {
    ide.actions.handlePageUpdate(page1.id, value ? value : "");
  }
  if (value2 === undefined || !page2) {
    return (
      <div>
        <div>{ide.session.site.locales[page1.body.locale].body.value}</div>
        <MDEditor value={value1} onChange={handleChange1} />
      </div>
    );
  }

  const handleChange2 = (value: string | undefined) => {
    ide.actions.handlePageUpdate(page2.id, value ? value : "");
  }


  return (
    <Box display="flex" flexDirection="row" flexWrap="wrap">
      <Box flex="1" className={classes.left}>
        <div className={classes.title}>{ide.session.site.locales[page1.body.locale].body.value}</div>
        <MDEditor value={value1} onChange={handleChange1} />
      </Box>
      <Box flex="1">
        <div className={classes.title}>{ide.session.site.locales[page2.body.locale].body.value}</div>
        <MDEditor value={value2} onChange={handleChange2} />
      </Box>
    </Box>
  );
}

export { PageComposer }