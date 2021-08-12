import React from 'react';
import Button from '@material-ui/core/Button';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';


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
