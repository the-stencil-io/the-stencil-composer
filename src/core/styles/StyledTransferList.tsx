import React from 'react';
import { Box, Typography, Table, TableContainer, TableBody, TableCell, TableRow, TableHead, Paper } from '@mui/material';


import { FormattedMessage } from 'react-intl';

import StencilStyles from '../styles';


interface StyledTransferListProps {
  title: string;
  selectedTitle: string;
  searchTitle: string;
  selected: string[];
  headers: string[];

  rows: string[];
  filterRow: (id: string, search: string) => boolean;
  renderCells: (id: string) => (string | React.ReactElement)[];

  submit: {
    title: string;
    disabled: boolean;
    onClick: (selected: string[]) => void;
  };
}


const StyledTransferList: React.FC<StyledTransferListProps> = (props) => {
  const { title, headers, selected, searchTitle, selectedTitle, rows, renderCells, filterRow } = props;
  const [search, setSearch] = React.useState("");
  const [searchResult, setSearchResult] = React.useState(rows);

  React.useEffect(() => {
    if (!search) {
      return;
    }
    setSearchResult(rows.filter(row => filterRow(row, search.toLowerCase())));

  }, [search, rows, setSearch, setSearchResult]);

  return (
    <>
      <Box sx={{ paddingBottom: 1 }}>
        <Typography variant="h4"><FormattedMessage id={title} /></Typography>
      </Box>


      <Box component={Paper} sx={{ marginTop: 1, marginBottom: 1 }}>
        <TableContainer component={Paper}>
          <Table size="small">
            <TableHead sx={{ background: "grey"}}>
              <TableRow sx={{borderBottom: 0}}>
                <TableCell colSpan={headers.length} sx={{borderBottom: 0}}>
                  <Typography variant="h4" sx={{marginBottom: 1}}><FormattedMessage id={selectedTitle} /></Typography>
                </TableCell>
              </TableRow>
              <TableRow>
                {headers.map((header, index) => (<TableCell key={index} align="left" sx={{ fontWeight: "bold" }}><FormattedMessage id={header} /></TableCell>))}
              </TableRow>
            </TableHead>
            <TableBody>
              {selected.map((row, index) => (
                <TableRow hover key={index}>
                  {renderCells(row).map((cell, cellIndex) => (<TableCell align="left" key={cellIndex}>{cell}</TableCell>))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

      <Box component={Paper} sx={{ padding: 2, paddingBottom: 4 }}>
        <StencilStyles.SearchField label={searchTitle} value={search} onChange={setSearch} />
      </Box>

      <Box sx={{ marginTop: 1 }}>
        <TableContainer component={Paper}>
          <Table size="small">
            <TableHead sx={{ background: "grey" }}>
              <TableRow>
                {headers.map((header, index) => (<TableCell key={index} align="left" sx={{ fontWeight: "bold" }}><FormattedMessage id={header} /></TableCell>))}
              </TableRow>
            </TableHead>
            <TableBody>
              {searchResult.map((row, index) => (
                <TableRow hover key={index}>
                  {renderCells(row).map((cell, cellIndex) => (<TableCell align="left" key={cellIndex}>{cell}</TableCell>))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </>
  );
}

export type { StyledTransferListProps }
export { StyledTransferList }

