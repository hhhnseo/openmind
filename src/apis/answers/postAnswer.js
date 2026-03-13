import axiosInstance from "../axiosInstance"

const postAnswer = async (questionId, content, isRejected = false) => {
  try {
    const res = await axiosInstance.post(
      `/questions/${questionId}/answers/`,
      {
        content,
        isRejected,
      }
    );

    return res.data;
  } catch (error) {
    console.error("답변 등록 실패", error);
    throw error;
  }
};

export default postAnswer;