import React, { useEffect, useState } from 'react'
import { getVanProducts } from '../services/dailyInventory.services';
import { Box, Button, Card, CardContent, Container, Grid2, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import Iconify from '../components/iconify/Iconify';
import { icons } from '../components/iconify/IconRegistry';

const VanTrack = () => {

  const [vanData, setVanData] = useState(null);
  const [tableTheme, setTableTheme] = useState(false);

  // TODO: add search for a product by name


  useEffect(() => {
    getVanProducts(6).then(res => {
      console.log(res);
      if (res && res.length) setVanData(res);
    })


  }, [setVanData])

  return (
    <Container>
      <Box>
        <Typography variant="h4" component="h1" gutterBottom>
          تتبع محتويات الشاحنة
        </Typography>
        <Stack direction="row" spacing={2} alignItems="center" justifyContent="start">
          <Typography gutterBottom>  عدد النتجات : {vanData?.length || 0} </Typography>
          <Button onClick={() => setTableTheme(!tableTheme)}>   <Iconify icon={icons.table} width={24} /> </Button>
        </Stack>
        <Grid2 container spacing={3} >
          {!tableTheme ? vanData?.map((product) => (
            <Grid2 item xs={12} sm={6} md={4} key={product?.product_id}>
              <Card>

                <CardContent>
                  <Typography variant="h6">
                    {product?.product_name}
                  </Typography>

                  <Typography variant="h6" color={product.total_quantity > 5 ? "secondary" : "error"}>
                    <Iconify icon={icons.cart} />   {product?.total_quantity} ج
                  </Typography>

                  <Typography variant="h6" color="success">
                    <Iconify icon={icons.price} />  {product?.price}
                  </Typography>
                </CardContent>


              </Card>

            </Grid2>
          )) : <TableContainer>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Product Name</TableCell>
                  <TableCell align="right">Price</TableCell>
                  <TableCell align="right">Quantity</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {vanData?.map((product) => (
                  <TableRow
                    key={product.product_id}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {product.product_name}
                    </TableCell>
                    <TableCell align="right">{product.price}</TableCell>
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