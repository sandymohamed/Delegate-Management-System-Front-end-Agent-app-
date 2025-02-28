import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Link as RouterLink } from "react-router-dom";
import * as Yup from "yup";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import {
  AddPaymentFormData,
  TypePaymentFOrCustomerSubmitData,
  TypePaymentSubmitData,
} from "../types/payment";
import { TypeInvoiceDetails } from "../types/invoice";
import FormTextField from "./FormTextField";
import FormDatePicker from "./FormDatePicker";
import {
  addPayment,
  addPaymentForCustomer,
} from "../services/invoices.services";
import { useAuth } from "../context/AuthContext";

interface PaymentFormProps {
  invoice?: TypeInvoiceDetails | null;
  invoice_id?: string | undefined | null;
  customer_id?: number | undefined | null;
  doAfterSubmit?: () => void;
}
// --------------------------------------------------------------------------------------------------
const PaymentForm: React.FC<PaymentFormProps> = ({
  invoice = null,
  invoice_id = null,
  customer_id = null,
  doAfterSubmit = () => {},
}) => {
  const { user } = useAuth();

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

  const onSubmit = async (data: AddPaymentFormData) => {
    console.log("data", data);

    let formattedData: TypePaymentSubmitData | TypePaymentFOrCustomerSubmitData;

    try {
      if (invoice_id && user) {
        formattedData = {
          ...data,
          invoice_id,
          user_id: user.id,
        };

        await addPayment(formattedData).then(async (res) => {
          // TODO handle after success
          if (res.success) {
            alert("تم التسديد بنجاح");
            // Add afterSubmitfunction in props
            //  handleReloadPage();
          } else {
            alert("error");
          }
        });
      } else if (customer_id && user) {
        formattedData = {
          ...data,
          customer_id,
          user_id: user.id,
        };

        await addPaymentForCustomer(formattedData).then(async (res) => {
          // TODO handle after success
          if (res.success) {
            alert("تم التسديد بنجاح");
            // Add afterSubmitfunction in props
             doAfterSubmit();
          } else {
            alert("error");
          }
        });
      }
    } catch (err) {
      console.log(err);
      alert("error");
    }
  };

  return (
    <Card>
      <CardHeader
        title={
          invoice
            ? `تسديد مبلغ من  ${invoice?.customer_name}`
            : "إضافة مبلغ جديد"
        }
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
              {invoice_id ? (
                <Button
                  variant="contained"
                  component={RouterLink}
                  to={`/invoice/${invoice_id}`}
                >
                  تفاصيل الفاتورة
                </Button>
              ) : (
                <Button
                  variant="contained"
                  component={RouterLink}
                  to={`/customer-invoices/${customer_id}`}
                >
                  تفاصيل العميل
                </Button>
              )}
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
  );
};

export default PaymentForm;
