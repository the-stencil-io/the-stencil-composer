import React from 'react';
import { FormattedMessage } from 'react-intl';

import { LinkEdit } from '../../link';
import { StencilClient } from '../../context';
import StencilStyles from '../../styles';


const LinkOptions: React.FC<{link: StencilClient.Link}> = ({ link }) => {

  const [dialogOpen, setDialogOpen] = React.useState<undefined | 'LinkEdit'>(undefined);
  const handleDialogClose = () => setDialogOpen(undefined);

  return (
    <>
      { dialogOpen === 'LinkEdit' ? <LinkEdit linkId={link.id} onClose={handleDialogClose} /> : null}
      <StencilStyles.TreeItemOption nodeId={link.id + 'link.edit'}
        color='link'
        onClick={() => setDialogOpen('LinkEdit')}
        labelText={<FormattedMessage id="link.edit.title" />}>
      </StencilStyles.TreeItemOption>
    </>
  );
}

export { LinkOptions }
