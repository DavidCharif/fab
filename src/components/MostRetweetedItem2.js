import React from 'react';
import { useGetData } from '../hooks/useGetData';
import 'bootstrap/dist/css/bootstrap.css';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { usePeriod } from '../hooks/usePeriod';

const api = 'https://fundacionandresbello.org/wp-json/fab/v1/most-retweeted';
let periodId = '4'; //default
let accountId = '14';

export const MostRetweetedItem2 = ({ MostRetweetedItem }) => {
  const response = useGetData(api);
  const items = response.data;
  const tweetNumber = items
    .filter(
      (item) =>
        item.official_account_id === accountId && item.period_id === periodId
    )
    .map((item) => parseInt(item.tweets_number));

  const totaltweets = tweetNumber.reduce(
    (totaltweetsNumber, item) => totaltweetsNumber + item,
    0
  );

  const accountInfo = [];
  const account = items
    .filter(
      (item) =>
        item.official_account_id === accountId && item.period_id === periodId
    )
    .find((item) => item.official_account_id === accountId);
  if (account) {
    accountInfo.push(account.official_account);
    accountInfo.push(account.period_id);
    accountInfo.push(account.official_account_name_spa);
    accountInfo.push(account.most_retweeted_category_desc_spa);
  }

  const data = items.filter(
    (item) =>
      item.official_account_id === accountId && item.period_id === periodId
  );

  console.log(data);

  function createData(
    userAccountDesc,
    userAccount,
    categoría,
    tweets_number,
    catDesc
  ) {
    return {
      userAccountDesc,
      userAccount,
      categoría,
      tweets_number,
      history: [
        {
          catDesc,
        },
      ],
    };
  }

  const rows = data.map((item) =>
    createData(
      item.most_retweeted_description_spa,
      item.user_account,
      item.most_retweeted_category_spa,
      parseInt(item.tweets_number),
      item.most_retweeted_category_desc_spa
    )
  );

  Row.propTypes = {
    row: PropTypes.shape({
      userAccountDesc: PropTypes.string.isRequired,
      userAccount: PropTypes.string.isRequired,
      categoría: PropTypes.string.isRequired,
      tweet_number: PropTypes.number.isRequired,
      history: PropTypes.arrayOf(
        PropTypes.shape({
          catDesc: PropTypes.string.isRequired,
        })
      ).isRequired,
    }).isRequired,
  };

  function Row(props) {
    const { row } = props;
    const [open, setOpen] = React.useState(false);

    return (
      <React.Fragment>
        <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
          <TableCell>
            <IconButton
              aria-label="expand row"
              size="small"
              onClick={() => setOpen(!open)}
            >
              {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          </TableCell>
          <TableCell component="th" scope="row">
            {row.userAccountDesc}
          </TableCell>
          <TableCell align="right">{row.userAccount}</TableCell>
          <TableCell align="right">{row.categoría}</TableCell>
          <TableCell align="right">{row.tweets_number}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <Box sx={{ margin: 1 }}>
                <Typography variant="h6" gutterBottom component="div">
                  Descripción de la Categoría
                </Typography>
                <Table size="small" aria-label="purchases">
                  {/* <TableHead>
                    <TableRow>
                      <TableCell>Descripción de la Categoría</TableCell>
                    </TableRow>
                  </TableHead> */}
                  <TableBody>
                    {row.history.map((historyRow) => (
                      <TableRow
                        key={`catDesc-${historyRow.official_account_id}`}
                      >
                        <TableCell component="th" scope="row">
                          {historyRow.catDesc}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Box>
            </Collapse>
          </TableCell>
        </TableRow>
      </React.Fragment>
    );
  }

  return (
    <div className="App">
      <div className="card">
        <h3> {accountInfo[2]} </h3>
        <h3> {accountInfo[0]} </h3>
        <h5>Periodo - {accountInfo[1]} </h5>
        <h5>Tweets totales periodo - {totaltweets} </h5>
        <TableContainer component={Paper}>
          <Table aria-label="collapsible table">
            <TableHead>
              <TableRow>
                <TableCell />
                <TableCell>Nombre de la cuenta</TableCell>
                <TableCell align="right">Cuenta</TableCell>
                <TableCell align="right">Categoría</TableCell>
                <TableCell align="right">Número de Tweets</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <Row key={row.users_most_retweeted_id} row={row} />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
};
