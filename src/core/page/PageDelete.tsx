import React from 'react';
import { createStyles, makeStyles } from '@mui/styles';
import { Theme, FormControl, MenuItem, Select } from '@mui/material';
import { FormattedMessage } from 'react-intl';

import { StyledDialog } from '../styles/StyledDialog';
import { Composer, StencilClient } from '../context';


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    select: {
      padding: theme.spacing(1),
      marginTop: theme.spacing(1),
      backgroundColor: theme.palette.background.paper
    },
  }),
);

const PageDelete: React.FC<{ onClose: () => void, articleId: StencilClient.ArticleId }> = (props) => {
  const classes = useStyles();
  const { service, actions, site } = Composer.useComposer();
  const [pageId, setPageId] = React.useState('');

  const handleDelete = () => {
    service.delete().page(pageId).then(_success => {
      props.onClose();
      actions.handleLoadSite();
    })
  }
  const articlePages: StencilClient.Page[] = Object.values(site.pages).filter(p => p.body.article === props.articleId);
  return (
    <StyledDialog open={true} onClose={props.onClose} color="page.main"
      title="pages.delete"
      submit={{ title: "button.delete", onClick: handleDelete, disabled: !pageId }}>
      <>
        <FormattedMessage id='pages.delete.message' />
        <FormControl variant="outlined" className={classes.select} fullWidth>
          <Select
            className={classes.select}
            variant="outlined"
            value={pageId}
            onChange={({ target }) => setPageId(target.value as any)}
            label={<FormattedMessage id='pages.edit.selectpage' />}
          >
            {articlePages.map((articlePage, index) => (
              <MenuItem key={index} value={articlePage.id}>{site.locales[articlePage.body.locale].body.value}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </>
    </StyledDialog>
  );
}

export { PageDelete }