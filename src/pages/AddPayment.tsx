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
  Divider,
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
  PaymentForm,
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

  // const onSubmit = async (data: AddPaymentFormData) => {
  //   console.log("data", data);
  //   // data.user_id = user.id;
  //   // data.invoice_id = invoice_id;

  //   let formattedData: TypePaymentSubmitData;

  //   if (invoice_id && user) {
  //     formattedData = {
  //       ...data,
  //       invoice_id,
  //       user_id: user.id,
  //     };

  //     try {
  //       await addPayment(formattedData).then(async (res) => {
  //         // TODO handle after success
  //         if (res.success) {
  //           alert("تم التسديد بنجاح");
  //           handleReloadPage();
  //         } else {
  //           alert("error");
  //         }
  //       });
  //     } catch (err) {
  //       console.log(err);
  //       alert("error");
  //     }
  //   }
  // };

  return (
    <Container>
      <PaymentForm
        invoice={invoice}
        invoice_id={invoice_id}
        doAfterSubmit={handleReloadPage}
      />

      <Divider sx={{ my: 3, border: "none" }} />
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
