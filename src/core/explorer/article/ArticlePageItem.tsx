import React from "react";
import { SxProps } from '@mui/system';
import { Box, Typography, Theme, useTheme } from "@mui/material";

import LeftEditIcon from "@mui/icons-material/BorderLeft";
import RightEditIcon from "@mui/icons-material/BorderRight";

//import AlignHorizontalLeftIcon from '@mui/icons-material/AlignHorizontalLeft';

import StencilStyles from '../../styles';
import { Composer } from '../../context';




const ArticlePageItem: React.FC<{ article: Composer.ArticleView, page: Composer.PageView, saveIcon?: React.ReactChild }> = (props) => {

  const theme = useTheme<Theme>();
  const localeIconColor = theme.palette.page.main;

  const { handleInTab, findTab } = Composer.useNav();
  const page = props.page.page;
  const article = props.article.article;
  const nodeId = props.page.page.id
  const oldTab = findTab(article);
  const nav = oldTab?.data?.nav;


  const onLeftEdit = () => handleInTab({ article, type: "ARTICLE_PAGES", locale: page.body.locale })
  const onRightEdit = () => {

    const secondary = nav?.value ? true : false
    // Same locale on the right side
    if (nav?.value && nav?.value === page.body.locale) {
      return;
    }

    // Close the locale     
    if (nav?.value2 === page.body.locale) {
      handleInTab({ article, type: "ARTICLE_PAGES", locale: null, secondary })
    } else {
      handleInTab({ article, type: "ARTICLE_PAGES", locale: page.body.locale, secondary })
    }
  }

  return (
    <StencilStyles.TreeItemRoot
      nodeId={nodeId}
      onClick={onLeftEdit}
      style={{
        "--tree-view-color": theme.palette.explorerItem.main
      }}
      label={

        <Box sx={{ display: "flex", alignItems: "center", p: 0.5, pr: 0 }}>
          {
            props.saveIcon ? props.saveIcon : (<Box component={LeftEditIcon} color={nav?.value === page.body.locale ? localeIconColor : "inherit"} />) 
          }
          
          <Typography
            variant="body2"
            sx={{ fontWeight: "inherit", flexGrow: 1, pl: 1 }}
          >
            {props.page.locale.body.value}
          </Typography>

          <Box component={RightEditIcon}
            color={nav?.value2 === page.body.locale ? localeIconColor : "inherit"}
            onClick={(event) => {
              event.stopPropagation()
              onRightEdit();
            }}
          />
        </Box>
      }
    />
  );
}

export default ArticlePageItem;
