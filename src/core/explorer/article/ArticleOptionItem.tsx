import React from 'react';
import { Box, Typography, useTheme } from "@mui/material";
import EditIcon from '@mui/icons-material/ModeEdit';
import StencilStyles from '../../styles';


const ArticleOptionItem: React.FC<{
  labelText: React.ReactNode;
  nodeId: string;
  color: string;
  onClick: () => void
}> = (props) => {
  const theme = useTheme();

  return (
    <StencilStyles.TreeItemRoot
      onClick={props.onClick}
      nodeId={props.nodeId}

      label={
        <Box sx={{ display: "flex", alignItems: "center", p: 0.5, pr: 0 }}>
          <Box component={EditIcon} color={theme.palette[props.color].main} sx={{ pl: 1, mr: 1 }} />
          <Typography
            variant="body2"
            sx={{ fontWeight: "inherit", flexGrow: 1 }}
          >
            {props.labelText}
          </Typography>
        </Box>
      }
    />
  );
}
export default ArticleOptionItem;
