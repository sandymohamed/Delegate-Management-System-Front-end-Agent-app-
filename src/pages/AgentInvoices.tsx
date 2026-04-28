import React, { useEffect, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import {
  Button,
  Chip,
  Collapse,
  Container,
  Divider,
  Grid2,
  IconButton,
  InputAdornment,
  Link,
  MenuItem,
  Paper,
  Select,
  Stack,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import Iconify from "../components/iconify/Iconify";
import { icons } from "../components/iconify/IconRegistry";
import {
  AgentInvoicesFilters,
  getAllInvoices,
} from "../services/invoices.services";
import { useAuth } from "../context/AuthContext";
import { formatDate } from "../utils/dateFormatter";
import {
  SimpleDialog,
  TableBodyCell,
  TableHeadCell,
  TableHeadRow,
} from "../components";
import { TypeInvoicesDetails } from "../types/invoice";
import AddReturnForm from "../components/AddReturnForm";

// ----------------------------------------------------------------------
const initialFilters: AgentInvoicesFilters = {
  lateStatus: "",
  isPaid: "",
  dueDateFrom: "",
  dueDateTo: "",
  invoiceDateFrom: "",
  invoiceDateTo: "",
  totalPriceMin: "",
  totalPriceMax: "",
  totalPaidMin: "",
  totalPaidMax: "",
  totalUnpaidMin: "",
  totalUnpaidMax: "",
  customerName: "",
  customerLocation: "",
};

const AgentInvoices: React.FC = () => {
  const [totalDataLength, setTotalDataLength] = useState<number>(0);
  const [TableData, setTableData] = useState<TypeInvoicesDetails[] | null>(
    null
  );
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filters, setFilters] = useState<AgentInvoicesFilters>(initialFilters);
  const [showFilters, setShowFilters] = useState(false);

  const { user } = useAuth();

  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(100);

  // Dialog
  const [open, setOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState<TypeInvoicesDetails | null>(
    null
  );
  const handleClickOpen = (row: TypeInvoicesDetails) => {
    setOpen(true);
    setSelectedRow(row);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleReloadPage = () => {
    getAllInvoices(user?.id || 0, searchTerm, rowsPerPage, page + 1, filters).then(
      (res) => {
        setTableData(res?.data);
        setTotalDataLength(res?.total);
      }
    );
  };

  useEffect(() => {
    if (!user?.id) return;
    getAllInvoices(user.id, searchTerm, rowsPerPage, page + 1, filters).then(
      (res) => {
        setTableData(res?.data);
        setTotalDataLength(res?.total);
      }
    );
  }, [user?.id, searchTerm, rowsPerPage, page, filters]);

  const handleFilterChange = (key: keyof AgentInvoicesFilters, value: string) => {
    setPage(0);
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const handleResetFilters = () => {
    setSearchTerm("");
    setPage(0);
    setFilters(initialFilters);
  };

  return (
    <Container>
      <Paper sx={{ p: 2 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          الفواتير
        </Typography>

        <Stack
          direction="row"
          spacing={2}
          alignItems="center"
          justifyContent="space-between"
          flexWrap="wrap"
        >
          <Typography gutterBottom>عدد الفواتير : {totalDataLength}</Typography>
          <Stack direction="row" spacing={1.5} alignItems="center" flexWrap="wrap">
            <TextField
              id="input-with-icon-textfield"
              variant="outlined"
              label="بحث"
              value={searchTerm}
              onChange={(e) => {
                setPage(0);
                setSearchTerm(e.target.value);
              }}
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <Iconify icon={icons.search} width={24} />
                    </InputAdornment>
                  ),
                },
              }}
            />
            <Button
              variant={showFilters ? "contained" : "outlined"}
              onClick={() => setShowFilters((prev) => !prev)}
              startIcon={
                <Iconify icon={showFilters ? "eva:eye-off-fill" : "eva:funnel-fill"} />
              }
            >
              {showFilters ? "إخفاء الفلاتر" : "إظهار الفلاتر"}
            </Button>
          </Stack>
        </Stack>

        <Collapse in={showFilters}>
          <Paper variant="outlined" sx={{ mt: 2, p: 2, borderRadius: 2 }}>
            <Stack spacing={2}>
              <Typography variant="h6">الفلاتر المتقدمة</Typography>

              <Grid2 container spacing={2}>
                <Grid2 size={{ xs: 12, md: 6 }}>
                  <Select
                    fullWidth
                    displayEmpty
                    value={filters.lateStatus ?? ""}
                    onChange={(e) =>
                      handleFilterChange("lateStatus", String(e.target.value))
                    }
                  >
                    <MenuItem value="">حالة التأخير (الكل)</MenuItem>
                    <MenuItem value="late">متأخر</MenuItem>
                    <MenuItem value="not_late">غير متأخر</MenuItem>
                  </Select>
                </Grid2>
                <Grid2 size={{ xs: 12, md: 6 }}>
                  <Select
                    fullWidth
                    displayEmpty
                    value={filters.isPaid ?? ""}
                    onChange={(e) =>
                      handleFilterChange("isPaid", String(e.target.value))
                    }
                  >
                    <MenuItem value="">حالة الدفع (الكل)</MenuItem>
                    <MenuItem value="true">مدفوع</MenuItem>
                    <MenuItem value="false">غير مدفوع</MenuItem>
                  </Select>
                </Grid2>
              </Grid2>

              <Grid2 container spacing={2}>
                <Grid2 size={{ xs: 12, md: 6 }}>
                  <TextField
                    fullWidth
                    label="اسم العميل"
                    value={filters.customerName ?? ""}
                    onChange={(e) =>
                      handleFilterChange("customerName", e.target.value)
                    }
                  />
                </Grid2>
                <Grid2 size={{ xs: 12, md: 6 }}>
                  <TextField
                    fullWidth
                    label="منطقة العميل"
                    value={filters.customerLocation ?? ""}
                    onChange={(e) =>
                      handleFilterChange("customerLocation", e.target.value)
                    }
                  />
                </Grid2>
              </Grid2>

              <Grid2 container spacing={2}>
                <Grid2 size={{ xs: 12, md: 6 }}>
                  <TextField
                    fullWidth
                    label="تاريخ الاستحقاق من"
                    type="date"
                    value={filters.dueDateFrom ?? ""}
                    onChange={(e) =>
                      handleFilterChange("dueDateFrom", e.target.value)
                    }
                    slotProps={{ inputLabel: { shrink: true } }}
                  />
                </Grid2>
                <Grid2 size={{ xs: 12, md: 6 }}>
                  <TextField
                    fullWidth
                    label="تاريخ الاستحقاق إلى"
                    type="date"
                    value={filters.dueDateTo ?? ""}
                    onChange={(e) =>
                      handleFilterChange("dueDateTo", e.target.value)
                    }
                    slotProps={{ inputLabel: { shrink: true } }}
                  />
                </Grid2>
              </Grid2>

              <Grid2 container spacing={2}>
                <Grid2 size={{ xs: 12, md: 6 }}>
                  <TextField
                    fullWidth
                    label="تاريخ الفاتورة من"
                    type="date"
                    value={filters.invoiceDateFrom ?? ""}
                    onChange={(e) =>
                      handleFilterChange("invoiceDateFrom", e.target.value)
                    }
                    slotProps={{ inputLabel: { shrink: true } }}
                  />
                </Grid2>
                <Grid2 size={{ xs: 12, md: 6 }}>
                  <TextField
                    fullWidth
                    label="تاريخ الفاتورة إلى"
                    type="date"
                    value={filters.invoiceDateTo ?? ""}
                    onChange={(e) =>
                      handleFilterChange("invoiceDateTo", e.target.value)
                    }
                    slotProps={{ inputLabel: { shrink: true } }}
                  />
                </Grid2>
              </Grid2>

              <Grid2 container spacing={2}>
                <Grid2 size={{ xs: 12, md: 6 }}>
                  <TextField
                    fullWidth
                    type="number"
                    label="إجمالي السعر من"
                    value={filters.totalPriceMin ?? ""}
                    onChange={(e) =>
                      handleFilterChange("totalPriceMin", e.target.value)
                    }
                  />
                </Grid2>
                <Grid2 size={{ xs: 12, md: 6 }}>
                  <TextField
                    fullWidth
                    type="number"
                    label="إجمالي السعر إلى"
                    value={filters.totalPriceMax ?? ""}
                    onChange={(e) =>
                      handleFilterChange("totalPriceMax", e.target.value)
                    }
                  />
                </Grid2>
              </Grid2>

              <Grid2 container spacing={2}>
                <Grid2 size={{ xs: 12, md: 6 }}>
                  <TextField
                    fullWidth
                    type="number"
                    label="المدفوع من"
                    value={filters.totalPaidMin ?? ""}
                    onChange={(e) =>
                      handleFilterChange("totalPaidMin", e.target.value)
                    }
                  />
                </Grid2>
                <Grid2 size={{ xs: 12, md: 6 }}>
                  <TextField
                    fullWidth
                    type="number"
                    label="المدفوع إلى"
                    value={filters.totalPaidMax ?? ""}
                    onChange={(e) =>
                      handleFilterChange("totalPaidMax", e.target.value)
                    }
                  />
                </Grid2>
              </Grid2>

              <Grid2 container spacing={2}>
                <Grid2 size={{ xs: 12, md: 6 }}>
                  <TextField
                    fullWidth
                    type="number"
                    label="غير المدفوع من"
                    value={filters.totalUnpaidMin ?? ""}
                    onChange={(e) =>
                      handleFilterChange("totalUnpaidMin", e.target.value)
                    }
                  />
                </Grid2>
                <Grid2 size={{ xs: 12, md: 6 }}>
                  <TextField
                    fullWidth
                    type="number"
                    label="غير المدفوع إلى"
                    value={filters.totalUnpaidMax ?? ""}
                    onChange={(e) =>
                      handleFilterChange("totalUnpaidMax", e.target.value)
                    }
                  />
                </Grid2>
              </Grid2>

              <Stack direction="row" justifyContent="flex-end">
                <Button variant="outlined" onClick={handleResetFilters}>
                  إعادة تعيين الفلاتر
                </Button>
              </Stack>
            </Stack>
          </Paper>
        </Collapse>

        <Divider sx={{ my: 3 }} />
        <SimpleDialog
          open={open}
          onClose={handleClose}
          children={
            <AddReturnForm
              invoice={selectedRow}
              invoice_id={selectedRow?.id || 0}
              doAfterSubmit={handleReloadPage}
            />
          }
        />
        <Grid2 container spacing={3}>
          <Paper sx={{ width: "100%", overflow: "hidden" }}>
            <TableContainer component={Paper}>
              <Table stickyHeader aria-label="sticky table">
                <TableHead>
                  <TableHeadRow>
                    <TableHeadCell>رقم الفاتورة</TableHeadCell>
                    <TableHeadCell>العميل</TableHeadCell>
                    <TableHeadCell>تاريخ انشاء الفاتورة </TableHeadCell>
                    <TableHeadCell>تاريخ الاستحقاق</TableHeadCell>

                    <TableHeadCell>السعر الكلى قبل التخفيض</TableHeadCell>
                    <TableHeadCell>التخفيض</TableHeadCell>

                    <TableHeadCell>السعر بعد التخفيض</TableHeadCell>
                    <TableHeadCell>تم الدفع بالكامل؟</TableHeadCell>
                    <TableHeadCell>اجمالى ما تم دفعه</TableHeadCell>
                    <TableHeadCell>اجمالى ما لم يتم دفعه</TableHeadCell>
                    <TableHeadCell> تسديد مبلغ </TableHeadCell>
                    <TableHeadCell> تسجيل مرتجع </TableHeadCell>
                    <TableHeadCell> التفاصيل </TableHeadCell>
                  </TableHeadRow>
                </TableHead>
                <TableBody>
                  {(TableData && TableData?.length ) &&
                    TableData?.map((row) => (
                      <TableRow
                        key={row.id}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableBodyCell>{row.invoice_number}</TableBodyCell>
                        <TableBodyCell>{row.customer_id} </TableBodyCell>
                        <TableBodyCell>
                          {formatDate(row.invoice_date)}
                        </TableBodyCell>
                        <TableBodyCell>
                          {formatDate(row.due_date)}
                        </TableBodyCell>

                        <TableBodyCell>{row.total_price} ج </TableBodyCell>
                        <TableBodyCell>{row.discount}</TableBodyCell>

                        <TableBodyCell>
                          {row.total_after_discount} ج
                        </TableBodyCell>

                        <TableBodyCell>
                          {row.is_paid ? (
                            <Chip label="نعم" color="primary" />
                          ) : (
                            <Chip label="لا" color="error" />
                          )}
                        </TableBodyCell>
                        <TableBodyCell>{row.total_paid}</TableBodyCell>
                        <TableBodyCell>{row.total_unpaid}</TableBodyCell>

                        <TableBodyCell>
                          <TableBodyCell>
                            {row.is_paid ? (
                              <Typography variant="caption" component={Link}>
                                اذهب لتسديد مبلغ
                              </Typography>
                            ) : (
                              <Link
                                component={RouterLink}
                                to={`/create-payment/${row.id}`}
                              >
                                اذهب لتسديد مبلغ
                              </Link>
                            )}
                          </TableBodyCell>
                        </TableBodyCell>
                        <TableBodyCell>
                          <Button
                            size="small"
                            onClick={() => {
                              handleClickOpen(row);
                            }}
                            variant="text"
                          >
                            تسجيل مرتجع
                          </Button>
                        </TableBodyCell>
                        <TableBodyCell>
                          <Link
                            component={RouterLink}
                            to={`/invoice/${row.id}`}
                          >
                            تفاصيل
                          </Link>
                        </TableBodyCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </TableContainer>
            <Divider sx={{ my: 3 }} />
            <Stack
              direction="row"
              spacing={2}
              alignItems="center"
              justifyContent="space-between"
            >
              <Stack
                direction="row"
                spacing={2}
                alignItems="center"
                justifyContent="space-between"
              >
                <Typography gutterBottom>
                  عدد الفواتير فى الصفحة : {rowsPerPage || 0}
                </Typography>
                <Select
                  value={rowsPerPage}
                  onChange={(e) => setRowsPerPage(Number(e.target.value))}
                >
                  <MenuItem value={100}>100</MenuItem>
                  <MenuItem value={500}>500</MenuItem>
                  <MenuItem value={1000}>1000</MenuItem>
                </Select>
              </Stack>

              <Stack
                direction="row"
                spacing={2}
                alignItems="center"
                justifyContent="center"
              >
                <IconButton
                  color="secondary"
                  aria-label="back"
                  size="small"
                  onClick={() => setPage(page - 1)}
                  disabled={page === 0}
                >
                  <Iconify icon={icons.next} width={24} />
                </IconButton>

                <Typography gutterBottom> الصفحة : {page + 1} </Typography>

                <IconButton
                  color="secondary"
                  aria-label="next"
                  size="small"
                  onClick={() => setPage(page + 1)}
                  disabled={totalDataLength <= (page + 1) * rowsPerPage}
                >
                  <Iconify icon={icons.back} width={24} />
                </IconButton>
              </Stack>
            </Stack>
          </Paper>
        </Grid2>
      </Paper>
    </Container>
  );
};

export default AgentInvoices;
