import React from 'react';

import { Composer, StencilClient } from '../context';
import Burger from '@the-wrench-io/react-burger';
import { useSnackbar } from 'notistack';
import { FormattedMessage } from 'react-intl';

import { Box, Divider, ListItem, Theme, Typography } from '@mui/material';
import { TreeView, TreeItem } from '@mui/lab';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { createStyles, makeStyles } from '@mui/styles';

const DUMMY_ID = "none-selected"

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    treeItem: {
      backgroundColor: '#d3d3d3',
    },
    treeItemGeneric: {
    },
}));

const calculateInitialOrderNumber = (articles: number[]) => {
  const min = Math.min(...articles);
  const max = Math.max(...articles);
  const mid = Math.round((max - min) / 2);

  return articles.includes(mid) ? mid + 1 : mid;
}

const ArticleComposer: React.FC<{ onClose: () => void }> = ({ onClose }) => {

  const classes = useStyles();
  const { service, actions, session } = Composer.useComposer();
  const { enqueueSnackbar } = useSnackbar();
  const [name, setName] = React.useState("New Article Name");
  const [parentId, setParentId] = React.useState("");
  const [error, setError] = React.useState<string | undefined>(undefined);

  const message = <FormattedMessage id="snack.article.createdMessage" values={{ name }} />
  
  const articleNumbers = session.articles.map(view => view.article).map(article => article.body.order);
  const initialValue = articleNumbers.length > 0 ? calculateInitialOrderNumber(articleNumbers) : 0;
  const [order, setOrder] = React.useState(initialValue);

  const handleCreate = () => {
    const entity: StencilClient.CreateArticle = { name, parentId: parentId && parentId !== DUMMY_ID ? parentId : undefined, order };
    console.log("entity", entity)

    service.create().article(entity).then(success => {
      console.log(success)
      enqueueSnackbar(message, {variant: 'success'});
      onClose();
      actions.handleLoadSite();
    });
  }

  React.useEffect(() => {
    const isValidInput = order >= 0 && !articleNumbers.includes(Number(order));
    setError(isValidInput ? undefined : "article.edit.orderhelper.invalid")
  }, [order, articleNumbers])

  return (
    <Burger.Dialog open={true} onClose={onClose}
      backgroundColor="uiElements.main" title="article.composer.title"
      submit={{ title: "article.create", onClick: handleCreate, disabled: !name || error !== undefined }}>
      <>
        <Burger.Select label="article.composer.parent"
          helperText={"article.parent.helper"}
          selected={parentId}
          onChange={setParentId}
          empty={{ id: DUMMY_ID, label: 'article.composer.parent.unselected' }}
          items={session.articles
            .map(view => view.article)
            .map(({ id, body }) => ({
              id,
              value: (<ListItem sx={ body.parentId ? { ml: 2, color: 'article.dark' } : undefined }>{`${body.order} - ${body.name}`}</ListItem>)
            }))}
        />
        <Box display={'flex'} justifyContent={'space-between'}>
          <Box sx={{ width: '78%' }}>
            <Burger.TextField label="article.name" required
              value={name}
              onChange={setName}
            />
          </Box>
          <Box sx={{ width: '20%' }}>
            <Burger.NumberField label="article.order"
              onChange={setOrder}
              value={order}
              placeholder={initialValue}
              error={error !== undefined}
            />
          </Box>
        </Box>
        <Divider sx={{ mt: 2, mb: 1 }} />
        <Typography variant="caption" sx={{ mt: 2, mb: 1 }} color={error ? 'red' : 'black'} ><FormattedMessage id={error ? error : 'article.composer.orderhelper'} /></Typography>
        <Divider sx={{ mb: 2, mt: 1 }} />
        <TreeView
          defaultCollapseIcon={<ExpandMoreIcon />}
          defaultExpandIcon={<ChevronRightIcon />}
        >
          {session.articles
            .map(view => view.article)
            .concat({ id: DUMMY_ID, body: { name , order, parentId } })
            .filter(article => !article.body.parentId) // for mock
            //.filter(article => article.body.parentId === null || article.body.parentId === "")
            .sort((a, b) => a.body.order - b.body.order)
            .map(({ id, body }) => (
              <TreeItem key={id} nodeId={id} label={`${body.order} - ${body.name}`} className={id === DUMMY_ID ? classes.treeItem : classes.treeItemGeneric}>
                {session.articles
                  .map(view => view.article)
                  .concat({ id: DUMMY_ID, body: { name , order, parentId } })
                  .filter(article => article.body.parentId === id)
                  .map(({ id, body }) => (<TreeItem key={id} nodeId={id} label={`${body.order} - ${body.name}`} className={id === DUMMY_ID ? classes.treeItem : classes.treeItemGeneric} />))}
              </TreeItem>
            ))}
        </TreeView>
      </>
    </Burger.Dialog>
  );
}

export { ArticleComposer }