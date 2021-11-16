import React from 'react';
import { Tabs, Tab, Box, TabProps, TabsProps } from '@mui/material';
import { styled } from "@mui/material/styles";


import { ArticleExplorer, WorkflowExplorer } from './explorer';
import { Composer } from './context';
import { useIntl } from 'react-intl';

const StyledTab = styled(Tab)<TabProps>(({ theme }) => ({
  "&.MuiButtonBase-root": {
    minWidth: "unset",
    color: theme.palette.explorerItem.main,
  },
  "&.Mui-selected": {
    color: theme.palette.explorerItem.dark,
  }
}));

const StyledTabs = styled(Tabs)<TabsProps>(({ }) => ({
  "& .MuiTabs-indicator": {
    backgroundColor: "unset",
  }
}));


const SecondaryArticles: React.FC<{}> = () => {
  const intl = useIntl();
  const getLabel = (id: string) => intl.formatMessage({ id });
  const [tab, setTab] = React.useState("toolbar.articles") 

  return (<>
    <Box>
      <StyledTabs value={tab} onChange={(_event, value) => setTab(value)}>
        <StyledTab label={getLabel("explorer.tabs.articles")} value='toolbar.articles' />
        <StyledTab label={getLabel("explorer.tabs.services")} value='toolbar.services' />
        <StyledTab label={getLabel("explorer.tabs.links")} value='toolbar.links' />
      </StyledTabs>
    </Box>
    <ArticleExplorer />
  </>);
}


const Secondary: React.FC<{}> = () => {
  const layout = Composer.useLayout();

  let component = <></>;
  if (layout.session.secondary === 'toolbar.search') {
    component = (<WorkflowExplorer />)
  } else {
    component = <SecondaryArticles />;
  }
  return (<Box sx={{ backgroundColor: "explorer.main", height: '100%' }}>
    {component}
  </Box>)
}
export { Secondary }


