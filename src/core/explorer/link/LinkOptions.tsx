import React from 'react';
import { FormattedMessage } from 'react-intl';
import EditIcon from '@mui/icons-material/ModeEdit';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';

import { LinkDelete } from '../../link/LinkDelete';
import { LinkEdit } from '../../link';
import { StencilClient } from '../../context';
import StencilStyles from '../../styles';


const LinkOptions: React.FC<{ link: StencilClient.Link }> = ({ link }) => {

  const [dialogOpen, setDialogOpen] = React.useState<undefined | 'LinkEdit' | 'LinkDelete'>(undefined);
  const handleDialogClose = () => setDialogOpen(undefined);

  return (
    <>
      { dialogOpen === 'LinkEdit' ? <LinkEdit linkId={link.id} onClose={handleDialogClose} /> : null}
      { dialogOpen === 'LinkDelete' ? <LinkDelete linkId={link.id} onClose={handleDialogClose} /> : null}

      <StencilStyles.TreeItemOption nodeId={link.id + 'link.edit'}
        color='link'
        icon={EditIcon}
        onClick={() => setDialogOpen('LinkEdit')}
        labelText={<FormattedMessage id="link.edit.title" />}>
      </StencilStyles.TreeItemOption>


      <StencilStyles.TreeItemOption nodeId={link.id + 'link.delete'}
        color='link'
        icon={DeleteOutlineOutlinedIcon}
        onClick={() => setDialogOpen('LinkDelete')}
        labelText={<FormattedMessage id="link.delete.title" />}>
      </StencilStyles.TreeItemOption>
    </>
  );
}

export { LinkOptions }
