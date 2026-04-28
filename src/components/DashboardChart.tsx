import React, { useMemo } from "react";
import {
  Box,
  LinearProgress,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  CircularProgress,
} from "@mui/material";
import Iconify from "./iconify/Iconify";
import { icons } from "./iconify/IconRegistry";

export type ChartRow = {
  day: string;
  فواتير: number;
  مبيعات: number;
};

type Props = {
  data: ChartRow[];
  loading?: boolean;
  title?: string;
};

const DashboardChart: React.FC<Props> = ({
  data,
  loading,
  title = "نشاطك — آخر 7 أيام",
}) => {
  const maxInv = useMemo(
    () => Math.max(1, ...data.map((d) => d.فواتير)),
    [data]
  );
  const maxSales = useMemo(
    () => Math.max(1, ...data.map((d) => d.مبيعات)),
    [data]
  );

  return (
    <Paper
      sx={{
        p: 3,
        borderRadius: 3,
        boxShadow: "0 1px 3px 0 rgb(0 0 0 / 0.06)",
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
        <Iconify icon={icons.chart} width={28} />
        <Typography variant="h6" fontWeight={700}>
          {title}
        </Typography>
      </Box>
      {loading ? (
        <Box
          sx={{
            py: 8,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <CircularProgress />
        </Box>
      ) : (
        <TableContainer>
          <Table size="small" aria-label="نشاط الفواتير">
            <TableHead>
              <TableRow>
                <TableCell>اليوم</TableCell>
                <TableCell align="center">فواتير</TableCell>
                <TableCell align="right">مبيعات (ج)</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((row, idx) => (
                <TableRow key={`${idx}-${row.day}`}>
                  <TableCell component="th" scope="row" sx={{ fontWeight: 600 }}>
                    {row.day}
                  </TableCell>
                  <TableCell>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <Typography variant="body2" sx={{ minWidth: 28 }}>
                        {row.فواتير}
                      </Typography>
                      <LinearProgress
                        variant="determinate"
                        value={(row.فواتير / maxInv) * 100}
                        sx={{
                          flex: 1,
                          height: 8,
                          borderRadius: 1,
                          bgcolor: "grey.200",
                          "& .MuiLinearProgress-bar": {
                            borderRadius: 1,
                            bgcolor: "primary.main",
                          },
                        }}
                      />
                    </Box>
                  </TableCell>
                  <TableCell align="right">
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "flex-end",
                        gap: 1,
                      }}
                    >
                      <LinearProgress
                        variant="determinate"
                        value={(row.مبيعات / maxSales) * 100}
                        sx={{
                          width: 80,
                          height: 8,
                          borderRadius: 1,
                          bgcolor: "grey.200",
                          "& .MuiLinearProgress-bar": {
                            borderRadius: 1,
                            bgcolor: "success.main",
                          },
                        }}
                      />
                      <Typography variant="body2" sx={{ minWidth: 56 }}>
                        {row.مبيعات}
                      </Typography>
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Paper>
  );
};

export default DashboardChart;
