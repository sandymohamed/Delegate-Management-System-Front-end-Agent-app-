import React, { useEffect, useRef, useState } from "react";
import { Link as RouterLink, useParams } from "react-router-dom";
import {
  Box,
  Button,
  Card,
  Container,
  Divider,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import Iconify from "../components/iconify/Iconify";
import { getInvoiceById } from "../services/invoices.services";
import { formatDate } from "../utils/dateFormatter";
import {
  SimpleDialog,
  TableBodyCell,
  TableHeadCell,
  TableHeadRow,
} from "../components";
import {
  TypeInvoiceDetails,
  TypeInvoiceProductsDetails,
} from "../types/invoice";
import AddReturnForm from "../components/AddReturnForm";

// ----------------------------------------------------------------------

const CURRENCY = "ج";

const InvoiceDetails: React.FC = () => {
  const [invoiceDetails, setInvoiceDetails] =
    useState<TypeInvoiceDetails | null>(null);
  const [invoiceProductsDetails, setInvoiceProductsDetails] = useState<
    TypeInvoiceProductsDetails[] | null
  >(null);
  const { id } = useParams();
  const printRef = useRef<HTMLDivElement>(null);

  const [open, setOpen] = useState(false);
  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleReloadPage = () => {
    getInvoiceById(Number(id)).then((res) => {
      setInvoiceDetails(res);
      setInvoiceProductsDetails(res?.products);
    });
  };

  const handlePrint = () => {
    window.print();
  };

  useEffect(() => {
    handleReloadPage();
  }, [id]);

  const finalTotal =
    invoiceDetails?.returned_amount != null &&
    Number(invoiceDetails.returned_amount) > 0
      ? Number(invoiceDetails?.total_after_discount) -
        Number(invoiceDetails?.returned_amount)
      : Number(invoiceDetails?.total_after_discount);

  return (
    <Container maxWidth="lg" sx={{ py: 3 }}>
      {/* Action bar - hidden when printing */}
      <Stack
        direction="row"
        spacing={2}
        sx={{ mb: 3 }}
        className="no-print"
        flexWrap="wrap"
      >
        <Button
          variant="contained"
          startIcon={<Iconify icon="mdi:printer" />}
          onClick={handlePrint}
          sx={{ boxShadow: 1 }}
        >
          طباعة الفاتورة
        </Button>
        <Button
          component={RouterLink}
          to={`/create-payment/${id}`}
          variant="outlined"
          color="success"
          startIcon={<Iconify icon="tdesign:money" />}
        >
          تسديد مبلغ
        </Button>
        <Button
          onClick={handleClickOpen}
          variant="outlined"
          color="secondary"
          startIcon={<Iconify icon="mdi:cart-arrow-up" />}
        >
          تسجيل مرتجع
        </Button>
      </Stack>

      {/* Printable invoice document */}
      <Paper
        ref={printRef}
        elevation={0}
        className="invoice-print-area"
        sx={{
          border: "1px solid",
          borderColor: "divider",
          borderRadius: 2,
          overflow: "hidden",
          bgcolor: "background.paper",
        }}
      >
        {/* Invoice header */}
        <Box
          sx={{
            bgcolor: "primary.main",
            color: "primary.contrastText",
            px: 3,
            py: 2.5,
          }}
        >
          <Typography variant="h4" fontWeight={700} component="h1">
            فاتورة
          </Typography>
          <Stack direction="row" spacing={3} sx={{ mt: 1 }} flexWrap="wrap">
            <Typography variant="body1">
              رقم الفاتورة: <strong>{invoiceDetails?.invoice_number}</strong>
            </Typography>
            <Typography variant="body1">
              التاريخ: {formatDate(invoiceDetails?.invoice_date || "")}
            </Typography>
            <Typography variant="body1">
              الاستحقاق: {formatDate(invoiceDetails?.due_date || "")}
            </Typography>
          </Stack>
        </Box>

        <Box sx={{ px: 3, py: 2.5 }}>
          {/* Customer block */}
          <Card
            variant="outlined"
            sx={{
              p: 2,
              mb: 3,
              bgcolor: "grey.50",
              borderColor: "divider",
            }}
          >
            <Typography
              variant="overline"
              color="text.secondary"
              sx={{ letterSpacing: 1 }}
            >
              بيانات العميل
            </Typography>
            <Stack spacing={0.75} sx={{ mt: 1 }}>
              <Typography variant="body1">
                <strong>الاسم:</strong> {invoiceDetails?.customer_name}
              </Typography>
              <Typography variant="body1">
                <strong>العنوان:</strong> {invoiceDetails?.customer_location}
              </Typography>
              {invoiceDetails?.customer_phone && (
                <Typography variant="body1">
                  <strong>الهاتف:</strong> {invoiceDetails.customer_phone}
                </Typography>
              )}
            </Stack>
          </Card>

          <Divider sx={{ my: 2 }} />

          {/* Products table */}
          <Typography
            variant="overline"
            color="text.secondary"
            sx={{ letterSpacing: 1, display: "block", mb: 1 }}
          >
            تفاصيل المنتجات
          </Typography>
          <TableContainer>
            <Table size="medium" aria-label="تفاصيل الفاتورة">
              <TableHead>
                <TableHeadRow>
                  <TableHeadCell>#</TableHeadCell>
                  <TableHeadCell>اسم المنتج</TableHeadCell>
                  <TableHeadCell >الكمية</TableHeadCell>
                  <TableHeadCell >السعر ({CURRENCY})</TableHeadCell>
                  <TableHeadCell >الإجمالي ({CURRENCY})</TableHeadCell>
                </TableHeadRow>
              </TableHead>
              <TableBody>
                {invoiceProductsDetails?.map(
                  (product: TypeInvoiceProductsDetails, index: number) => (
                    <TableRow key={product.product_id} hover>
                      <TableCell sx={{ color: "text.secondary" }}>
                        {index + 1}
                      </TableCell>
                      <TableBodyCell>{product.product_name}</TableBodyCell>
                      <TableCell align="center">{product.quantity}</TableCell>
                      <TableCell align="right">{product.price}</TableCell>
                      <TableCell align="right">
                        {product.product_total_price}
                      </TableCell>
                    </TableRow>
                  )
                )}
              </TableBody>
            </Table>
          </TableContainer>

          {/* Totals */}
          <Box
            sx={{
              mt: 3,
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            <Stack
              spacing={1}
              sx={{
                minWidth: 280,
                border: "1px solid",
                borderColor: "divider",
                borderRadius: 1,
                p: 2,
                bgcolor: "grey.50",
              }}
            >
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
              >
                <Typography variant="body2" color="text.secondary">
                  السعر الكلي قبل التخفيض
                </Typography>
                <Typography variant="body2">
                  {invoiceDetails?.total_price} {CURRENCY}
                </Typography>
              </Stack>
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
              >
                <Typography variant="body2" color="text.secondary">
                  التخفيض
                </Typography>
                <Typography variant="body2">
                  {invoiceDetails?.discount} {CURRENCY}
                </Typography>
              </Stack>
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
              >
                <Typography variant="body2" color="text.secondary">
                  الإجمالي بعد التخفيض
                </Typography>
                <Typography variant="body2" fontWeight={600}>
                  {invoiceDetails?.total_after_discount} {CURRENCY}
                </Typography>
              </Stack>
              {invoiceDetails?.returns &&
                invoiceDetails.returns.length > 0 &&
                invoiceDetails?.returned_amount != null && (
                  <>
                    <Divider />
                    <Stack
                      direction="row"
                      justifyContent="space-between"
                      alignItems="center"
                    >
                      <Typography variant="body2" color="text.secondary">
                        قيمة المرتجع
                      </Typography>
                      <Typography variant="body2" color="error.main">
                        - {invoiceDetails.returned_amount} {CURRENCY}
                      </Typography>
                    </Stack>
                    <Stack
                      direction="row"
                      justifyContent="space-between"
                      alignItems="center"
                    >
                      <Typography variant="body2" color="text.secondary">
                        الإجمالي بعد خصم المرتجع
                      </Typography>
                      <Typography variant="body2" fontWeight={600}>
                        {finalTotal} {CURRENCY}
                      </Typography>
                    </Stack>
                  </>
                )}
              <Divider />
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
              >
                <Typography variant="body2" color="text.secondary">
                  المدفوع
                </Typography>
                <Typography variant="body2" color="success.main">
                  {invoiceDetails?.total_paid} {CURRENCY}
                </Typography>
              </Stack>
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
              >
                <Typography variant="subtitle2" fontWeight={700}>
                  الباقي
                </Typography>
                <Typography variant="subtitle2" fontWeight={700}>
                  {invoiceDetails?.total_unpaid} {CURRENCY}
                </Typography>
              </Stack>
            </Stack>
          </Box>

          {/* Footer note when printed */}
          <Typography
            variant="caption"
            display="block"
            textAlign="center"
            color="text.secondary"
            sx={{ mt: 4, pt: 2, borderTop: 1, borderColor: "divider" }}
          >
            شكراً لتعاملكم معنا
          </Typography>
        </Box>
      </Paper>

      <SimpleDialog open={open} onClose={handleClose}>
        <AddReturnForm
          invoice={invoiceDetails}
          invoice_id={invoiceDetails?.invoice_id || 0}
          doAfterSubmit={handleReloadPage}
        />
      </SimpleDialog>
    </Container>
  );
};

export default InvoiceDetails;
