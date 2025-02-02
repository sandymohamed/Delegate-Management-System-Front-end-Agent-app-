import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Container, Typography, Box, Card, CardContent, Grid2, Link, Paper } from '@mui/material';
import Iconify from '../components/iconify/Iconify';
import { icons } from '../components/iconify/IconRegistry';


// ----------------------------------------------------------------------
const Dashboard = () => {
  return (
    <Container>
      <Box sx={{ mt: 4 }}>
        {/* <Typography variant="h4" component="h1" gutterBottom>
          Dashboard
          </Typography> */}


        <Paper sx={{ p: 2 }}>
          <Grid2 container spacing={2}>

            <Grid2 item size={{ xs: 12, sm: 6, md: 4 }} >
              <Card>
                <Link component={RouterLink} to="/van" underline="none" color='secondary' >
                  <CardContent sx={{ display: 'flex', flexDirection: "column", alignItems: 'center', justifyContent: 'center' }}>
                    <Iconify icon={icons.van} width={60} height={60} />
                    <Typography variant="h6" color='text.secondary'>تتبع محتويات الشاحنة</Typography>
                  </CardContent>
                </Link>
              </Card>
            </Grid2>

            <Grid2 item size={{ xs: 12, sm: 6, md: 4 }} >
              <Card>
                <Link component={RouterLink} to="/create-invoice" underline="none" color='secondary' >
                  <CardContent sx={{ display: 'flex', flexDirection: "column", alignItems: 'center', justifyContent: 'center' }}>
                    <Iconify icon={icons?.invoice} width={60} height={60} />
                    <Typography variant="h6" color='text.secondary'>فاتورة جديدة</Typography>
                  </CardContent>
                </Link>
              </Card>
            </Grid2>

            <Grid2 item size={{ xs: 12, sm: 6, md: 4 }} >
              <Card>
                <Link component={RouterLink} to="/invoices" underline="none" color='secondary' >
                  <CardContent sx={{ display: 'flex', flexDirection: "column", alignItems: 'center', justifyContent: 'center' }}>
                    <Iconify icon={icons?.invoice} width={60} height={60} />
                    <Typography variant="h6" color='text.secondary'>فواتيري  </Typography>
                  </CardContent>
                </Link>
              </Card>
            </Grid2>

            <Grid2 item size={{ xs: 12, sm: 6, md: 4 }} >
              <Card>
                <Link component={RouterLink} to="/invoices" underline="none" color='secondary' >
                  <CardContent sx={{ display: 'flex', flexDirection: "column", alignItems: 'center', justifyContent: 'center' }}>
                    <Iconify icon={icons?.invoice} width={60} height={60} />
                    <Typography variant="h6" color='text.secondary'>تسديد فاتورة</Typography>
                  </CardContent>
                </Link>
              </Card>
            </Grid2>

            <Grid2 item size={{ xs: 12, sm: 6, md: 4 }} >
              <Card>
                <Link component={RouterLink} to="/van" underline="none" color='secondary' >
                  <CardContent sx={{ display: 'flex', flexDirection: "column", alignItems: 'center', justifyContent: 'center' }}>
                    <Iconify icon={icons?.invoice} width={60} height={60} />
                    <Typography variant="h6" color='text.secondary'>تسجيل مرتجع</Typography>
                  </CardContent>
                </Link>
              </Card>
            </Grid2>

            <Grid2 item size={{ xs: 12, sm: 6, md: 4 }} >
              <Card>
                <Link component={RouterLink} to="/customers" underline="none" color='secondary' >
                  <CardContent sx={{ display: 'flex', flexDirection: "column", alignItems: 'center', justifyContent: 'center' }}>
                    <Iconify icon={icons?.invoice} width={60} height={60} />
                    <Typography variant="h6" color='text.secondary'>العملاء</Typography>
                  </CardContent>
                </Link>
              </Card>
            </Grid2>

            <Grid2 item size={{ xs: 12, sm: 6, md: 4 }} >
              <Card>
                <Link component={RouterLink} to="/products" underline="none" color='secondary' >
                  <CardContent sx={{ display: 'flex', flexDirection: "column", alignItems: 'center', justifyContent: 'center' }}>
                    <Iconify icon={icons?.invoice} width={60} height={60} />
                    <Typography variant="h6" color='text.secondary'>المنتجات</Typography>
                  </CardContent>
                </Link>
              </Card>
            </Grid2>

            <Grid2 item size={{ xs: 12, sm: 6, md: 4 }}>
              <Card>
                <Link component={RouterLink} to="/van" underline="none" color='secondary' >
                  <CardContent sx={{ display: 'flex', flexDirection: "column", alignItems: 'center', justifyContent: 'center' }}>
                    <Iconify icon={icons?.invoice} width={60} height={60} />
                    <Typography variant="h6" color='text.secondary'>مصروفات</Typography>
                  </CardContent>
                </Link>
              </Card>
            </Grid2>

          </Grid2>
        </Paper>
      </Box>
    </Container>
  );
};

export default Dashboard;