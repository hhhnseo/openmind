import axiosInstance from "../axiosInstance";

export const postReaction = async (questionId, type) => {
  const res = await axiosInstance.post(
    `/questions/${questionId}/reaction/`,
    { type }
  );

  return res.data;
};