import * as React from "react";
import { styled } from "@mui/material/styles";
import {Typography, Box, useTheme} from "@mui/material";
import TreeItem, { TreeItemProps, treeItemClasses } from "@mui/lab/TreeItem";
import { SvgIconProps } from "@mui/material/SvgIcon";


const StyledTreeItemRoot = styled(TreeItem)(({ theme }) => ({
  color: `var(--tree-view-text-color, ${theme.palette.text.secondary})`,
  [`& .${treeItemClasses.content}`]: {
    color: `var(--tree-view-text-color, ${theme.palette.text.secondary})`,
    borderTopRightRadius: theme.spacing(2),
    borderBottomRightRadius: theme.spacing(2),
    paddingRight: theme.spacing(1),
    fontWeight: theme.typography.fontWeightMedium,
    "&.Mui-expanded": {
      fontWeight: theme.typography.fontWeightRegular
    },
    "&:hover": {
      backgroundColor: `var(--tree-view-hover-color, ${theme.palette.action.hover})`,
    },
    "&.Mui-focused, &.Mui-selected, &.Mui-selected.Mui-focused": {
      backgroundColor: `var(--tree-view-bg-color, ${theme.palette.action.selected})`,
      color: "var(--tree-view-color)"
    },
    [`& .${treeItemClasses.label}`]: {
      fontWeight: "inherit",
      color: "inherit"
    }
  },
  [`& .${treeItemClasses.group}`]: {
    marginLeft: 0,
    [`& .${treeItemClasses.content}`]: {
      paddingLeft: theme.spacing(2)
    }
  }
}));

type StyledTreeItemProps = TreeItemProps & {
  color?: string;
  bgcolor?: string;
  hovercolor?: string;
  textcolor?: string;
  labelIcon?: React.ElementType<SvgIconProps>;
  labelInfo?: string;
  labelText: string | React.ReactChild;
};

const StyledTreeItem: React.FC<StyledTreeItemProps> = (props) => {
  const theme = useTheme();
  const {
    color,
    bgcolor,
    hovercolor,
    textcolor,
    labelIcon: LabelIcon,
    labelInfo,
    labelText,
    ...other
  } = props;
  
  return (
    <StyledTreeItemRoot
      label={
        <Box sx={{ display: "flex", alignItems: "center", p: 0.5, pr: 0 }}>
          <Box component={LabelIcon} color="inherit" sx={{ mr: 1 }} />
          <Typography
            variant="body2"
            sx={{ fontWeight: "inherit", flexGrow: 1 }}
          >
            {labelText}
          </Typography>
          <Typography variant="caption" color="inherit">
            {labelInfo}
          </Typography>
        </Box>
      }
      
      {...other}
      style={{
        '--tree-view-text-color': textcolor ? theme.palette[textcolor].main : textcolor,
        '--tree-view-color': color ? theme.palette[color].main : color,
        '--tree-view-bg-color': bgcolor ? theme.palette[bgcolor].main : bgcolor,
        '--tree-view-hover-color': hovercolor ? theme.palette[hovercolor].main : hovercolor,
      }}
    />
  );
}

export type { StyledTreeItemProps };
export { StyledTreeItem, StyledTreeItemRoot};