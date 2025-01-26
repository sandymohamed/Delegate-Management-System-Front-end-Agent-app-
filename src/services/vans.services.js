import axiosInstance from "../utils/axiosInstance"

export const getVanForAgent =async (user_id) => {
    const response = await axiosInstance.get(`/vans/user/${user_id}`)
        .then(res => res?.data?.data)
        .catch(err => err);

        return response;
}