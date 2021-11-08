import React from 'react';
import { createStyles, makeStyles } from '@mui/styles';
import {
  Theme, Avatar, Box, Typography, Card, 
  CardActions, Button, FormControl, Input
} from '@mui/material';

import { FormattedMessage, useIntl } from 'react-intl';

import { Composer } from '../context';


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
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
    }
  }));



const ImportView: React.FC<{}> = () => {
  const classes = useStyles();
  const title = useIntl().formatMessage({ id: "imports" });
  const [file, setFile] = React.useState<string | undefined>();
  const [loading, setLoading] = React.useState<boolean | undefined>();
  const {service, actions} = Composer.useComposer();


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
              onChange={(e) => {
                const file: File = (e.target as any).files[0];
                const enc = new TextDecoder("utf-8"); 
                file.arrayBuffer().then(d => setFile(enc.decode(d)));
              }}
            />
          </FormControl>

        </div>
        <CardActions>
          <Button className={classes.button} variant="contained" disabled={!file || loading === true} 
            onClick={() => {
              if(!file) {
                return;
              }
              setLoading(true);
              service.create().importData(file)
                .then(() => actions.handleLoadSite())
                .then(() => {
                  setLoading(false);
                  setFile(undefined);
                });
            }}>
            <FormattedMessage id={'imports.import.action'} />
          </Button>
        </CardActions>
      </Card>
    </div>

  );
}

export { ImportView };
