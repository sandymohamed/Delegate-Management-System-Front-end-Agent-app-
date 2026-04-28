import React, { useEffect, useMemo, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import {
  Alert,
  Box,
  Card,
  CardContent,
  Container,
  Grid2,
  Link,
  Paper,
  Typography,
} from "@mui/material";
import Iconify from "../components/iconify/Iconify";
import { icons } from "../components/iconify/IconRegistry";
import DashboardChart, { ChartRow } from "../components/DashboardChart";
import {
  getAgentDashboard,
  AgentDashboardPayload,
} from "../services/dashboard.services";
import { useAuth } from "../context/AuthContext";

const formatMoney = (n: number) =>
  `${new Intl.NumberFormat("ar-EG", { maximumFractionDigits: 0 }).format(
    Number(n) || 0
  )} ج`;

const formatInt = (n: number) =>
  new Intl.NumberFormat("ar-EG", { maximumFractionDigits: 0 }).format(
    Number(n) || 0
  );

const StatCard: React.FC<{
  title: string;
  value: string | number;
  icon: string;
  color: string;
  bgColor: string;
}> = ({ title, value, icon, color, bgColor }) => (
  <Paper
    sx={{
      p: 2.5,
      borderRadius: 3,
      display: "flex",
      alignItems: "center",
      gap: 2,
      boxShadow: "0 1px 3px 0 rgb(0 0 0 / 0.06)",
      transition: "box-shadow 0.2s ease",
      "&:hover": {
        boxShadow: "0 4px 12px rgb(0 0 0 / 0.08)",
      },
    }}
  >
    <Box
      sx={{
        width: 56,
        height: 56,
        borderRadius: 2,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        bgcolor: bgColor,
        color,
      }}
    >
      <Iconify icon={icon} width={32} />
    </Box>
    <Box sx={{ minWidth: 0 }}>
      <Typography variant="body2" color="text.secondary" fontWeight={600}>
        {title}
      </Typography>
      <Typography
        variant="h5"
        fontWeight={800}
        sx={{ fontFamily: "inherit", wordBreak: "break-word" }}
      >
        {value}
      </Typography>
    </Box>
  </Paper>
);

const ActionCard: React.FC<{
  to: string;
  title: string;
  subtitle?: string;
  icon: string;
  iconBg: string;
  iconColor: string;
}> = ({ to, title, subtitle, icon, iconBg, iconColor }) => (
  <Link component={RouterLink} to={to} underline="none" sx={{ height: "100%" }}>
    <Card
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        transition: "transform 0.2s ease, box-shadow 0.2s ease",
        "&:hover": {
          transform: "translateY(-2px)",
          boxShadow: 4,
        },
      }}
    >
      <CardContent
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          gap: 1.5,
        }}
      >
        <Box
          sx={{
            width: 52,
            height: 52,
            borderRadius: 2,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            bgcolor: iconBg,
            color: iconColor,
          }}
        >
          <Iconify icon={icon} width={28} />
        </Box>
        <Typography variant="subtitle1" fontWeight={700} color="text.primary">
          {title}
        </Typography>
        {subtitle && (
          <Typography variant="body2" color="text.secondary">
            {subtitle}
          </Typography>
        )}
      </CardContent>
    </Card>
  </Link>
);

