import * as React from 'react';
import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';

//function for handling pagination buttons

function PaginationComponent(props) {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  //for handling pagination buttons

  const handleFirstPageButtonClick = (event) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  );
}

PaginationComponent.propTypes = {
  count: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};

// for creating data for rows
function createData(title, location, date) {
  return { title, location, date };
}

export default function MainComponent() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [data, setData] = React.useState([]);
  const [title, setTitle] = React.useState('');
  const [location, setLocation] = React.useState('');
  const [date, setDate] = React.useState('');
  const [jobs, setJobs] = React.useState([]);
  const [show, setShow] = React.useState('')
  let rows = [];

  React.useEffect(() => {
    fetch(`http://localhost:3003/data`, {  //api for fetching all the data from db
      "method": "GET",
      "headers": {
        "content-type": "application/json",
        "accept": "application/json"
      }
    })
    .then(response => response.json())
    .then(response => {
      console.log(response)
      console.log(response.message)
      setData(response.message);
    })
  }, [])

  if(data){
    for(let i=0; i<data.length; i++){
      const new1 = createData(data[i].title, data[i].location, new Date(data[i].date).toLocaleDateString(undefined, {timeZone: 'Asia/Kolkata'}));
      rows.push(new1)
    }
  }

  rows = rows.sort((a, b) => (a.title < b.title ? -1 : 1));

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleEnter = (event) => {
    handleFilter();
  }

  const handleFilter = (e) => {
    console.log('called filter')
    setShow('show');
    let title1 = title.toLowerCase();
    let location1 = location.toLowerCase();
    console.log(title1, location1, date);
    let uniqueArr = [];
    if(title1 != '' && location1 != '' && date != ''){
      let uniqueArr = [];
      data.forEach(i => {
        let checkTitle = i.title.toLowerCase()
        let checkLocation = i.location.toLowerCase()
        let curr_date = new Date(i.date).toLocaleDateString(undefined, {timeZone: 'Asia/Kolkata'});
        if(checkTitle.includes(title1) && checkLocation.includes(location1) && curr_date.includes(date)) { 
            uniqueArr.push(i) ;
        }
      })
    }
    else{
      if(title1 != '' && location1 != ''){
        data.forEach(i => {
            let checkTitle = i.title.toLowerCase()
            let checkLocation = i.location.toLowerCase()
            if(checkTitle.includes(title1) && checkLocation.includes(location1)) { 
                uniqueArr.push(i) ;
            }
        })
      }
      else if(location1 != '' && date != ''){
        data.forEach(i => {
            let checkLocation = i.location.toLowerCase()
            let curr_date = new Date(i.date).toLocaleDateString(undefined, {timeZone: 'Asia/Kolkata'});
            if(checkLocation.includes(location1) && curr_date.includes(date)) { 
                uniqueArr.push(i) ;
            }
        })
      }
      else if(title1 != '' && date != ''){
        data.forEach(i => {
            let checkTitle = i.title.toLowerCase()
            let curr_date = new Date(i.date).toLocaleDateString(undefined, {timeZone: 'Asia/Kolkata'});
            if(checkTitle.includes(title1) && curr_date.includes(date)) { 
                uniqueArr.push(i) ;
            }
        })
      }
      else{
        if(title1){
          data.forEach(i => {
              let check = i.title.toLowerCase()
              console.log(check, title1)
              if(check.includes(title1)) { 
                  uniqueArr.push(i) ;
              }
          })
        }
        else if(location1){
          data.forEach(i => {
              let check = i.location.toLowerCase()
              if(check.includes(location1)) { 
                  uniqueArr.push(i) ;
              }
          })
        }
        else if(date){
          data.forEach(i => {
              let curr_date = new Date(i.date).toLocaleDateString(undefined, {timeZone: 'Asia/Kolkata'});
              if(curr_date.includes(date)) { 
                  uniqueArr.push(i) ;
              }
          })
        }
        else{
          setShow('');
          alert('Please select atleast one field to filter')
        }
      }
    }
    console.log(uniqueArr)
    let dataJsx = <CardsDiv card={uniqueArr.map((item) => { return <Card item={item} /> }) } />;
    setJobs(dataJsx);
  }

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
        <TableHead>
          <TableRow>
            <TableCell sx={{width: '40%'}}>Title</TableCell>
            <TableCell align='center'>Location</TableCell>
            <TableCell align='center'>Date Posted</TableCell>
            <TableCell sx={{width: '5%'}}></TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <input className='input-field' type="text" placeholder='Title' value={title} onChange={(e) => setTitle(e.target.value)} //handleFilter(e)}
              onKeyPress={event => { if(event.key === 'Enter') handleEnter(event) }}></input>
            </TableCell>
            <TableCell>
              <input className='input-field' type="text" placeholder='Location' value={location} onChange={(e) => setLocation(e.target.value)}
              onKeyPress={event => { if(event.key === 'Enter') handleEnter(event) }}></input>
            </TableCell>
            <TableCell>
              <input className='input-field' type="text" placeholder='Date' value={date} onChange={(e) => setDate(e.target.value)}
              onKeyPress={event => { if(event.key === 'Enter') handleEnter(event) }}></input>
            </TableCell>
            <TableCell>
              <button className='filter-btn' type='click' onClick={handleFilter}>Filter</button>
              <br /><a href='/'>Reset</a>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
            {show == '' ? 
            <React.Fragment>
          {(rowsPerPage > 0
            ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            : rows
          ).map((row) => (
            <TableRow key={row.title}>
              <TableCell component="th" scope="row">
                {row.title}
              </TableCell>
              <TableCell style={{ width: 160 }} align='center'>
                {row.location}
              </TableCell>
              <TableCell style={{ width: 160 }} align='center'>
                {row.date}
              </TableCell>
            </TableRow>
          ))}
          {emptyRows > 0 && (
            <TableRow style={{ height: 53 * emptyRows }}>
              <TableCell colSpan={6} />
            </TableRow>
          )
        }</React.Fragment> : jobs
        }
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
              colSpan={3}
              count={rows.length}
              rowsPerPage={rowsPerPage}
              page={page}
              SelectProps={{
                inputProps: {
                  'aria-label': 'rows per page',
                },
                native: true,
              }}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              ActionsComponent={PaginationComponent}
            />
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  );
}

//Parent div Component for the filtered data
function CardsDiv({card}) { return card };

//Component for the displaying filtered data
function Card (props) {
  let item = props.item;
  console.log(item)
  let date = new Date(item.date).toLocaleDateString(undefined, {timeZone: 'Asia/Kolkata'});
  return (
    <React.Fragment>
      <TableRow>
        <TableCell component="th" scope="row">
          {item.title}
        </TableCell>
        <TableCell style={{ width: 160 }} align='center'>
          {item.location}
        </TableCell>
        <TableCell style={{ width: 160 }} align='center'>
          {date}
        </TableCell>
      </TableRow>
    </React.Fragment>
  )
} 