import React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { Button, Card, CardActions, CardContent, Typography, Box, Tooltip } from '@material-ui/core';

import { FormattedMessage } from 'react-intl';

import { ArticleComposer, ArticlesView } from './article';
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
    card: {
      margin: theme.spacing(1),
      width: '400px',
      display: 'flex',
      flexDirection: 'column',
      "&:hover, &.Mui-focusVisible": {
        color: theme.palette.secondary.dark,
        fontWeight: 'bold',
      }
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
  title: string;
  desc: string;
  composer: (handleClose: () => void) => React.ReactChild;
}

type CardType = "release" | "article" | "page" | "link" | "workflow" | "locale";

const createCards: (site: API.CMS.Site) => Record<CardType, CardData> = (_site) => ({
  article: {
    composer: (handleClose) => (<ArticleComposer onClose={handleClose} />),
    title: "composer.article.title",
    desc: "composer.article.desc"
  },

  locale: {
    composer: (handleClose) => (<LocaleComposer onClose={handleClose} />),
    title: "composer.locale.title",
    desc: "composer.locale.desc"
  },

  page: {
    composer: (handleClose) => (<NewPage open={true} onClose={handleClose} />),
    title: "composer.page.title",
    desc: "composer.page.desc",
  },

  link: {
    composer: (handleClose) => (<LinkComposer onClose={handleClose} />),
    title: "composer.link.title",
    desc: "composer.link.desc"
  },

  workflow: {
    composer: (handleClose) => (<WorkflowComposer onClose={handleClose} />),
    title: "composer.workflow.title",
    desc: "composer.workflow.desc"
  },

  release: {
    composer: (handleClose) => (<ReleaseComposer onClose={handleClose} />),
    title: "composer.release.title",
    desc: "composer.release.desc"
  },
});


//card view for all CREATE views
const Dashboard: React.FC<{}> = () => {
  const classes = useStyles();
  const { site } = Ide.useIde().session;
  const [open, setOpen] = React.useState<CardType>();
  const handleOpen = (type: CardType) => setOpen(type);
  const handleClose = () => setOpen(undefined);
  
  const cards = React.useMemo(() => createCards(site), [site]);

  return (
    <div className={classes.root}>
      {!open ? null : (cards[open].composer(handleClose))}
      {Object.entries(cards).map((card, index) => (
        <Card key={index} className={classes.card} variant="elevation">

          <CardContent className={classes.cardContent}>
            <Typography variant="h6"><FormattedMessage id={card[1].title} /></Typography>
            <Typography color="textSecondary" variant="caption"><FormattedMessage id={card[1].desc} /></Typography>
          </CardContent>
          <CardActions className={classes.cardActions}>
            <Box flexDirection="flex-end">
              <Button variant="contained" color="primary" onClick={() => handleOpen(card[0] as any)}><FormattedMessage id="button.create" /></Button>
            </Box>
               <Tooltip title={<FormattedMessage id="dashboard.view.helper" />}><Button variant="contained" color="secondary" onClick={() => handleOpen(card[0] as any)}><FormattedMessage id="button.view" /></Button></Tooltip>
          </CardActions>

        </Card>
      ))}
    </div>
  );
}

export { Dashboard }
