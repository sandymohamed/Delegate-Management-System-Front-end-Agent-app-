import axiosInstance from "../utils/axiosInstance"

export const getAllInvoices = async (id, searchTerm, limit, page) => {
    const response = await axiosInstance.post(`/invoices/agent/${id}`,{searchTerm, limit, page})
        .then(res => res?.data?.result)
        .catch(err => err);

    return response;
}
export const getAllInvoicesForCustomer = async (id,  limit, page) => {
    const response = await axiosInstance.post(`/invoices/customer/${id}`,{ limit, page})
        .then(res => res?.data)
        .catch(err => err);

    return response;
}

export const getInvoiceById = async (id) => {
    const response = await axiosInstance.get(`/invoices/${id}`)
        .then(res => res?.data?.data[0])
        .catch(err => err);

    return response;
}

export const createNewInvoice = async (data) => {
    const response = await axiosInstance.post('/invoices/', data)
        .then(res => res?.data?.data)
        .catch(err => err);

    return response;
}