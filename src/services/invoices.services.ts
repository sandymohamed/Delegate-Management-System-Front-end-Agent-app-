import { InvoiceFormData } from "../types/invoice";
import { TypePaymentFOrCustomerSubmitData, TypePaymentSubmitData } from "../types/payment";
import axiosInstance from "../utils/axiosInstance";

export type AgentInvoicesFilters = {
  lateStatus?: "late" | "not_late" | "";
  isPaid?: "true" | "false" | "";
  dueDateFrom?: string;
  dueDateTo?: string;
  invoiceDateFrom?: string;
  invoiceDateTo?: string;
  totalPriceMin?: string;
  totalPriceMax?: string;
  totalPaidMin?: string;
  totalPaidMax?: string;
  totalUnpaidMin?: string;
  totalUnpaidMax?: string;
  customerName?: string;
  customerLocation?: string;
};

export const getAllInvoices = async (
  id: number,
  searchTerm?: string | null,
  limit?: number,
  page?: number,
  filters?: AgentInvoicesFilters
) => {
  const params: Record<string, string | number> = {
    limit: limit ?? 100,
    page: page ?? 1,
  };

  if (searchTerm) {
    params.searchTerm = searchTerm;
  }

  if (filters) {
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== "") {
        params[key] = value;
      }
    });
  }

  const response = await axiosInstance
    .get(`/invoices/agent/${id}`, { params })
    .then((res) => res?.data?.result)
    .catch((err) => err);

  return response;
};

export const getAllInvoicesForCustomer = async (
  id: number,
  limit?: number,
  page?: number
) => {
  const response = await axiosInstance
    .post(`/invoices/customer/${id}`, { limit, page })
    .then((res) => res?.data)
    .catch((err) => err);

  return response;
};

export const getInvoiceById = async (id: number) => {
  const response = await axiosInstance
    .get(`/invoices/${id}`)
    .then((res) => res?.data?.data[0])
    .catch((err) => err);

  return response;
};

export const createNewInvoice = async (data: InvoiceFormData) => {
  const response = await axiosInstance
    .post("/invoices/", data)
    .then((res) => res?.data)
    .catch((err) => err);

  return response;
};

// ******************************** PAYMENTS:
export const addPayment = async (data: TypePaymentSubmitData) => {
  const response = await axiosInstance
    .post("/payments/", data)
    .then((res) => res?.data)
    .catch((err) => err);

  return response;
};
export const addPaymentForCustomer = async (data: TypePaymentFOrCustomerSubmitData) => {
  const response = await axiosInstance
    .post("/payments/customer", data)
    .then((res) => res?.data)
    .catch((err) => err);

  return response;
};

export const getPaymentById = async (id: number) => {
  const response = await axiosInstance
    .get(`/payments/${id}`)
    .then((res) => res?.data?.data)
    .catch((err) => err);

  return response;
};
