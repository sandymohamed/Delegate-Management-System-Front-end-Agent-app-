import axiosInstance from "../utils/axiosInstance"

export const getProductsList = async ( searchTerm=null, limit=null, page=1) => {
    const response = await axiosInstance.post('/products/', {searchTerm, limit, page})
        .then(res => res?.data?.data)
        .catch(err => err);

    return response;
}

export const getProductById = async (id) => {
    const response = await axiosInstance.get(`/products/${id}`)
        .then(res => res?.data?.data[0])
        .catch(err => err);

    return response;
}
export const addNewProduct = async (data) => {
    const response = await axiosInstance.post('/products/create', data)
        .then(res => res?.data?.data)
        .catch(err => err);

    return response;
}