import axiosInstance from "../utils/axiosInstance"

export const getAllCustomers = async (searchTerm, limit, page) => {
    const response = await axiosInstance.post(`/customers/`, { searchTerm, limit, page })
        .then(res => res?.data)
        .catch(err => err);

    return response;
}

export const getCustomerById = async (id) => {
    const response = await axiosInstance.get(`/customers/${id}`)
        .then(res => res?.data?.data[0])
        .catch(err => err);

    return response;
}
export const addNewCustomer = async (data) => {
    const response = await axiosInstance.post('/customers/create', data)
        .then(res => res?.data?.data)
        .catch(err => err);

    return response;
}