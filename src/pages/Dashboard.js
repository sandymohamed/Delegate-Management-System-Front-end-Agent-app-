import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Container, Typography, Box, Card, CardContent, Grid2, Link } from '@mui/material';
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


        <Grid2 container spacing={2}>

          <Grid2 item size={{ xs: 12, sm: 6, md: 4 }} >
            <Card>
              <Link component={RouterLink} to="/van" underline="none" color='secondary' >
                <CardContent sx={{ display: 'flex', flexDirection: "column", alignItems: 'center', justifyContent: 'center' }}>
                  <Iconify icon={icons.van} width={60} height={60} />
                  <Typography variant="h6">تتبع محتويات الشاحنة</Typography>
                </CardContent>
              </Link>
            </Card>
          </Grid2>

          <Grid2 item size={{ xs: 12, sm: 6, md: 4 }} >
            <Card>
              <Link component={RouterLink} to="/invoice" underline="none" color='secondary' >
                <CardContent sx={{ display: 'flex', flexDirection: "column", alignItems: 'center', justifyContent: 'center' }}>
                  <Iconify icon={icons?.invoice} width={60} height={60} />
                  <Typography variant="h6">فاتورة جديدة</Typography>
                </CardContent>
              </Link>
            </Card>
          </Grid2>

          <Grid2 item size={{ xs: 12, sm: 6, md: 4 }} >
            <Card>
              <Link component={RouterLink} to="/van" underline="none" color='secondary' >
                <CardContent sx={{ display: 'flex', flexDirection: "column", alignItems: 'center', justifyContent: 'center' }}>
                  <Iconify icon={icons?.invoice} width={60} height={60} />
                  <Typography variant="h6">تسجيل مرتجع</Typography>
                </CardContent>
              </Link>
            </Card>
          </Grid2>

          <Grid2 item size={{ xs: 12, sm: 6, md: 4 }} >
            <Card>
              <Link component={RouterLink} to="/van" underline="none" color='secondary' >
                <CardContent sx={{ display: 'flex', flexDirection: "column", alignItems: 'center', justifyContent: 'center' }}>
                  <Iconify icon={icons?.invoice} width={60} height={60} />
                  <Typography variant="h6">العملاء</Typography>
                </CardContent>
              </Link>
            </Card>
          </Grid2>

          <Grid2 item size={{ xs: 12, sm: 6, md: 4 }}>
            <Card>
              <Link component={RouterLink} to="/van" underline="none" color='secondary' >
                <CardContent sx={{ display: 'flex', flexDirection: "column", alignItems: 'center', justifyContent: 'center' }}>
                  <Iconify icon={icons?.invoice} width={60} height={60} />
                  <Typography variant="h6">مصروفات</Typography>
                </CardContent>
              </Link>
            </Card>
          </Grid2>

        </Grid2>
      </Box>
    </Container>
  );
};

export default Dashboard;