// ----------------------------------------------------------------------
const Dashboard: React.FC = () => {
  const { user, loading: authLoading } = useAuth();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [payload, setPayload] = useState<AgentDashboardPayload | null>(null);

  useEffect(() => {
    if (authLoading || !user?.id) {
      if (!authLoading && !user) {
        setLoading(false);
        setPayload(null);
      }
      return;
    }

    let cancelled = false;
    setLoading(true);
    setError(null);
    getAgentDashboard(7).then((res) => {
      if (cancelled) return;
      if (res.success) {
        setPayload(res.data);
        setError(null);
      } else {
        setPayload(null);
        setError(res.error);
      }
      setLoading(false);
    });
    return () => {
      cancelled = true;
    };
  }, [authLoading, user?.id]);

  const chartRows: ChartRow[] = useMemo(() => {
    if (!payload?.chart?.length) return [];
    return payload.chart.map((p) => ({
      day: p.day,
      فواتير: p.invoices,
      مبيعات: p.sales,
    }));
  }, [payload]);

  const s = payload?.summary;

  return (
    <Box sx={{ bgcolor: "background.default", minHeight: "100vh", pb: 6 }}>
      <Container maxWidth="xl" sx={{ pt: 4 }}>
        <Box sx={{ mb: 4 }}>
          <Typography
            variant="h4"
            fontWeight={800}
            sx={{ color: "text.primary", mb: 0.5, fontFamily: "inherit" }}
          >
            مرحباً بك{user?.name ? `، ${user.name}` : ""}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            أرقامك فقط — فواتيرك ومدفوعاتك وعملاءك المرتبطين بحسابك كمندوب
          </Typography>
        </Box>

        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}

        <Grid2 container spacing={2} sx={{ mb: 2 }}>
          <Grid2 size={{ xs: 12, sm: 6, md: 4 }}>
            <StatCard
              title="فواتير اليوم"
              value={loading ? "…" : formatInt(s?.invoices_today ?? 0)}
              icon={icons.invoice}
              color="#0ea5e9"
              bgColor="#e0f2fe"
            />
          </Grid2>
          <Grid2 size={{ xs: 12, sm: 6, md: 4 }}>
            <StatCard
              title="مبيعات اليوم"
              value={loading ? "…" : formatMoney(s?.sales_today ?? 0)}
              icon={icons.payment}
              color="#059669"
              bgColor="#d1fae5"
            />
          </Grid2>
          <Grid2 size={{ xs: 12, sm: 6, md: 4 }}>
            <StatCard
              title="مدفوعات الشهر (فواتيرك)"
              value={loading ? "…" : formatMoney(s?.payments_month ?? 0)}
              icon={icons.wallet}
              color="#10b981"
              bgColor="#d1fae5"
            />
          </Grid2>
        </Grid2>

        <Grid2 container spacing={2} sx={{ mb: 4 }}>
          <Grid2 size={{ xs: 12, sm: 6, md: 4 }}>
            <StatCard
              title="عملاء تعاملت معهم"
              value={loading ? "…" : formatInt(s?.customers_touched ?? 0)}
              icon={icons.customers}
              color="#8b5cf6"
              bgColor="#ede9fe"
            />
          </Grid2>
          <Grid2 size={{ xs: 12, sm: 6, md: 4 }}>
            <StatCard
              title="متبقي غير مدفوع (فواتيرك)"
              value={loading ? "…" : formatMoney(s?.outstanding_unpaid ?? 0)}
              icon={icons.payment}
              color="#dc2626"
              bgColor="#fee2e2"
            />
          </Grid2>
          <Grid2 size={{ xs: 12, sm: 6, md: 4 }}>
            <StatCard
              title="فواتير الشهر"
              value={loading ? "…" : formatInt(s?.invoices_month ?? 0)}
              icon={icons.invoice}
              color="#0284c7"
              bgColor="#e0f2fe"
            />
          </Grid2>
        </Grid2>

        <Grid2 container spacing={2} sx={{ mb: 4 }}>
          <Grid2 size={{ xs: 12, sm: 6, md: 4 }}>
            <StatCard
              title="مبيعات الشهر"
              value={loading ? "…" : formatMoney(s?.sales_month ?? 0)}
              icon={icons.payment}
              color="#047857"
              bgColor="#d1fae5"
            />
          </Grid2>
          <Grid2 size={{ xs: 12, sm: 6, md: 4 }}>
            <StatCard
              title="مدفوعات اليوم"
              value={loading ? "…" : formatMoney(s?.payments_today ?? 0)}
              icon={icons.wallet}
              color="#0d9488"
              bgColor="#ccfbf1"
            />
          </Grid2>
          <Grid2 size={{ xs: 12, sm: 6, md: 4 }}>
            <StatCard
              title="شاحناتك"
              value={loading ? "…" : formatInt(s?.vans_count ?? 0)}
              icon={icons.van}
              color="#7c3aed"
              bgColor="#e9d5ff"
            />
          </Grid2>
        </Grid2>

        <Box sx={{ mb: 4, maxWidth: 720 }}>
          <DashboardChart
            data={chartRows}
            loading={loading}
            title="فواتيرك ومبيعاتك — آخر 7 أيام"
          />
        </Box>

        <Typography
          variant="h6"
          fontWeight={700}
          sx={{ mb: 2, color: "text.primary", fontFamily: "inherit" }}
        >
          المهام السريعة
        </Typography>
        <Grid2 container spacing={2}>
          <Grid2 size={{ xs: 12, sm: 6, md: 4 }}>
            <ActionCard
              to="/van"
              title="تتبع محتويات الشاحنة"
              subtitle="محتوى الشاحنة اليوم"
              icon={icons.track}
              iconBg="#e9d5ff"
              iconColor="#7c3aed"
            />
          </Grid2>
          <Grid2 size={{ xs: 12, sm: 6, md: 4 }}>
            <ActionCard
              to="/create-invoice"
              title="فاتورة جديدة"
              subtitle="إنشاء فاتورة للعميل"
              icon={icons.invoice}
              iconBg="#d1fae5"
              iconColor="#059669"
            />
          </Grid2>
          <Grid2 size={{ xs: 12, sm: 6, md: 4 }}>
            <ActionCard
              to="/invoices"
              title="فواتيري"
              subtitle="عرض وتسديد الفواتير"
              icon={icons.invoice}
              iconBg="#e0f2fe"
              iconColor="#0ea5e9"
            />
          </Grid2>
          <Grid2 size={{ xs: 12, sm: 6, md: 4 }}>
            <ActionCard
              to="/invoices"
              title="تسديد فاتورة"
              subtitle="الذهاب إلى الفواتير للتسديد"
              icon={icons.payment}
              iconBg="#d1fae5"
              iconColor="#10b981"
            />
          </Grid2>
          <Grid2 size={{ xs: 12, sm: 6, md: 4 }}>
            <ActionCard
              to="/customers"
              title="العملاء"
              subtitle="عرض وإضافة العملاء"
              icon={icons.customers}
              iconBg="#ede9fe"
              iconColor="#8b5cf6"
            />
          </Grid2>
          <Grid2 size={{ xs: 12, sm: 6, md: 4 }}>
            <ActionCard
              to="/products/list"
              title="المنتجات"
              subtitle="عرض المنتجات والمخزون"
              icon={icons.products}
              iconBg="#e9d5ff"
              iconColor="#7c3aed"
            />
          </Grid2>
        </Grid2>
      </Container>
    </Box>
  );
};

export default Dashboard;
