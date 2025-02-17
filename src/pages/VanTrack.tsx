import React, { useEffect, useState } from "react";
import { getVanProducts } from "../services/dailyInventory.services";
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Divider,
  Grid2,
  InputAdornment,
  Stack,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
  Paper
} from "@mui/material";
import { VanProduct } from "../types/Van";
import Iconify, { icons } from "../components/iconify";
import { TableBodyCell, TableHeadCell, TableHeadRow } from "../components";

// --------------------------------------
const VanTrack: React.FC = () => {
  const [vanData, setVanData] = useState<VanProduct[] | null>(null);
  const [filterdVanData, setFilterdVanData] = useState<VanProduct[] | null>(
    null
  );
  const [tableTheme, setTableTheme] = useState<boolean>(false);

  const filterProducts = (searchTerm: string) => {
    const filterdData: VanProduct[] | undefined = vanData?.filter(
      (item: VanProduct) =>
        item?.product_name?.toLowerCase()?.indexOf(searchTerm) !== -1
    );
    setFilterdVanData(filterdData || null);
  };

  useEffect(() => {
    // TODO: add id dynamically
    getVanProducts(6).then((res) => {
      if (res && res.length) {
        setVanData(res);
        setFilterdVanData(res);
      }
    });
  }, [setVanData]);

  return (
    <Container>
      <Box>
        <Typography variant="h4" component="h1" gutterBottom>
          تتبع محتويات الشاحنة
        </Typography>

        <Stack
          direction="row"
          spacing={2}
          alignItems="center"
          justifyContent="start"
        >
          <Typography gutterBottom>
            عدد النتجات : {filterdVanData?.length || 0}
          </Typography>
          <Button onClick={() => setTableTheme(!tableTheme)}>
            <Iconify icon={icons.table} width={24} />
          </Button>
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

        <Grid2 component="div" container spacing={3}>
          {!tableTheme ? (
            filterdVanData?.map((product) => (
              <Grid2 size={{ xs: 12, sm: 6, md: 4 }} key={product?.product_id}>
                <Card>
                  <CardContent>
                    <Typography variant="h6">
                      {product?.product_name}
                    </Typography>

                    <Typography
                      variant="h6"
                      color={product.total_quantity > 5 ? "info" : "error"}
                    >
                      <Iconify icon={icons.cart} /> {product?.total_quantity}
                    </Typography>

                    <Typography variant="h6" color="warning">
                      <Iconify icon={icons.price} /> {product?.price} ج
                    </Typography>
                  </CardContent>
                </Card>
              </Grid2>
            ))
          ) : (
            <TableContainer component={Paper}>
              <Table stickyHeader aria-label="sticky table">
                <TableHead>
                  <TableHeadRow>
                    <TableHeadCell>اسم المنتج </TableHeadCell>
                    <TableHeadCell>سعر الكرتونة</TableHeadCell>
                    <TableHeadCell>الكمية</TableHeadCell>
                  </TableHeadRow>
                </TableHead>
                <TableBody>
                  {filterdVanData?.map((product) => (
                    <TableRow
                    hover={true}
                      key={product.product_id}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableBodyCell >
                        {product.product_name}
                      </TableBodyCell>
                      <TableBodyCell>{product.price} ج </TableBodyCell>
                      <TableBodyCell>{product.total_quantity}</TableBodyCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </Grid2>
      </Box>
    </Container>
  );
};

export default VanTrack;
