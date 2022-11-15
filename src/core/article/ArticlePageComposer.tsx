import React from 'react';
import { Box, useTheme } from '@mui/material';

import MDEditor, { ICommand, commands, TextState, TextAreaTextApi } from '@uiw/react-md-editor';
import { Composer, StencilClient } from '../context';
import { useSnackbar } from 'notistack';


const templateCommand = (template: StencilClient.Template): ICommand => ({
  name: 'templates' + template.id,
  keyCommand: 'templates' + template.id,
  buttonProps: { 'aria-label': template.body.name, title: template.body.name },
  icon: <div style={{ fontSize: 18, padding: 10, textAlign: 'left' }}>{template.body.name} - {template.body.description}</div>,
  execute: (state: TextState, api: TextAreaTextApi) => {
    api.replaceSelection(template.body.content);
  },
});

const getMdCommands = (locale: StencilClient.SiteLocale, color: string, site: StencilClient.Site) => {
  const localeTitle: ICommand = {
    name: locale?.body.value,
    groupName: 'title',
    keyCommand: 'title1',
    buttonProps: { 'aria-label': locale?.body.value },
    icon: (<div style={{ fontWeight: 'bold', fontSize: 15, alignItems: 'center', color }}>{locale?.body.value}</div>)

  };


  return [localeTitle,
    commands.group(Object.values(site.templates).map((t) => templateCommand(t)), {
      name: 'templates',
      groupName: 'templates',
      buttonProps: { 'aria-label': 'Insert Template' },
      icon: (<div style={{ fontWeight: 'bold', fontSize: 15, alignItems: 'center', color: 'blue'}}>T</div>)
    }),
    commands.group([commands.title1, commands.title2, commands.title3, commands.title4, commands.title5, commands.title6], {
      name: 'title',
      groupName: 'title',
      buttonProps: { 'aria-label': 'Insert title' },

    }),
    commands.bold,
    commands.italic,
    commands.strikethrough,
    commands.hr,
    commands.divider,
    commands.link,
    commands.quote,
    commands.code,
    commands.codeBlock,
    commands.image,
    commands.divider,
    commands.unorderedListCommand,
    commands.orderedListCommand,
    commands.checkedListCommand,
  ];
}

type PageComposerProps = {
  articleId: StencilClient.ArticleId,
  locale1: StencilClient.LocaleId,
  locale2?: StencilClient.LocaleId,
}

const ArticlePageComposer: React.FC<PageComposerProps> = ({ articleId, locale1, locale2 }) => {
  const theme = useTheme();
  const { actions, session } = Composer.useComposer();
  const { site } = session;
  const view = session.getArticleView(articleId);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const [snackbarVisible, setSnackbarVisible] = React.useState(false);

  const page1 = [...view.pages.map(p => p.page)]
    .filter(p => p.body.locale === locale1).pop() as StencilClient.Page;

  const page2 = [...view.pages.map(p => p.page)]
    .filter(p => p.body.locale === locale2).pop() as StencilClient.Page | undefined;

  const value1 = session.pages[page1.id] ? session.pages[page1.id].value : page1.body.content;
  const value2 = page2 ? (session.pages[page2.id] ? session.pages[page2.id].value : page2.body.content) : undefined;

  const handleChange1 = (value: string | undefined) => {
    var regex = /# \w/gy;
    var containsTitle = regex.test(value || '');
    if (!containsTitle) {
      if (!snackbarVisible) {
        enqueueSnackbar('Please add a title to the page', { variant: 'warning', persist: true });
      }
    } else {
      setSnackbarVisible(false);
      closeSnackbar();
    }
    actions.handlePageUpdate(page1.id, value ? value : "");
  }

  if (value2 === undefined || !page2) {
    return (
      <div>
        <MDEditor key={1} value={value1} onChange={handleChange1} toolbarHeight={40}
          commands={getMdCommands(session.site.locales[page1.body.locale], theme.palette.page.main, site)}
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
          commands={getMdCommands(session.site.locales[page1.body.locale], theme.palette.page.main, site)}
          textareaProps={{ placeholder: '# Title' }}
          height={800}
        />

      </Box>
      <Box flex="1">
        <MDEditor key={3} value={value2} onChange={handleChange2}
          commands={getMdCommands(session.site.locales[page2.body.locale], theme.palette.page.dark, site)}
          textareaProps={{ placeholder: '# Title' }}
          height={800}
        />

      </Box>
    </Box>
  );
}

export { ArticlePageComposer }

