import React from 'react';
import { Box, Typography, TextField, TextFieldProps, InputAdornment } from '@mui/material';
import { styled } from "@mui/material/styles";
import TreeView from "@mui/lab/TreeView";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import SearchIcon from '@mui/icons-material/Search';
import LinkIcon from '@mui/icons-material/Link';

import { FormattedMessage, useIntl } from 'react-intl';

import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined';
import AccountTreeOutlinedIcon from '@mui/icons-material/AccountTreeOutlined';
import ConstructionIcon from '@mui/icons-material/Construction';

import { WorkflowEdit } from '../../workflow/';
import { LinkEdit } from '../../link/';
import StencilStyles from '../../styles';
import { Composer, StencilClient } from '../../context';


//color: theme.palette.explorerItem.dark,
//backgroundColor: theme.palette.explorer.main,
const TextFieldRoot = styled(TextField)<TextFieldProps>(({ theme }) => ({
  marginTop: theme.spacing(1),
  padding: theme.spacing(1),
  color: theme.palette.explorerItem.dark,
  backgroundColor: theme.palette.explorer.main,
  '& .MuiOutlinedInput-input': {
    color: theme.palette.explorerItem.main,
  },
  '& .MuiOutlinedInput-root': {
    '&.Mui-focused fieldset': {
      borderColor: theme.palette.explorerItem.dark,
    },
  },
  '& .MuiFormLabel-root': {
    color: theme.palette.explorerItem.main,
  },
  '& .MuiFormHelperText-root': {
    color: theme.palette.explorerItem.main,
    marginLeft: 0
  }
}));


const findMatch = (line: string, keyword: string, fallback?: boolean) => {

  const start = line.toLowerCase().indexOf(keyword);
  if (start === -1) {
    return fallback ? line : null;
  }

  const end = start + keyword.length;
  const fragment_0 = line.substring(start > 20 ? start - 20 : 0, start);
  const fragment_1 = line.substring(start, end);
  const fragment_2 = line.substring(end);

  return (<>
    <span>{fragment_0}</span>
    <Box component="span" sx={{ color: "explorerItem.contrastText" }}><b>{fragment_1}</b></Box>
    <span>{fragment_2}</span>
  </>);
}

const findMainId = (values: string[]) => {
  const result = values.filter(id => !id.endsWith("-nested"));
  if (result.length) {
    return result[0];
  }
  return undefined;
}


const LinkItem: React.FC<{ view: Composer.LinkView, searchResult: Composer.SearchResult, keyword: string }> = ({ view, keyword }) => {

  const [linkEditOpen, setLinkEditOpen] = React.useState<boolean>(false);

  const items: React.ReactElement[] = [];
  for (const label of view.labels) {
    const match = findMatch(label.label.labelValue, keyword);
    if (!match) {
      continue;
    }

    items.push(<StencilStyles.TreeItem
      onClick={() => setLinkEditOpen(true)}
      key={items.length}
      nodeId={`${view.link.id}-${items.length}-nested`}
      labelText={<span>{label.locale.body.value} - {match}</span>}
      labelcolor="page"
    >
    </StencilStyles.TreeItem>);
  }
  return (
    <>
      { linkEditOpen ? <LinkEdit linkId={view.link.id} onClose={() => setLinkEditOpen(false)} /> : null}

      <StencilStyles.TreeItem
        nodeId={view.link.id}
        labelText={view.link.body.value}
        labelcolor="link"
        labelIcon={LinkIcon}>
        {items}
      </StencilStyles.TreeItem>
    </>)
}

const WorkflowItem: React.FC<{ view: Composer.WorkflowView, searchResult: Composer.SearchResult, keyword: string }> = ({ view, keyword }) => {

  const [workflowEditOpen, setWorkflowEditOpen] = React.useState<boolean>(false);

  const items: React.ReactElement[] = [];
  for (const label of view.labels) {
    const match = findMatch(label.label.labelValue, keyword);
    if (!match) {
      continue;
    }

    items.push(
      <>
        <StencilStyles.TreeItem
          onClick={() => setWorkflowEditOpen(true)}
          key={items.length}
          nodeId={`${view.workflow.id}-${items.length}-nested`}
          labelText={<span>{label.locale.body.value} - {match}</span>}
          labelcolor="page"
        >
        </StencilStyles.TreeItem>
      </>);
  }
  return (
    <>
      {workflowEditOpen ? <WorkflowEdit workflowId={view.workflow.id} onClose={() => setWorkflowEditOpen(false)} /> : null}

      <StencilStyles.TreeItem
        nodeId={view.workflow.id}
        labelText={<span>{findMatch(view.workflow.body.value, keyword, true)}</span>}
        labelcolor="workflow"
        labelIcon={view.workflow.body.devMode ? ConstructionIcon : AccountTreeOutlinedIcon}>
        {items}
      </StencilStyles.TreeItem>
    </>)
}

