import axiosInstance from "../utils/axiosInstance";

export type AgentDashboardSummary = {
  invoices_today: number;
  sales_today: number;
  invoices_month: number;
  sales_month: number;
  payments_month: number;
  payments_today: number;
  outstanding_unpaid: number;
  customers_touched: number;
  vans_count: number;
};

export type AgentDashboardChartPoint = {
  date: string;
  day: string;
  invoices: number;
  sales: number;
};

export type AgentDashboardPayload = {
  summary: AgentDashboardSummary;
  chart: AgentDashboardChartPoint[];
};

export type AgentDashboardApiResult =
  | { success: true; data: AgentDashboardPayload }
  | { success: false; error: string };

export const getAgentDashboard = async (days = 7): Promise<AgentDashboardApiResult> => {
  try {
    const res = await axiosInstance.get<{
      success: boolean;
      data: AgentDashboardPayload;
    }>("/dashboard/agent", { params: { days } });
    const body = res?.data;
    if (body?.success && body.data) {
      return { success: true, data: body.data };
    }
    return { success: false, error: "استجابة غير صالحة من الخادم" };
  } catch (err: unknown) {
    const e = err as { response?: { data?: { error?: string } } };
    return {
      success: false,
      error: e?.response?.data?.error ?? "تعذر الاتصال بالخادم",
    };
  }
};
