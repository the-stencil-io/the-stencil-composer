import React from 'react';
import { makeStyles, createStyles, Theme, useTheme } from '@material-ui/core/styles';
import { Button, ButtonGroup, Card, CardHeader, CardActions, CardContent, Typography, Tooltip, Avatar } from '@material-ui/core';

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
      border: '1px solid',
      borderColor: (props: { color: string }) => props.color,
      width: '400px',
      display: 'flex',
      fontWeight: 'bold',
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
      //color: (props: { color: string }) => props.color,
      "&:hover, &.Mui-focusVisible": {
        color: (props: { color: string }) => props.color,
        fontWeight: 'bold',
      }
    },
    buttonGroup: {
      width: '100%',
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
  composer: (handleClose: () => void) => React.ReactChild;
}

type CardType = "release" | "article" | "page" | "link" | "workflow" | "locale";

const createCards: (site: API.CMS.Site, theme: Theme) => CardData[] = (_site, theme) => ([
  {
    composer: (handleClose) => (<ArticleComposer onClose={handleClose} />),
    title: "composer.article.title",
    desc: "composer.article.desc",
    color: theme.palette.article?.main,
    type: "article",
    buttonCreate: "article.create",
    buttonViewAll: "button.view.all.articles"
  },
  {
    composer: (handleClose) => (<NewPage onClose={handleClose} />),
    title: "composer.page.title",
    desc: "composer.page.desc",
    color: theme.palette.page?.main,
    type: "page",
    buttonCreate: "page.create",
    buttonViewAll: "button.view.all.pages"
  },

  {
    composer: (handleClose) => (<LinkComposer onClose={handleClose} />),
    title: "composer.link.title",
    desc: "composer.link.desc",
    color: theme.palette.link?.main,
    type: "link",
    buttonCreate: "link.create",
    buttonViewAll: "button.view.all.links"
  },

  {
    composer: (handleClose) => (<WorkflowComposer onClose={handleClose} />),
    title: "composer.workflow.title",
    desc: "composer.workflow.desc",
    color: theme.palette.workflow?.main,
    type: "workflow",
    buttonCreate: "workflow.create",
    buttonViewAll: "button.view.all.workflows"
  },

  {
    composer: (handleClose) => (<LocaleComposer onClose={handleClose} />),
    title: "composer.locale.title",
    desc: "composer.locale.desc",
    color: theme.palette.locale?.main,
    type: "locale",
    buttonCreate: "locale.create",
    buttonViewAll: "button.view.all.locales"
  },

  {
    composer: (handleClose) => (<ReleaseComposer onClose={handleClose} />),
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
    <Card className={classes.card} variant="elevation">
      <CardHeader className={classes.cardHeader}
        avatar={<Avatar className={classes.cardAvatar}>{title.substring(0, 2)}</Avatar>}
        title={<Typography variant="h2">{title}</Typography>} />


      <CardContent className={classes.cardContent}>
        <Typography color="textSecondary" variant="body2"><FormattedMessage id={props.data.desc} /></Typography>
      </CardContent>

      <CardActions>
        <ButtonGroup variant="text" fullWidth>
          <Button className={classes.button} onClick={props.onCreate}><FormattedMessage id={props.data.buttonCreate} /></Button>
          <Tooltip title={<FormattedMessage id="dashboard.view.helper" />}>
            <Button className={classes.button} onClick={() => console.error("not implemented")}><FormattedMessage id={props.data.buttonViewAll} /></Button>
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
