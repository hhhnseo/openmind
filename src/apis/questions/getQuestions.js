import axiosInstance from "../axiosInstance"

const getQuestions = async (subjectId, limit = 3, offset = 0) => {
  try {
    const response = await axiosInstance.get(
      `/subjects/${subjectId}/questions/`,
      {
        params: {
          limit,
          offset
        }
      }
    );

    return response.data;
  } catch (error) {
    console.error("질문을 불러오는데 실패했습니다.", error)
    throw error;
  }
};

export default getQuestions;