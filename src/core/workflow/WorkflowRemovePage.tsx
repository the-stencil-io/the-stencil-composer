import React from 'react';

import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import { createStyles, makeStyles } from '@mui/styles';
import { Theme, IconButton, DialogContentText } from '@mui/material';
import { FormattedMessage } from 'react-intl';

import StencilStyles from '../styles';
import { Composer, StencilClient } from '../context';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    margin: {
      marginRight: theme.spacing(1)
    },
    iconButton: {
      padding: 2,
      margin: 2,
      color: theme.palette.workflow.main,
      "&:hover, &.Mui-focusVisible": {
        backgroundColor: theme.palette.workflow.main,
        color: theme.palette.background.paper,
        "& .MuiSvgIcon-root": {
          color: theme.palette.background.paper,
        }
      }
    },
  }),
);


interface WorkflowRemovePageProps {
  workflow: StencilClient.Workflow;
  article: StencilClient.Article;
  locale: StencilClient.Locale;
}

const WorkflowRemovePage: React.FC<WorkflowRemovePageProps> = ({ workflow, article, locale }) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const { service, actions } = Composer.useComposer();

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };


  const handleDelete = () => {
    service.delete().workflowArticlePage(workflow.id, article.id, locale).then(_success => {
      handleClose();
      actions.handleLoadSite();
    })
  }


  return (
    <div className={classes.margin}>
      <IconButton className={classes.iconButton} onClick={handleClickOpen}>
        <RemoveCircleOutlineIcon />
      </IconButton>

      <StencilStyles.Dialog open={open} onClose={handleClose}
        color="workflow.main"
        title="workflow.removepage.title"
        submit={{ title: "button.remove", onClick: handleDelete, disabled: false }}>
        <DialogContentText>
          <FormattedMessage id="workflow.removepage" />
        </DialogContentText>
      </StencilStyles.Dialog>
    </div>
  );
}
export { WorkflowRemovePage }
