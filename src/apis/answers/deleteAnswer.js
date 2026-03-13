import axiosInstance from "../axiosInstance";

const deleteAnswer = async (answerId) => {
  try {
    const response = await axiosInstance.delete(`/answers/${answerId}/`);
    return response.status;
  } catch (error) {
    console.error("답변 삭제 실패", error);
    throw error;
  }
};

export default deleteAnswer;