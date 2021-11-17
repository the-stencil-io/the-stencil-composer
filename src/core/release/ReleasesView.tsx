import React from 'react';
import {
  Box, Typography, IconButton, Table, TableBody,
  TableCell, TableContainer, TableRow, TableHead, Paper, Card
} from '@mui/material';
import GetAppIcon from '@mui/icons-material/GetApp';
import { FormattedMessage, useIntl } from 'react-intl';
import fileDownload from 'js-file-download'

import StencilStyles from '../styles';
import { Composer, StencilClient } from '../context';



const ReleasesView: React.FC<{}> = () => {

  const { site, service } = Composer.useComposer();
  const releases = Object.values(site.releases);
  const []
  const title = useIntl().formatMessage({ id: "releases" });

  const onDownload = (release: StencilClient.Release) => {
    service.getReleaseContent(release).then(content => {
      const data = JSON.stringify(content, null, 2);
      console.log(data);
      fileDownload(data, release.body.name + '.json');
    })
  }

  return (
    <>
      <Box sx={{ paddingBottom: 1, m: 2 }}>
        <Box display="flex">
          <Box alignSelf="center">
            <Typography variant="h3" sx={{ p: 1, mb: 3, fontWeight: "bold", color: "mainContent.dark" }}>
              <FormattedMessage id="releases" />: {releases.length}
            </Typography>
          </Box>
          <Box flexGrow={1} />
          <Box>
            <StencilStyles.SecondaryButton label={"button.cancel"} onClick={cancel.onClick} sx={{ marginRight: 1 }} />
            <StencilStyles.PrimaryButton label={"button.create"} onClick={() => submit.onClick(selected)} />
          </Box>
        </Box>

        <Box display="flex" sx={{ justifyContent: 'center' }}>

          <Card sx={{ margin: 1, width: 'fill-available' }}>
            <Typography variant="h4" sx={{ p: 2, backgroundColor: "table.main" }}>
              <FormattedMessage id="locales" />
            </Typography>

            <TableContainer component={Paper}>
              <Table size="small">
                <TableHead>
                  <TableRow sx={{ p: 1 }}>
                    <TableCell align="left" sx={{ fontWeight: 'bold' }}><FormattedMessage id="tag" /></TableCell>
                    <TableCell align="left" sx={{ fontWeight: 'bold' }}><FormattedMessage id="created" /></TableCell>
                    <TableCell align="left" sx={{ fontWeight: 'bold' }}><FormattedMessage id="release.composer.note" /></TableCell>
                    <TableCell align="center" sx={{ fontWeight: 'bold' }}><FormattedMessage id="download" /></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {releases.map((release, index) => (
                    <Row key={index}
                      release={release}
                      onDownload={() => onDownload(release)}
                    />))}
                </TableBody>
              </Table>
            </TableContainer>
          </Card>
        </Box>
      </Box>
    </>
  );
}


const Row: React.FC<{ release: StencilClient.Release, onDownload: () => void }> = ({ release, onDownload }) => {


  return (
    <>
      <TableRow key={release.id}>
        <TableCell align="left" >{release.body.name}</TableCell>
        <TableCell align="left">{release.created}</TableCell>
        <TableCell align="left">{release.body.note}</TableCell>
        <TableCell align="center" >
          <IconButton onClick={onDownload} sx={{ color: 'uiElements.main' }}><GetAppIcon /> </IconButton>
        </TableCell>
      </TableRow>
    </>
  )
}

export { ReleasesView }




