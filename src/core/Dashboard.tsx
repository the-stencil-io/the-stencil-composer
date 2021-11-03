import React from 'react';
import { makeStyles, createStyles, useTheme } from '@mui/styles';
import {
  Button, ButtonGroup, Card, CardHeader, CardActions, CardContent, Theme,
  Typography, Tooltip, Avatar, Box
} from '@mui/material';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import { FormattedMessage, useIntl } from 'react-intl';

import { ArticleComposer } from './article';
import { LinkComposer } from './link';
import { WorkflowComposer } from './workflow';
import { LocaleComposer } from './locale';
import { ReleaseComposer } from './release';
import { NewPage } from './page';

import { Composer, StencilClient, Layout } from './context';


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      margin: theme.spacing(1),
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'center',
    },
  }),
);

const useItemStyles = makeStyles((theme: Theme) =>
  createStyles({
    card: {
      margin: theme.spacing(1),
    //  border: '1px solid',
      borderColor: (props: { color: string }) => props.color,
      width: '400px',
      display: 'flex',
      flexDirection: 'column',
    },
    cardHeader: {
      padding: 0,
    },
    cardAvatar: {
      marginLeft: theme.spacing(1),
      backgroundColor: (props: { color: string }) => props.color,
      textTransform: 'uppercase'
    },
    cardContent: {
      flexGrow: 1,
    },
    button: {
      fontWeight: 'bold',
      color: theme.palette.text.primary,
      //color: (props: { color: string }) => props.color,
      "&:hover, &.Mui-focusVisible": {
        color: (props: { color: string }) => props.color,
        fontWeight: 'bold',
      }
    },
    buttonGroup: {
      width: '100%',
    },
    box: {
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingRight: theme.spacing(2),
    }
  }),
);

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
  const classes = useItemStyles({ color: props.data.color });

  const title = useIntl().formatMessage({ id: props.data.title })

  return (
    <Card className={classes.card} raised>
      <CardHeader className={classes.cardHeader}
        avatar={<Avatar className={classes.cardAvatar}>{title.substring(0, 2)}</Avatar>}
        title={
          <Box display="flex" className={classes.box}>
            <Typography variant="h2">{title}</Typography>
            <Tooltip title={"Item help: Coming soon!"}><HelpOutlineIcon fontSize="small" /></Tooltip>
          </Box>
        }
      />

      <CardContent className={classes.cardContent}>
        <Typography color="textSecondary" variant="body2"><FormattedMessage id={props.data.desc} /></Typography>
      </CardContent>

      <CardActions>
        <ButtonGroup variant="text" fullWidth>
          <Button className={classes.button} onClick={props.onCreate}><FormattedMessage id={props.data.buttonCreate} /></Button>
          <Tooltip title={<FormattedMessage id="dashboard.view.helper" />}>
            <Button className={classes.button} onClick={props.data.onView}><FormattedMessage id={props.data.buttonViewAll} /></Button>
          </Tooltip>
        </ButtonGroup>
      </CardActions>
    </Card>
  )
}


//card view for all CREATE views
const Dashboard: React.FC<{}> = () => {
  const classes = useStyles();
  const theme = useTheme();
  const layout = Composer.useLayout();
  const { site } = Composer.useComposer();
  
  const [open, setOpen] = React.useState<number>();
  const handleClose = () => setOpen(undefined);
  const cards = React.useMemo(() => createCards(site, theme, layout), [site, theme, layout]);

  return (
    <div className={classes.root}>
      {open === undefined ? null : (cards[open].composer(handleClose))}
      {cards.map((card, index) => (<DashboardItem key={index} data={card} onCreate={() => setOpen(index)} />))}
    </div>
  );
}

export { Dashboard }
