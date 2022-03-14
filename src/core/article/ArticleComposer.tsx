import React from 'react';
import { ListItemText, Box, IconButton, Popover, Typography, Tooltip } from '@mui/material';
import { useSnackbar } from 'notistack';

import StencilStyles from '../styles';
import { Composer, StencilClient } from '../context';
import PageviewOutlinedIcon from '@mui/icons-material/PageviewOutlined';
import { FormattedMessage } from 'react-intl';

const DUMMY_ID = "none-selected"


const OrderNumberTooltip: React.FC<{}> = () => {
  const { session } = Composer.useComposer();
  const [anchorEl, setAnchorEl] = React.useState(null);


  const handlePopover = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  return (<>
    <Tooltip title={<FormattedMessage id="article.order.view" />}>
      <IconButton sx={{ ml: 2, color: 'uiElements.main' }}  onClick={handlePopover}>
        <PageviewOutlinedIcon fontSize="large" />
      </IconButton>
    </Tooltip>

    <Popover
      sx={{ ml: 2 }}
      open={open}
      onClose={handlePopoverClose}
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      transformOrigin={{
        vertical: 'center',
        horizontal: 'left',
      }}
    >

      <Typography variant='body2' sx={{ p: 1 }}>
        {session.articles
          .map(view => view.article)
          .sort((l0, l1) => l0.body.order - l1.body.order)
          .map(({ id, body }) => (
            <ListItemText key={id} primary={`${body.order} - ${body.name}`} />
          ))}
      </Typography>
    </Popover>
  </>
  )

}


const ArticleComposer: React.FC<{ onClose: () => void }> = ({ onClose }) => {

  const { service, actions, session } = Composer.useComposer();
  const { enqueueSnackbar } = useSnackbar();
  const [name, setName] = React.useState("");
  const [order, setOrder] = React.useState(0);
  const [parentId, setParentId] = React.useState("");

  const message = <FormattedMessage id="snack.article.createdMessage" values={{ name }} />
  
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


  return (
    <StencilStyles.Dialog open={true} onClose={onClose}
      backgroundColor="uiElements.main" title="article.composer.title"
      submit={{ title: "article.create", onClick: handleCreate, disabled: !name }}>
      <>

        <StencilStyles.Select label="article.composer.parent"
          helperText={"article.parent.helper"}
          selected={parentId}
          onChange={setParentId}
          empty={{ id: DUMMY_ID, label: 'article.composer.parent.unselected' }}
          items={session.articles
            .map(view => view.article)
            .sort((l0, l1) => l0.body.order - l1.body.order)
            .map(({ id, body }) => ({
              id,
              value: (<ListItemText primary={`${body.order} - ${body.name}`} />)
            }))}
        />
        <Box display='flex'>
          <Box>
            <StencilStyles.NumberField label="article.order" helperText='article.composer.orderhelper'
              onChange={setOrder}
              value={order}
              placeholder={400}
            />
          </Box>
          <Box sx={{width: '10%'}}>
            <OrderNumberTooltip />
          </Box>
        </Box>
        <StencilStyles.TextField label="article.name" required
          value={name}
          onChange={setName}
        />
      </>
    </StencilStyles.Dialog>
  );
}

export { ArticleComposer }