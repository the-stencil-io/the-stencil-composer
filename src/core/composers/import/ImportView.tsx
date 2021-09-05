import React from 'react';
import {
  makeStyles, createStyles, Theme, Avatar, Box, Typography, Card, CardHeader, CardContent,
  CardActions, ButtonGroup, Button, FormControl, Input
} from '@material-ui/core';
import AccountCircle from '@material-ui/icons/AccountCircle';

import { FormattedMessage, useIntl } from 'react-intl';



const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    bold: {
      fontWeight: 'bold'
    },
    title: {
      margin: theme.spacing(1),
      color: theme.palette.text.primary
    },
    avatar: {
      alignSelf: "center",
      marginLeft: theme.spacing(1),
      backgroundColor: theme.palette.import.main,
      textTransform: 'uppercase'
    },
    card: {
      margin: theme.spacing(1),
      padding: theme.spacing(1),
      //height: '50%',
      display: 'flex',
      fontWeight: 'bold',
      flexDirection: 'column',
    },
    cardHeader: {
      padding: 0,
    },
    cardContent: {
      flexGrow: 1,
    },
    margin: {
      margin: theme.spacing(2),
    },
    input: {
      padding: theme.spacing(1),
      color: theme.palette.import.main,
      fontWeight: 'bold'
    },
    button: {
      fontWeight: 'bold',
      width: '25%',
      backgroundColor: theme.palette.import.dark,
      color: theme.palette.secondary.contrastText,
      "&:hover": {
        backgroundColor: theme.palette.import.main,
        color: theme.palette.secondary.contrastText,
      }
    },
    buttonGroup: {
      width: '100%',
    }

  }));



const ImportView: React.FC<{}> = () => {
  const classes = useStyles();
  const title = useIntl().formatMessage({ id: "imports" });

  return (

    <div>
      <Box display="flex">
        <Avatar className={classes.avatar}>{title.substring(0, 2)}</Avatar>
        <Typography variant="h3" className={classes.title}><FormattedMessage id="toolbar.import" /></Typography>
      </Box>
      <Card className={classes.card}>
        <FormattedMessage id="imports.select" />

        <div>
          <FormControl className={classes.margin}>
            <Input
              className={classes.input}
              fullWidth
              disableUnderline
              type="file"
            />
          </FormControl>

        </div>
        <CardActions>
          <Button className={classes.button} variant="contained" ><FormattedMessage id={'imports.import.action'} /></Button>
        </CardActions>
      </Card>
    </div>

  );
}

export { ImportView };
