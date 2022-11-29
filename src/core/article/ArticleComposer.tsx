import React from 'react';
import { Box, IconButton, Popover, Typography, Tooltip, ListItem, Slider, Stack } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useSnackbar } from 'notistack';

import Burger from '@the-wrench-io/react-burger';

import { Composer, StencilClient } from '../context';
import PageviewOutlinedIcon from '@mui/icons-material/PageviewOutlined';
import { FormattedMessage } from 'react-intl';

const DUMMY_ID = "none-selected"

const StyledSlider = styled(Slider)(({ theme }) => ({
  color: theme.palette.uiElements.main,
}));

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
      <IconButton sx={{ ml: 2, mt: 2, color: 'uiElements.main' }}  onClick={handlePopover}>
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
          .map(({ id, body }) => (
           <ListItem sx={ body.parentId ? { ml: 2, color: 'article.dark', pb: 1,  } : {pb: 1} }>{`${body.order} - ${body.name}`}</ListItem>
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
  const [parentId, setParentId] = React.useState("");
  const [error, setError] = React.useState<string | undefined>(undefined);

  const message = <FormattedMessage id="snack.article.createdMessage" values={{ name }} />
  
  let marks = session.articles.map(view => view.article).map(({ id, body }) => ({ value: body.order, label: body.name }));
  const min = Math.min(...marks.map(({ value }) => value));
  const max = Math.max(...marks.map(({ value }) => value));
  const mid = Math.round((max - min) / 2);

  const initialValue = marks.map(({ value }) => value).includes(mid) ? mid + 1 : mid;

  const [order, setOrder] = React.useState(initialValue);

  marks = [...marks].concat({ value: order, label: name });

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

  const validInput = order > 0 && !session.articles.map(view => view.article).map(article => article.body.order).includes(order);

  React.useEffect(() => {
    setError(validInput ? undefined : "article.edit.orderhelper.invalid")
  }, [order])

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
        <Burger.TextField label="article.name" required
          value={name}
          onChange={setName}
        />
        <Box display={'flex'}>
          <Box sx={{ width: '90%' }}>
            <Burger.NumberField label="article.order" helperText={error ? error : 'article.composer.orderhelper'}
              onChange={setOrder}
              value={order}
              placeholder={mid}
              error={error !== undefined}
            />
          </Box>
          <Box sx={{width: '10%'}}>
            <OrderNumberTooltip />
          </Box>
        </Box>
        <Stack sx={{ height: 100*marks.length }} spacing={1} direction="row">
          <StyledSlider
            orientation="vertical"
            defaultValue={mid}
            valueLabelDisplay="on"
            marks={marks}
            track={false}
            min={0}
            max={max+max*0.5}
            step={1}
            value={order}
            onChange={(event, value) => setOrder(value as number)}
          />
        </Stack>
      </>
    </Burger.Dialog>
  );
}

export { ArticleComposer }