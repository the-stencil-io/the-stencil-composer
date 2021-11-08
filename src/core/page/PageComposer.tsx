import React from 'react';
import { Box, useTheme } from '@mui/material';

import MDEditor, { ICommand, getCommands } from '@uiw/react-md-editor';
import { Composer, StencilClient } from '../context';


const getMdCommands = (locale: StencilClient.SiteLocale, color: string) => {
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
  article: StencilClient.Article,
  locale1: StencilClient.LocaleId,
  locale2?: StencilClient.LocaleId,
}

const PageComposer: React.FC<PageComposerProps> = ({ article, locale1, locale2 }) => {
  const theme = useTheme();
  const {actions, session} = Composer.useComposer();
  const page1 = Object.values(session.site.pages)
    .filter(p => p.body.article === article.id)
    .filter(p => p.body.locale === locale1).pop() as StencilClient.Page;

  const page2 = Object.values(session.site.pages)
    .filter(p => p.body.article === article.id)
    .filter(p => p.body.locale === locale2).pop() as StencilClient.Page | undefined;

  const value1 = session.pages[page1.id] ? session.pages[page1.id].value : page1.body.content;
  const value2 = page2 ? (session.pages[page2.id] ? session.pages[page2.id].value : page2.body.content) : undefined;

  const handleChange1 = (value: string | undefined) => {
    actions.handlePageUpdate(page1.id, value ? value : "");
  }

  if (value2 === undefined || !page2) {
    return (
      <div>
        <MDEditor key={1} value={value1} onChange={handleChange1}
          commands={getMdCommands(session.site.locales[page1.body.locale], theme.palette.page.main)}
          textareaProps={{ placeholder: '# Title' }}
          height={800} 
          />
      </div>
    );
  }

  const handleChange2 = (value: string | undefined) => {
    actions.handlePageUpdate(page2.id, value ? value : "");
  }

  return (
    <Box display="flex" flexDirection="row" flexWrap="wrap">
      <Box flex="1" sx={{ paddingRight: 1 }}>
        <MDEditor key={2} value={value1} onChange={handleChange1}
          commands={getMdCommands(session.site.locales[page1.body.locale], theme.palette.page.main)}
          textareaProps={{ placeholder: '# Title' }}
          height={800} 
          />

      </Box>
      <Box flex="1">
        <MDEditor key={3} value={value2} onChange={handleChange2}
          commands={getMdCommands(session.site.locales[page2.body.locale], theme.palette.page.dark)}
          textareaProps={{ placeholder: '# Title' }}
          height={800} 
          />

      </Box>
    </Box>
  );
}

export { PageComposer }