import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Container, Typography, Box, Card, CardContent, Grid2, Link } from '@mui/material';
import Iconify from '../components/iconify/Iconify';


// ----------------------------------------------------------------------
const Dashboard = () => {
  return (
    <Container>
      <Box sx={{ mt: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Dashboard
        </Typography>


        <Grid2 container spacing={3}>

          <Grid2 item xs={12} sm={6} md={4}>
            <Card>
              <Link component={RouterLink} to="/van" underline="none" color='secondary' >
                <CardContent sx={{ display: 'flex', flexDirection: "column", alignItems: 'center', justifyContent: 'center' }}>
                  <Iconify icon="mdi:truck-check" width={60} height={60} />
                  <Typography variant="h6">تتبع محتويات الشاحنة</Typography>
                </CardContent>
              </Link>
            </Card>
          </Grid2>

          <Grid2 item xs={12} sm={6} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6">فاتورة جديدة</Typography>
              </CardContent>
            </Card>
          </Grid2>

          <Grid2 item xs={12} sm={6} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6">تسجيل مرتجع</Typography>
              </CardContent>
            </Card>
          </Grid2>

          <Grid2 item xs={12} sm={6} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6">العملاء</Typography>
              </CardContent>
            </Card>
          </Grid2>

          <Grid2 item xs={12} sm={6} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6">مصروفات</Typography>
              </CardContent>
            </Card>
          </Grid2>

        </Grid2>
      </Box>
    </Container>
  );
};

export default Dashboard;