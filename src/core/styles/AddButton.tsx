import React from 'react';
import Button from '@mui/material/Button';
import { createStyles, makeStyles } from '@mui/styles';
import { Theme } from '@mui/material/styles';
import AddIcon from '@mui/icons-material//Add';


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    button: {
      marginLeft: theme.spacing(1),
      padding: theme.spacing(2),
      backgroundColor: theme.palette.primary.dark,
      color: theme.palette.background.paper,
      "&:hover, &.Mui-focusVisible": {
        backgroundColor: theme.palette.info.main,
        color: theme.palette.background.paper,
        "& .MuiSvgIcon-root": {
          color: theme.palette.background.paper,
        }
      }
    },
  }),
);

interface AddButtonProps {

}

const AddButton: React.FC<AddButtonProps> = () => {
  const classes = useStyles();

  return (
    <div>
      <Button
        variant="contained"
        className={classes.button}
        startIcon={<AddIcon />} >
        
        AddButton
      </Button>
    </div>
  );
}

export { AddButton }
