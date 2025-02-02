import React, { useEffect, useState } from 'react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import { Box, Button,  Container, Divider, Grid2, IconButton, InputAdornment, Link, MenuItem, Paper, Select, Stack, Table, TableBody,  TableContainer, TableHead, TableRow, TextField, Typography } from '@mui/material';
import Iconify from '../components/iconify/Iconify';
import { icons } from '../components/iconify/IconRegistry';
import { getAllCustomers } from '../services/customers.services';
import { TableBodyCell, TableHeadCell, TableHeadRow } from '../components';

const CustomersList = () => {
  const [totalDataLength, setTotalDataLength] = useState(0);
  const [TableData, setTableData] = useState(null);
  const [searchTerm, setSearchTerm] = useState(null);


  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(100);

  useEffect(() => {
    getAllCustomers(searchTerm, rowsPerPage, page + 1).then(res => {
      console.log(res);

      setTableData(res?.data);
      setTotalDataLength(res?.total)
    })

  }, [searchTerm, rowsPerPage, page]);

  return (
    <Container>
      <Paper sx={{ p: 2 }}>
        <Typography variant="h4" component="h1" gutterBottom>العملاء</Typography>

        <Stack direction="row" spacing={2} alignItems="center" justifyContent="space-between">
          <Box>

            <Typography gutterBottom>  عدد العملاء : {TableData?.length || 0} </Typography>
            <Button variant='contained' component={RouterLink} to={`/create-customer`}> اضافة عميل جديد</Button>
          </Box>
          {/* TODO : add filter by:
          client name
          has not paid invoices
          has total unpaid amount like more than 10000 or less than 1000000
          client location

          */}
          <TextField
            id="input-with-icon-textfield"
            variant="outlined"
            label="بحث"
            onChange={(e) => setSearchTerm(e.target.value)}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <Iconify icon={icons.search} width={24} />
                  </InputAdornment>
                ),
              },
            }}
          />

        </Stack>

        <Divider sx={{ my: 3 }} />

        <Grid2 container spacing={3} >
          <TableContainer component={Paper}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableHeadRow  >
                  <TableHeadCell > اسم العميل</TableHeadCell>
                  <TableHeadCell >اسم المحل</TableHeadCell>
                  <TableHeadCell >الرصيد الحالى </TableHeadCell>
                  <TableHeadCell >رقم الهاتف</TableHeadCell>
                  <TableHeadCell >العنوان </TableHeadCell>
                  <TableHeadCell >التفاصيل </TableHeadCell>
                  <TableHeadCell >الفواتير السابقة </TableHeadCell>
                  <TableHeadCell >انشاء فاتورة لهذا العميل  </TableHeadCell>
                </TableHeadRow>
              </TableHead>
              <TableBody>
                {(TableData && TableData?.length) ? TableData?.map((row) => (
                  <TableRow
                    key={row.id}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableBodyCell >{row?.name}</TableBodyCell>
                    <TableBodyCell >{row?.customer_store_name} </TableBodyCell>
                    <TableBodyCell >{row?.total_unpaid_invoices} </TableBodyCell>
                    <TableBodyCell >{row?.phone}</TableBodyCell>
                    <TableBodyCell >{row?.location}</TableBodyCell>
                    <TableBodyCell >{row?.info}</TableBodyCell>

                    <TableBodyCell >
                      <Link component={RouterLink} to={`/customer-invoices/${row?.id}`}> تفاصيل </Link>
                    </TableBodyCell>

                    <TableBodyCell >
                      <Link component={RouterLink} to={`/create-invoice/${row?.id}`}> انشاء فاتورة </Link>
                    </TableBodyCell>
                  </TableRow>
                )) : null}
              </TableBody>
            </Table>

          </TableContainer>
          <Divider sx={{ my: 3 }} />
          <Stack direction="row" spacing={2} alignItems="center" justifyContent="space-between">
            <Stack direction="row" spacing={2} alignItems="center" justifyContent="space-between">
              {/* dropdown for page size */}
              <Typography gutterBottom>  عدد الفواتير فى الصفحة : {rowsPerPage || 0} </Typography>
              <Select value={rowsPerPage} onChange={(e) => setRowsPerPage(e.target.value)}>
                <MenuItem value={2}>2</MenuItem>
                <MenuItem value={100}>100</MenuItem>
                <MenuItem value={500}>500</MenuItem>
                <MenuItem value={1000}>1000</MenuItem>
              </Select>
            </Stack>

            <Stack direction="row" spacing={2} alignItems="center" justifyContent="center">

              <IconButton color='secondary' aria-label="back" size="small" onClick={() => setPage(page - 1)} disabled={page === 0} >
                <Iconify icon={icons.next} width={24} height={24} />
              </IconButton>

              <Typography gutterBottom>  الصفحة : {page + 1} </Typography>

              <IconButton color='secondary' aria-label="next" size="small" onClick={() => setPage(page + 1)} disabled={totalDataLength <= (page + 1) * rowsPerPage} >
                <Iconify icon={icons.back} width={24} height={24} />
              </IconButton>
            </Stack>

          </Stack>
        </Grid2>
      </Paper>
    </Container>
  )
}

export default CustomersList