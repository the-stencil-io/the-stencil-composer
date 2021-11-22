import React from "react";

import FolderOutlinedIcon from '@mui/icons-material/FolderOutlined';
import LinkIcon from '@mui/icons-material/Link';
import EditIcon from '@mui/icons-material/ModeEdit';

import { FormattedMessage } from 'react-intl';

import StencilStyles from '../../styles';
import { Composer, StencilClient } from '../../context';

import { LinkOptions } from './LinkOptions';
import ArticleItem from '../article/ArticleItem';

const LinkItem: React.FC<{ linkId: StencilClient.LinkId }> = ({ linkId }) => {
  const { session } = Composer.useComposer();
  const view = session.getLinkView(linkId);
  const { link } = view;


  const workflowName = session.getLinkName(link.id);

  return (
    <>
      <StencilStyles.TreeItem
        nodeId={link.id}
        labelText={workflowName.name}
        labelcolor="explorerItem"
        labelIcon={LinkIcon}
        >

        <StencilStyles.TreeItem nodeId={link.id + 'options-nested'} labelText={<FormattedMessage id="options" />} labelIcon={EditIcon}>
          <LinkOptions link={link} />
        </StencilStyles.TreeItem>


        {/** Article options */}
        <StencilStyles.TreeItem nodeId={link.id + 'articles-nested'}
          labelText={<FormattedMessage id="articles" />}
          labelIcon={FolderOutlinedIcon}
          labelInfo={`${link.body.articles.length}`}
          labelcolor="article">

          {link.body.articles.map((id => session.getArticleView(id))).map(view => (
            <ArticleItem key={view.article.id} articleId={view.article.id} nodeId={`${link.id}-${view.article.id}-nested`}/>
          ))}
        </StencilStyles.TreeItem>

      </StencilStyles.TreeItem>
    </>)
}

export default LinkItem;
