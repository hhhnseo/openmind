import axiosInstance from "../axiosInstance"

const deleteQuestion = async (id) => {
  try {
    await axiosInstance.delete(`/questions/${id}/`);
  } catch (error) {
    console.error("질문 삭제 실패", error);
    throw error;
  }
};

export default deleteQuestion;