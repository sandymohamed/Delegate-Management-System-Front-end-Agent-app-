import React, { useEffect, useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Container,
  Paper,
  Stack,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { FormProvider, useForm } from "react-hook-form";
import { useParams, Link as RouterLink } from "react-router-dom";
import {
  FormDatePicker,
  FormTextField,
  TableBodyCell,
  TableHeadCell,
  TableHeadRow,
} from "../components";
import { useAuth } from "../context/AuthContext";
import {
  addPayment,
  getInvoiceById,
  getPaymentById,
} from "../services/invoices.services";
import { formatDate } from "../utils/dateFormatter";
import { TypeInvoiceDetails } from "../types/invoice";
import {
  AddPaymentFormData,
  TypePayment,
  TypePaymentSubmitData,
} from "../types/payment";
// -------------------------------------------------------
const AddPayment: React.FC = () => {
  const { user } = useAuth();

  const { invoice_id } = useParams();

  // FORM
  const AddPaymentSchema = Yup.object().shape({
    // invoice_id: Yup.string(),
    amount: Yup.string().required("يجب عليك ادخال المبلغ المدفوع"),
    date: Yup.string(),
  });
  const defaultValues: AddPaymentFormData = {
    // invoice_id: '',
    amount: "",
    date: "",
  };

  const methods = useForm<AddPaymentFormData>({
    resolver: yupResolver(AddPaymentSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    formState: { isLoading },
  } = methods;

  // Table:
  const [paymentHistory, setPaymentHistory] = useState<TypePayment[] | null>(
    null
  );
  const [invoice, setInvoice] = useState<TypeInvoiceDetails | null>(null);

  const handleReloadPage = () => {
    getInvoiceById(Number(invoice_id)).then((res) => {
      setInvoice(res);
    });

    getPaymentById(Number(invoice_id)).then((res) => {
      setPaymentHistory(res);
    });
  };

  useEffect(() => {
    console.log("user", user);
    handleReloadPage();
  }, []);

  const onSubmit = async (data: AddPaymentFormData) => {
    console.log("data", data);
    // data.user_id = user.id;
    // data.invoice_id = invoice_id;

    let formattedData: TypePaymentSubmitData;

    if (invoice_id && user) {
      formattedData = {
        ...data,
        invoice_id,
        user_id: user.id,
      };

      try {
        await addPayment(formattedData).then(async (res) => {
          // TODO handle after success
          if (res.success) {
            alert("تم التسديد بنجاح");
             handleReloadPage();
          } else {
            alert("error");
          }
        });
      } catch (err) {
        console.log(err);
        alert("error");
      }
    }
  };

  return (
    <Container>
      <Card>
        <CardHeader
          title={`تسديد مبلغ من  ${invoice?.customer_name}`}
          subheader={
            <Stack
              direction="row"
              spacing={2}
              alignItems="center"
              justifyContent="space-between"
            >
              <Box>
                <Typography>
                 
                  اجمالى فواتير العميل التى لم يتم سدادها: 
                  <Typography variant="h6" color="error" component={"span"}>
                    {invoice?.customer_total_unpaid_invoices}
                  </Typography>
                </Typography>

                <Typography>
                 
                  اجمالى ما لم يتم سداده من هذه الفاتورة
                  <Typography variant="h6" color="error" component={"span"}>
                   
                    {invoice?.total_unpaid}
                  </Typography>
                </Typography>
              </Box>
              <Box>
                <Button
                  variant="contained"
                  component={RouterLink}
                  to={`/invoice/${invoice_id}`}
                >
                 
                  تفاصيل الفاتورة
                </Button>
              </Box>
            </Stack>
          }
        />
        <CardContent>
          <Paper sx={{ p: 2 }}>
            <FormProvider {...methods}>
              <form onSubmit={handleSubmit(onSubmit)}>
                <Box
                  rowGap={3}
                  columnGap={2}
                  display="grid"
                  gridTemplateColumns={{
                    xs: "repeat(1, 1fr)",
                    sm: "repeat(2, 1fr)",
                  }}
                >
                  {/* <FormTextField
                                        name="invoice_id"
                                        control={methods.control}
                                        label="رقم الفاتورة"
                                    /> */}

                  <Stack
                    direction="column"
                    spacing={0}
                    alignItems="center"
                    justifyContent="start"
                  >
                    <FormDatePicker
                      name="date"
                      control={methods.control}
                      label="تاريخ السداد"
                    />
                    <Typography variant="caption">
                     
                      يمكنك تركه فارغا وسيكون بتاريخ اليوم
                    </Typography>
                  </Stack>
                  <FormTextField
                    name="amount"
                    control={methods.control}
                    label="المبلغ "
                  />
                </Box>

                <Box
                  display="flex"
                  justifyContent="flex-end"
                  alignItems="center"
                  columnGap={2}
                  mt={2}
                >
                  <Button
                    type="submit"
                    variant="contained"
                    color="secondary"
                    disabled={isLoading}
                  >
                    حفظ
                  </Button>
                </Box>
              </form>
            </FormProvider>
          </Paper>
        </CardContent>
      </Card>

      <Card>
        <TableContainer component={Paper}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableHeadRow>
                <TableHeadCell> رقم الفاتورة</TableHeadCell>
                <TableHeadCell> المندوب</TableHeadCell>
                <TableHeadCell>التاريخ </TableHeadCell>
                <TableHeadCell> مبلغ السداد</TableHeadCell>

                <TableHeadCell>المبلغ الكلي </TableHeadCell>
                <TableHeadCell>المتبقي </TableHeadCell>
                <TableHeadCell>ما تم سداده </TableHeadCell>
              </TableHeadRow>
            </TableHead>
            <TableBody>
              {paymentHistory && paymentHistory?.length
                ? paymentHistory?.map((row) => (
                    <TableRow
                      key={row.id}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableBodyCell>{row?.invoice_id}</TableBodyCell>
                      <TableBodyCell>{row?.user_name} </TableBodyCell>
                      <TableBodyCell>
                        {formatDate(row?.payment_date || "")}
                      </TableBodyCell>
                      <TableBodyCell>{row?.amount} </TableBodyCell>

                      <TableBodyCell>
                        {invoice?.total_after_discount}
                      </TableBodyCell>
                      <TableBodyCell>{invoice?.total_unpaid}</TableBodyCell>
                      <TableBodyCell>{invoice?.total_paid}</TableBodyCell>
                    </TableRow>
                  ))
                : null}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>
    </Container>
  );
};

export default AddPayment;
