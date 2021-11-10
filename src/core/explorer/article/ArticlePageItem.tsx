import * as React from "react";
import { Box, Typography, Theme, useTheme } from "@mui/material";

import TranslateIcon from "@mui/icons-material/Translate";
import SwitchLeftRoundedIcon from "@mui/icons-material/SwitchLeftRounded";


import { StyledTreeItemRoot } from './StyledTreeItem';
import { Composer } from '../../context';




const ArticlePageItem: React.FC<{ article: Composer.ArticleView, page: Composer.PageView }> = (props) => {

  const theme = useTheme<Theme>();
  const localeIconColor = theme.palette.locale.main;

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
    <StyledTreeItemRoot
      nodeId={nodeId}
      onClick={onLeftEdit}
      label={

        <Box sx={{ display: "flex", alignItems: "center", p: 0.5, pr: 0 }}>

          <Box component={TranslateIcon} sx={{mr: 3, p: .5, border: '1px solid', borderRadius: 3, boxShadow: 3}}
            color={nav?.value === page.body.locale ? localeIconColor : "inherit"} />

          <Typography
            variant="body2"
            sx={{ fontWeight: "inherit", flexGrow: 1 }}
          >
            {props.page.locale.body.value}
          </Typography>

          <Box component={SwitchLeftRoundedIcon} sx={{ mr: 3, border: '1px solid', borderRadius: 3, boxShadow: 3 }}
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
