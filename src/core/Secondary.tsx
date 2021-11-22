import React from 'react';
import { Tabs, Tab, Box, TabProps, TabsProps, TextField, TextFieldProps, alpha } from '@mui/material';
import { styled } from "@mui/material/styles";


import { ArticleExplorer, WorkflowExplorer, LinkExplorer, SearchExplorer } from './explorer';
import { Composer } from './context';
import { useIntl } from 'react-intl';

const TextFieldRoot = styled(TextField)<TextFieldProps>(({ theme }) => ({

  color: theme.palette.explorerItem.main,
  backgroundColor: theme.palette.explorer.main,
  '& .MuiOutlinedInput-input': {
    color: theme.palette.explorerItem.main,
  },
  '& .MuiOutlinedInput-root': {
    fontSize: '10pt',
    height: '2rem',
    '&.Mui-focused fieldset': {
      borderColor: theme.palette.explorerItem.dark,
    },
  },
  '& .MuiFormLabel-root': {
    color: theme.palette.explorerItem.main,
  },
  '& .MuiFormHelperText-root': {
    color: theme.palette.explorerItem.main,
    marginLeft: 1
  }
}));

const StyledTab = styled(Tab)<TabProps>(({ theme }) => ({
  "&.MuiButtonBase-root": {
    minWidth: "unset",
    color: theme.palette.explorerItem.main,
    fontSize: '9pt',
    paddingLeft: '.5rem',
    paddingRight: '.5rem'
  },
  "&.Mui-selected": {
    color: theme.palette.explorerItem.dark,
    backgroundColor: alpha(theme.palette.explorerItem.dark, .2),
  },
}));

const StyledTabs = styled(Tabs)<TabsProps>(({ }) => ({
  "& .MuiTabs-indicator": {
    backgroundColor: "unset",
  }
}));



const SecondaryArticles: React.FC<{}> = () => {
  const intl = useIntl();
  const [searchString, setSearchString] = React.useState("");
  const getLabel = (id: string) => intl.formatMessage({ id });
  const getPlaceholder = (id: string) => intl.formatMessage({ id});
  const [tab, setTab] = React.useState("toolbar.articles")
  let component = <></>;

  if (tab === 'toolbar.services') {
    component = (<WorkflowExplorer />)
  } else if (tab === 'toolbar.links') {
    component = (<LinkExplorer />)
  } else {
    component = <ArticleExplorer />;
  }

  return (<>
    <Box display="flex" >
      <StyledTabs value={tab} onChange={(_event, value) => setTab(value)}>
        <StyledTab label={getLabel("explorer.tabs.articles")} value='toolbar.articles' />
        <StyledTab label={getLabel("explorer.tabs.services")} value='toolbar.services' />
        <StyledTab label={getLabel("explorer.tabs.links")} value='toolbar.links' />
      </StyledTabs>
      <Box alignSelf="center" sx={{ m: 1 }}>
        <TextFieldRoot placeholder={getPlaceholder("explorer.tabs.search")} value={searchString} onChange={({ target }) => setSearchString(target.value)} focused />
      </Box>
    </Box>
    {component}
  </>);
}


const Secondary: React.FC<{}> = () => {
  const layout = Composer.useLayout();

  let component = <></>;
  if (layout.session.secondary === 'toolbar.search') {
    component = (<SearchExplorer />)
  } else {
    component = <SecondaryArticles />;
  }
  return (<Box sx={{ backgroundColor: "explorer.main", height: '100%' }}>{component}</Box>)
}
export { Secondary }


