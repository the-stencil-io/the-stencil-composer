import React from 'react';
import { makeStyles, createStyles, Theme, useTheme } from '@material-ui/core/styles';
import { Button, Card, CardHeader, CardActions, CardContent, Typography, Box, Tooltip, Avatar } from '@material-ui/core';

import { FormattedMessage, useIntl } from 'react-intl';

import { ArticleComposer } from './article';
import { LinkComposer } from './link';
import { WorkflowComposer } from './workflow';
import { LocaleComposer } from './locale';
import { ReleaseComposer } from './release';
import { NewPage } from './page';

import { API, Ide } from '../deps';

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
      width: '400px',
      display: 'flex',
      flexDirection: 'column',
      "&:hover, &.Mui-focusVisible": {
        color: (props: { color: string }) => props.color,
        fontWeight: 'bold',
      }
    },
    cardHeader: {
      padding: 0,

     },
    cardAvatar: {
      marginLeft: theme.spacing(1),
      backgroundColor: (props: { color: string }) => props.color,
      textTransform: 'uppercase'
    },
    cardActions: {
      justifyContent: 'flex-start'
    },
    cardContent: {
      flexGrow: 1,
    },
  }),
);

interface CardData {
  type: CardType;
  title: string;
  desc: string;
  color: string;
  composer: (handleClose: () => void) => React.ReactChild;
}

type CardType = "release" | "article" | "page" | "link" | "workflow" | "locale";

const createCards: (site: API.CMS.Site, theme: Theme) => CardData[] = (_site, theme) => ([
  {
    composer: (handleClose) => (<ArticleComposer onClose={handleClose} />),
    title: "composer.article.title",
    desc: "composer.article.desc",
    color: theme.palette.articleRed?.main,
    type: "article"
  },
  {
    composer: (handleClose) => (<NewPage onClose={handleClose} />),
    title: "composer.page.title",
    desc: "composer.page.desc",
    color: theme.palette.pageOrange?.main,
    type: "page"
  },

  {
    composer: (handleClose) => (<LinkComposer onClose={handleClose} />),
    title: "composer.link.title",
    desc: "composer.link.desc",
    color: theme.palette.linkYellow?.main,
    type: "link"
  },

  {
    composer: (handleClose) => (<WorkflowComposer onClose={handleClose} />),
    title: "composer.workflow.title",
    desc: "composer.workflow.desc",
    color: theme.palette.workflowBlue?.main,
    type: "workflow"
  },

  {
    composer: (handleClose) => (<LocaleComposer onClose={handleClose} />),
    title: "composer.locale.title",
    desc: "composer.locale.desc",
    color: theme.palette.localePurple?.main,
    type: "locale"
  },

  {
    composer: (handleClose) => (<ReleaseComposer onClose={handleClose} />),
    title: "composer.release.title",
    desc: "composer.release.desc",
    color: theme.palette.releaseGreen?.main,
    type: "release"
  },
]);

const DashboardItem: React.FC<{ data: CardData, onCreate: () => void }> = (props) => {
  const classes = useItemStyles({ color: props.data.color });
  
  const title = useIntl().formatMessage({id: props.data.title})
  return (
    <Card className={classes.card} variant="elevation">
      <CardHeader className={classes.cardHeader}
        avatar={<Avatar className={classes.cardAvatar}>{title.substring(0, 2)}</Avatar>}
        title={<Typography variant="h2">{title}</Typography>} />


      <CardContent className={classes.cardContent}>
        <Typography color="textSecondary" variant="caption"><FormattedMessage id={props.data.desc} /></Typography>
      </CardContent>

      <CardActions className={classes.cardActions}>
        <Box flexDirection="flex-end">
          <Button variant="contained" color="primary" onClick={props.onCreate}><FormattedMessage id="button.create" /></Button>
        </Box>
        <Tooltip title={<FormattedMessage id="dashboard.view.helper" />}>
          <Button variant="contained" color="secondary" onClick={() => console.error("not implemented")}><FormattedMessage id="button.view" /></Button>
        </Tooltip>
      </CardActions>
    </Card>
  )
}


//card view for all CREATE views
const Dashboard: React.FC<{}> = () => {
  const classes = useStyles();
  const theme = useTheme();
  const { site } = Ide.useIde().session;
  const [open, setOpen] = React.useState<number>();
  const handleClose = () => setOpen(undefined);
  const cards = React.useMemo(() => createCards(site, theme), [site]);

  return (
    <div className={classes.root}>
      {open === undefined ? null : (cards[open].composer(handleClose))}
      {cards.map((card, index) => (<DashboardItem key={index} data={card} onCreate={() => setOpen(index)} />))}
    </div>
  );
}

export { Dashboard }
