import axiosInstance from "../axiosInstance"

const patchAnswer = async (answerId, answerData) => {
  try {
    const res = await axiosInstance.patch(
      `/answers/${answerId}/`,
      answerData
    );
    return res.data;
  } catch (error) {
    console.error('답변 수정 실패', error.res?.data || error);
    throw error;
  }
};

export default patchAnswer;