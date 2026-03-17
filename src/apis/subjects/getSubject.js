import axiosInstance from "../axiosInstance";

export const getSubject = async (id) => {
  const res = await axiosInstance.get(`/subjects/${id}/`);
  return res.data;
};