const ArticleItem: React.FC<{ view: Composer.ArticleView, searchResult: Composer.SearchResult, keyword: string }> = ({ view, searchResult, keyword }) => {

  const { article } = view;
  const { handleInTab } = Composer.useNav();
  const onLeftEdit = (page: StencilClient.Page) => handleInTab({ article, type: "ARTICLE_PAGES", locale: page.body.locale })

  const items: React.ReactElement[] = [];
  let index = 1;
  for (const match of searchResult.matches) {
    if (match.type === 'ARTICLE_PAGE') {
      const pageView: Composer.PageView = view.pages.filter(p => p.page.id === match.id)[0];
      const lines = pageView.page.body.content.split(/\r?\n/);
      let lineIndex = 1;
      for (const line of lines) {
        const match = findMatch(line, keyword);
        if (!match) {
          continue;
        }

        items.push(
          <StencilStyles.TreeItem
            onClick={() => onLeftEdit(pageView.page)}
            key={index++}
            nodeId={`${pageView.page.id}-${lineIndex}-nested`}
            labelText={<span>{pageView.locale.body.value}.md ({lineIndex}) - {match}</span>}
            labelcolor="page"
          >
          </StencilStyles.TreeItem>);
        lineIndex++;
      }
    }
  }
  return (
    <>
      <StencilStyles.TreeItem
        key={index++}
        nodeId={view.article.id}
        labelText={<span>{findMatch(`${view.article.body.name}`, keyword, true)}</span>}
        labelcolor="page"
        labelIcon={ArticleOutlinedIcon}>

        {items}
      </StencilStyles.TreeItem>
    </>
  )
}



const SearchExplorer: React.FC<{}> = () => {
  const { session } = Composer.useComposer();
  const [expanded, setExpanded] = React.useState<string[]>([]);

  const intl = useIntl();
  const [searchString, setSearchString] = React.useState("");

  const articles = session.search.filterArticles(searchString)
    .map(result => (<ArticleItem key={result.source.id} view={session.getArticleView(result.source.id)} searchResult={result} keyword={searchString} />));

  const workflows = session.search.filterWorkflows(searchString)
    .map(result => (<WorkflowItem key={result.source.id} view={session.getWorkflowView(result.source.id)} searchResult={result} keyword={searchString} />));

  const links = session.search.filterLinks(searchString)
    .map(result => (<LinkItem key={result.source.id} view={session.getLinkView(result.source.id)} searchResult={result} keyword={searchString} />));


  return (


    <Box>
      <TextFieldRoot fullWidth
        variant="outlined"
        label={<FormattedMessage id="search.field.label" />}
        type="search"
        focused
        placeholder={intl.formatMessage({ id: "search.field.placeholder" })}
        value={searchString}
        onChange={({ target }) => setSearchString(target.value as any)}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon sx={{ color: 'explorerItem.dark' }} />
            </InputAdornment>
          ),
        }} />

      <Typography align="left"
        sx={{
          fontVariant: 'all-petite-caps',
          fontWeight: 'bold',
          color: 'explorerItem.main',
          ml: 1, mr: 1, mb: 1,
          borderBottom: '1px solid'
        }}>
        <FormattedMessage id="search.results.title" />
      </Typography>

      <TreeView expanded={expanded}
        defaultCollapseIcon={<ArrowDropDownIcon />}
        defaultExpandIcon={<ArrowRightIcon />}
        defaultEndIcon={<div style={{ width: 24 }} />}
        onNodeToggle={(_event: React.SyntheticEvent, nodeIds: string[]) => {
          const active = findMainId(expanded);
          const newId = findMainId(nodeIds.filter(n => n !== active));
          if (active !== newId && active && newId) {
            nodeIds.splice(nodeIds.indexOf(active), 1);
          }
          setExpanded(nodeIds);
        }}>

        {articles}
        {workflows}
        {links}
      </TreeView>
    </Box>
  );
}

export { SearchExplorer }

