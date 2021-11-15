import React from 'react';
import { useTheme } from '@mui/styles';
import {
  ButtonGroup, Card, CardHeader, CardActions, CardContent, Theme,
  Typography, Box, Divider
} from '@mui/material';
import { FormattedMessage, useIntl } from 'react-intl';
import StencilStyles from './styles';

import { ArticleComposer } from './article';
import { LinkComposer } from './link';
import { WorkflowComposer } from './workflow';
import { LocaleComposer } from './locale';
import { ReleaseComposer } from './release';
import { NewPage } from './page';

import { Composer, StencilClient, Layout } from './context';

interface CardData {
  type: CardType;
  title: string;
  desc: string;
  buttonCreate: string;
  buttonViewAll: string;
  color: string;
  onView: () => void;
  composer: (handleClose: () => void) => React.ReactChild;
  //viewer: (() => void) => xxx;
}

type CardType = "release" | "article" | "page" | "link" | "workflow" | "locale";

const createCards: (site: StencilClient.Site, theme: Theme, layout: Layout.Session.ContextType) => CardData[] = (_site, theme, layout) => ([
  {
    composer: (handleClose) => (<ArticleComposer onClose={handleClose} />),
    onView: () => layout.actions.handleTabAdd({ id: 'articles', label: "Articles" }),
    title: "composer.article.title",
    desc: "composer.article.desc",
    color: theme.palette.article?.main,
    type: "article",
    buttonCreate: "article.create",
    buttonViewAll: "button.view.all.articles"
  },
  {
    composer: (handleClose) => (<NewPage onClose={handleClose} />),
    onView: () => console.log("nothing to see here"),
    title: "composer.page.title",
    desc: "composer.page.desc",
    color: theme.palette.page?.main,
    type: "page",
    buttonCreate: "page.create",
    buttonViewAll: "button.view.all.pages"
  },
  {
    composer: (handleClose) => (<LinkComposer onClose={handleClose} />),
    onView: () => layout.actions.handleTabAdd({ id: 'links', label: "Links" }),
    title: "composer.link.title",
    desc: "composer.link.desc",
    color: theme.palette.link?.main,
    type: "link",
    buttonCreate: "link.create",
    buttonViewAll: "button.view.all.links"
  },

  {
    composer: (handleClose) => (<WorkflowComposer onClose={handleClose} />),
    onView: () => layout.actions.handleTabAdd({ id: 'workflows', label: "Workflows" }),
    title: "composer.workflow.title",
    desc: "composer.workflow.desc",
    color: theme.palette.workflow?.main,
    type: "workflow",
    buttonCreate: "workflow.create",
    buttonViewAll: "button.view.all.workflows"
  },

  {
    composer: (handleClose) => (<LocaleComposer onClose={handleClose} />),
    onView: () => layout.actions.handleTabAdd({ id: 'locales', label: "Locales" }),
    title: "composer.locale.title",
    desc: "composer.locale.desc",
    color: theme.palette.locale?.main,
    type: "locale",
    buttonCreate: "locale.create",
    buttonViewAll: "button.view.all.locales"
  },

  {
    composer: (handleClose) => (<ReleaseComposer onClose={handleClose} />),
    onView: () => layout.actions.handleTabAdd({ id: 'releases', label: "Releases" }),
    title: "composer.release.title",
    desc: "composer.release.desc",
    color: theme.palette.release?.main,
    type: "release",
    buttonCreate: "release.create",
    buttonViewAll: "button.view.all.releases"
  },
]);

const DashboardItem: React.FC<{ data: CardData, onCreate: () => void }> = (props) => {

  const title = useIntl().formatMessage({ id: props.data.title })

  return (
    <Card sx={{
      margin: 3,
      width: '20vw',
      display: 'flex',
      flexDirection: 'column',
    }}>
      <CardHeader sx={{ p: 1, backgroundColor: "table.main" }}
        title={
          <Box display="flex"
            sx={{
              justifyContent: 'center',
            }}>
            <Typography variant="h2" sx={{fontWeight: 'bold', p: 1}}>{title}</Typography>
          </Box>
        }
      />

      <CardContent sx={{ flexGrow: 1, p: 2, height: 'fit-content',}}>
        <Typography color="mainContent.contrastText" variant="body2"><FormattedMessage id={props.data.desc} /></Typography>
      </CardContent>
      <Divider />
      <CardActions>
        <ButtonGroup variant="text" fullWidth sx={{justifyContent: 'space-between'}}>
          <StencilStyles.SecondaryButton onClick={props.data.onView} label={props.data.buttonViewAll} />
          <StencilStyles.PrimaryButton onClick={props.onCreate} label={props.data.buttonCreate} />
        </ButtonGroup>
      </CardActions>
    </Card>
  )
}


//card view for all CREATE views
const Dashboard: React.FC<{}> = () => {
  const theme = useTheme();
  const layout = Composer.useLayout();
  const { site } = Composer.useComposer();

  const [open, setOpen] = React.useState<number>();
  const handleClose = () => setOpen(undefined);
  const cards = React.useMemo(() => createCards(site, theme, layout), [site, theme, layout]);

  return (
    <Box sx={{
      margin: 1,
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'center',

    }}>
      {open === undefined ? null : (cards[open].composer(handleClose))}
      {cards.map((card, index) => (<DashboardItem key={index} data={card} onCreate={() => setOpen(index)} />))}
    </Box>
  );
}

export { Dashboard }
