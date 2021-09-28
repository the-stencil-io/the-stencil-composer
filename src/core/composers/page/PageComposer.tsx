import React from 'react';
import { createStyles, makeStyles } from '@mui/styles';
import { Theme, Box, useTheme } from '@mui/material';

import MDEditor, { ICommand, getCommands } from '@uiw/react-md-editor';
import { API, Ide } from '../../deps';

const useStyles = () => makeStyles((theme: Theme) =>
  createStyles({
    left: {
      paddingRight: theme.spacing(1),
    }
  }),
)();


const getMdCommands = (locale: API.CMS.SiteLocale, color: string) => {
  const localeTitle: ICommand = {
    name: locale.body.value,
    groupName: 'title',
    keyCommand: 'title1',
    buttonProps: { 'aria-label': locale.body.value },
    icon: (<span style={{
      color: color,
      fontWeight: 'bold',
      fontSize: '15pt',
      textAlign: 'center',
      textTransform: 'uppercase',
    }}>{locale.body.value}</span>),
  };

  return [localeTitle, ...getCommands()];
}

type PageComposerProps = {
  article: API.CMS.Article,
  locale1: API.CMS.LocaleId,
  locale2?: API.CMS.LocaleId,
}

const PageComposer: React.FC<PageComposerProps> = ({ article, locale1, locale2 }) => {
  const classes = useStyles();
  const theme = useTheme();
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
        <MDEditor key={1} value={value1} onChange={handleChange1}
          commands={getMdCommands(ide.session.site.locales[page1.body.locale], theme.palette.page.main)}
          textareaProps={{ placeholder: '# Title' }}
          height={800} 
          />
      </div>
    );
  }

  const handleChange2 = (value: string | undefined) => {
    ide.actions.handlePageUpdate(page2.id, value ? value : "");
  }

  return (
    <Box display="flex" flexDirection="row" flexWrap="wrap">
      <Box flex="1" className={classes.left}>
        <MDEditor key={2} value={value1} onChange={handleChange1}
          commands={getMdCommands(ide.session.site.locales[page1.body.locale], theme.palette.page.main)}
          textareaProps={{ placeholder: '# Title' }}
          height={800} 
          />

      </Box>
      <Box flex="1">
        <MDEditor key={3} value={value2} onChange={handleChange2}
          commands={getMdCommands(ide.session.site.locales[page2.body.locale], theme.palette.page.dark)}
          textareaProps={{ placeholder: '# Title' }}
          height={800} 
          />

      </Box>
    </Box>
  );
}

export { PageComposer }