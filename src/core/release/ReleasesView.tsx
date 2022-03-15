import React from 'react';
import {
  Box, Typography, IconButton, Table, TableBody,
  TableCell, TableContainer, TableRow, TableHead, Paper, Card
} from '@mui/material';
import GetAppIcon from '@mui/icons-material/GetApp';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

import { FormattedMessage } from 'react-intl';
import fileDownload from 'js-file-download'

import StencilStyles from '../styles';
import { Composer, StencilClient } from '../context';
import { ReleaseComposer, ReleaseDelete } from './';


const ReleasesView: React.FC<{}> = () => {
  const { site, service } = Composer.useComposer();
  const layout = Composer.useLayout();
  const releases = Object.values(site.releases);
  const [releaseComposer, setReleaseComposer] = React.useState(false);

  const onDownload = (release: StencilClient.Release) => {
    service.getReleaseContent(release).then(content => {
      const data = JSON.stringify(content, null, 2);
      console.log(data);
      fileDownload(data, release.body.name + '.json');
    })
  }

  return (
    <>
      {releaseComposer ? <ReleaseComposer onClose={() => setReleaseComposer(false)} /> : null}

      <Box sx={{ paddingBottom: 1, m: 2 }}>
        <Box display="flex">
          <Box alignSelf="center">
            <Typography variant="h3" sx={{ p: 1, mb: 3, fontWeight: "bold", color: "mainContent.dark" }}>
              <FormattedMessage id="releases" />: {releases.length}
              <Typography variant="body2" sx={{ pt: 1 }}><FormattedMessage id={"release.desc"} /></Typography>
            </Typography>
          </Box>
          <Box flexGrow={1} />
          <Box>
            <StencilStyles.SecondaryButton label={"button.cancel"} onClick={() => layout.actions.handleTabCloseCurrent()} sx={{ marginRight: 1 }} />
            <StencilStyles.SecondaryButton label={"button.releasegraph"} onClick={() => layout.actions.handleTabAdd({ id: 'graph', label: "Release Graph" })} sx={{ marginRight: 1 }} />
            <StencilStyles.PrimaryButton label={"button.create"} onClick={() => setReleaseComposer(true)} />
          </Box>
        </Box>

        <Box display="flex" sx={{ justifyContent: 'center' }}>

          <Card sx={{ margin: 1, width: 'fill-available' }}>
            <Typography variant="h4" sx={{ p: 2, backgroundColor: "table.main" }}>
              <FormattedMessage id="releases" />
            </Typography>

            <TableContainer component={Paper}>
              <Table size="small">
                <TableHead>
                  <TableRow sx={{ p: 1 }}>
                    <TableCell align="left" sx={{ fontWeight: 'bold' }}><FormattedMessage id="tag" /></TableCell>
                    <TableCell align="left" sx={{ fontWeight: 'bold' }}><FormattedMessage id="created" /></TableCell>
                    <TableCell align="left" sx={{ fontWeight: 'bold' }}><FormattedMessage id="release.composer.note" /></TableCell>
                    <TableCell align="center" sx={{ fontWeight: 'bold' }}><FormattedMessage id="download" /></TableCell>
                    <TableCell align="center" sx={{ fontWeight: 'bold' }}><FormattedMessage id="delete" /></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {releases.map(r => ({ id: new Date(r.body.created as string), body: r }))
                    .sort(({ id: a }, { id: b }) => a > b ? -1 : a < b ? 1 : 0)
                    .map((release, index) => (
                      <Row key={index}
                        release={release.body}
                        onDownload={() => onDownload(release.body)}
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
  const [releaseDeleteOpen, setReleaseDeleteOpen] = React.useState(false);

  return (
    <>
      {releaseDeleteOpen ? <ReleaseDelete id={release.id} onClose={() => setReleaseDeleteOpen(false)} /> : null}

      <TableRow key={release.id}>
        <TableCell align="left" >{release.body.name}</TableCell>
        <TableCell align="left">{release.body.created}</TableCell>
        <TableCell align="left">{release.body.note}</TableCell>
        <TableCell align="center" >
          <IconButton onClick={onDownload} sx={{ color: 'uiElements.main' }}><GetAppIcon /> </IconButton>
        </TableCell>
        <TableCell align="center" >
          <IconButton onClick={() => setReleaseDeleteOpen(true)} sx={{ color: 'error.main' }}><DeleteOutlineIcon /> </IconButton>
        </TableCell>
      </TableRow>
    </>
  )
}

export { ReleasesView }




