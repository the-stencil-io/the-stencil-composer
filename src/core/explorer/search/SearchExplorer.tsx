import React from 'react';
import { Box, Typography, TextField, TextFieldProps, InputAdornment } from '@mui/material';
import { styled } from "@mui/material/styles";
import TreeView from "@mui/lab/TreeView";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import SearchIcon from '@mui/icons-material/Search';
import LinkIcon from '@mui/icons-material/Link';
import TranslateIcon from '@mui/icons-material/Translate';

import { FormattedMessage, useIntl } from 'react-intl';

import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined';
import AccountTreeOutlinedIcon from '@mui/icons-material/AccountTreeOutlined';
import ConstructionIcon from '@mui/icons-material/Construction';

import StencilStyles from '../../styles';
import { Composer, StencilClient } from '../../context';
import { LinkEdit } from '../../link/LinkEdit';


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

const findMainId = (values: string[]) => {
  const result = values.filter(id => !id.endsWith("-nested"));
  if (result.length) {
    return result[0];
  }
  return undefined;
}


const LinkItem: React.FC<{ view: Composer.LinkView }> = ({ view }) => {
  return (
    <>
      <StencilStyles.TreeItem
        nodeId={view.link.id}
        labelText={view.link.body.value}
        labelcolor="link"
        labelIcon={LinkIcon}>
      </StencilStyles.TreeItem>
    </>)
}

const WorkflowItem: React.FC<{ view: Composer.WorkflowView }> = ({ view }) => {
  return (
    <>
      <StencilStyles.TreeItem
        nodeId={view.workflow.id}
        labelText={view.workflow.body.value}
        labelcolor="workflow"
        labelIcon={view.workflow.body.devMode ? ConstructionIcon : AccountTreeOutlinedIcon}>
      </StencilStyles.TreeItem>
    </>)
}

const PageItem: React.FC<{ view: Composer.PageView }> = ({ view }) => {
  return (
    <>
      <StencilStyles.TreeItem
        nodeId={view.page.id}
        labelText={view.title}
        labelcolor="page"
        labelIcon={TranslateIcon}>
      </StencilStyles.TreeItem>
    </>)

}

const ArticleItem: React.FC<{ view: Composer.ArticleView }> = ({ view }) => {
  return (
    <>
      <StencilStyles.TreeItem
        nodeId={view.article.id}
        labelText={view.article.body.name}
        labelcolor="article"
        labelIcon={ArticleOutlinedIcon}>
      </StencilStyles.TreeItem>
    </>)

}



const SearchExplorer: React.FC<{}> = () => {
  const { session } = Composer.useComposer();
  const [expanded, setExpanded] = React.useState<string[]>([]);
  const intl = useIntl();
  const [searchString, setSearchString] = React.useState("");
  const searchKeyword = searchString.toLowerCase();
  

  const searchResults: React.ReactChild[] = [];
  
  for (const article of session.articles) {
    if(article.article.body.name.toLowerCase().indexOf(searchKeyword) > -1) {
      searchResults.push(<ArticleItem view={article}/>);
    }
  }
  
  for (const article of session.articles) {
    for (const page of article.pages.filter(view => view.title.toLowerCase().indexOf(searchKeyword) > -1)) {
      searchResults.push(<PageItem view={page}/>);
    }
  }

  session.links
  .filter(link => link.link.body.value.toLowerCase().indexOf(searchKeyword) > -1)
  .map((view) => (
    <LinkItem key={view.link.id} view={view} />
  )).forEach(i => searchResults.push(i));

  session.workflows
  .filter(workflow => workflow.workflow.body.value.toLowerCase().indexOf(searchKeyword) > -1)
  .map((view) => (
    <WorkflowItem key={view.workflow.id} view={view} />
  )).forEach(i => searchResults.push(i));


  const handleSearch = (searchString: string) => {
    setSearchString(searchString);
  }

  return (
    <Box>

      <TextFieldRoot fullWidth
        variant="outlined"
        label={<FormattedMessage id="search.field.label" />}
        type="string"
        focused
        placeholder={intl.formatMessage({ id: "search.field.placeholder" })}
        value={searchString}
        onChange={({ target }) => handleSearch(target.value as any)}
        

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
        {searchResults}
      </TreeView>
    </Box>
  );
}

export { SearchExplorer }

