import axiosInstance from "../axiosInstance"

const postAnswer = async (questionId, content) => {
  try {
    const response = await axiosInstance.post(
      `/questions/${questionId}/answers`,
      {
        content: content,
      }
    );

    return response.data;
  } catch (error) {
    console.error("답변 등록 실패", error);
    throw error;
  }
};

export default postAnswer;