import React, { useEffect, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Chip, Container, Divider, Grid2, IconButton, InputAdornment, Link, MenuItem, Paper, Select,
  Stack, Table, TableBody, TableContainer, TableHead, TableRow, TextField, Typography
} from '@mui/material';
import Iconify from '../components/iconify/Iconify';
import { icons } from '../components/iconify/IconRegistry';
import { getAllInvoices } from '../services/invoices.services';
import { useAuth } from '../context/AuthContext';
import { formatDate } from '../utils/dateFormatter';
import { TableBodyCell, TableHeadCell, TableHeadRow } from '../components';

// ----------------------------------------------------------------------
const AgentInvoices = () => {

  const [totalDataLength, setTotalDataLength] = useState(0);
  const [TableData, setTableData] = useState(null);
  const [searchTerm, setSearchTerm] = useState(null);

  const { user } = useAuth();

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(100);

  useEffect(() => {
    getAllInvoices(user.id, searchTerm, rowsPerPage, page + 1).then(res => {
      setTableData(res?.data);
      setTotalDataLength(res?.total)
    })

  }, [searchTerm, rowsPerPage, page])

  return (
    <Container>
      <Paper sx={{ p: 2 }}>
        <Typography variant="h4" component="h1" gutterBottom>الفواتير</Typography>

        <Stack direction="row" spacing={2} alignItems="center" justifyContent="space-between">
          <Typography gutterBottom>  عدد الفواتير : {totalDataLength} </Typography>
          {/* TODO : add filter by:
          date
          is paid
          is not paid
          client name
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
          <Paper sx={{ width: '100%', overflow: 'hidden' }}>
            <TableContainer component={Paper}>
              <Table stickyHeader aria-label="sticky table">
                <TableHead>
                  <TableHeadRow>
                    <TableHeadCell >رقم الفاتورة</TableHeadCell>
                    <TableHeadCell >العميل</TableHeadCell>
                    <TableHeadCell >تاريخ انشاء الفاتورة </TableHeadCell>
                    <TableHeadCell >تاريخ الاستحقاق</TableHeadCell>

                    <TableHeadCell >السعر الكلى قبل التخفيض</TableHeadCell>
                    <TableHeadCell >التخفيض</TableHeadCell>

                    <TableHeadCell >السعر بعد التخفيض</TableHeadCell>
                    {/* TODO: add it to label with some styles or icon */}
                    <TableHeadCell >تم الدفع بالكامل؟</TableHeadCell>
                    <TableHeadCell >اجمالى ما تم دفعه</TableHeadCell>
                    <TableHeadCell >اجمالى ما لم يتم دفعه</TableHeadCell>
                    <TableHeadCell >   التفاصيل </TableHeadCell>
                  </TableHeadRow>
                </TableHead>
                <TableBody>
                  {(TableData && TableData.length) && TableData?.map((row) => (
                    <TableRow
                      key={row.id}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableBodyCell >{row.invoice_number}</TableBodyCell>
                      <TableBodyCell >{row.customer_id} </TableBodyCell>
                      <TableBodyCell >{formatDate(row.invoice_date)} </TableBodyCell>
                      <TableBodyCell >{formatDate(row.due_date)}</TableBodyCell>

                      <TableBodyCell >{row.total_price} ج </TableBodyCell>
                      <TableBodyCell >{row.discount}</TableBodyCell>

                      <TableBodyCell >{row.total_after_discount} ج </TableBodyCell>

                      <TableBodyCell >{row.is_paid ? <Chip label="نعم" color="primary" /> : <Chip label="لا" color="error" />}</TableBodyCell>
                      <TableBodyCell >{row.total_paid}</TableBodyCell>
                      <TableBodyCell >{row.total_unpaid}</TableBodyCell>
                      {/* TODO : enhance products show */}


                      <TableBodyCell >
                        <Link component={RouterLink} to={`/invoice/${row.id}`}> تفاصيل </Link>
                      </TableBodyCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>

            </TableContainer>
            <Divider sx={{ my: 3 }} />
            <Stack direction="row" spacing={2} alignItems="center" justifyContent="space-between">
              <Stack direction="row" spacing={2} alignItems="center" justifyContent="space-between">
                {/* dropdown for page size */}
                <Typography gutterBottom>  عدد الفواتير فى الصفحة : {rowsPerPage || 0} </Typography>
                <Select value={rowsPerPage} onChange={(e) => setRowsPerPage(e.target.value)}>
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
          </Paper>
        </Grid2>
      </Paper>
    </Container>
  )
}

export default AgentInvoices