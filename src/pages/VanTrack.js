import React, { useEffect, useState } from 'react'
import { getVanProducts } from '../services/dailyInventory.services';
import { Box, Button, Card, CardContent, Container, Divider, Grid2, InputAdornment, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from '@mui/material';
import Iconify from '../components/iconify/Iconify';
import { icons } from '../components/iconify/IconRegistry';

const VanTrack = () => {

  const [vanData, setVanData] = useState(null);
  const [filterdVanData, setFilterdVanData] = useState(null);
  const [tableTheme, setTableTheme] = useState(false);

  const filterProducts = (searchTerm) => {
    const filterdData = vanData?.filter(item => item?.product_name?.toLowerCase()?.indexOf(searchTerm) !== -1);
    setFilterdVanData(filterdData);

  }

  useEffect(() => {
    getVanProducts(6).then(res => {
      if (res && res.length) {
        setVanData(res)
        setFilterdVanData(res);
      };
    })


  }, [setVanData])

  return (
    <Container>
      <Box>
        <Typography variant="h4" component="h1" gutterBottom>
          تتبع محتويات الشاحنة
        </Typography>

        <Stack direction="row" spacing={2} alignItems="center" justifyContent="start">
          <Typography gutterBottom>  عدد النتجات : {filterdVanData?.length || 0} </Typography>
          <Button onClick={() => setTableTheme(!tableTheme)}>   <Iconify icon={icons.table} width={24} /> </Button>
          <TextField
            id="input-with-icon-textfield"
            label="بحث"
            onChange={(e) => filterProducts(e.target.value)}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <Iconify icon={icons.search} width={24} />
                  </InputAdornment>
                ),
              },
            }}
            variant="standard"
          />

        </Stack>

        <Divider sx={{ my: 3 }} />

        <Grid2 container spacing={3} >
          {!tableTheme ? filterdVanData?.map((product) => (
            <Grid2 item size={{ xs: 12, sm: 6, md: 4 }} key={product?.product_id}>
              <Card>

                <CardContent>
                  <Typography variant="h6">
                    {product?.product_name}
                  </Typography>

                  <Typography variant="h6" color={product.total_quantity > 5 ? "info" : "error"}>
                    <Iconify icon={icons.cart} />   {product?.total_quantity}
                  </Typography>

                  <Typography variant="h6" color="warning">
                    <Iconify icon={icons.price} />  {product?.price} ج
                  </Typography>
                </CardContent>


              </Card>

            </Grid2>
          )) : <TableContainer>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow >
                  <TableCell align="right">اسم المنتج </TableCell>
                  <TableCell align="right">سعر الكرتونة</TableCell>
                  <TableCell align="right">الكمية</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filterdVanData?.map((product) => (
                  <TableRow
                    key={product.product_id}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >

                    <TableCell component="th" scope="row" align="right">
                      {product.product_name}
                    </TableCell>
                    <TableCell align="right">{product.price} ج </TableCell>
                    <TableCell align="right">{product.total_quantity}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

          </TableContainer>
          }
        </Grid2>
      </Box>
    </Container>
  )
}

export default VanTrack