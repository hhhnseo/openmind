import axiosInstance from "../axiosInstance"

const getQuestions = async (subjectId) => {
  try {
    const response = await axiosInstance.get(
      `/subjects/${subjectId}/questions/`
    );
    return response.data;
  } catch (error) {
    console.error("질문을 불러오는데 실패했습니다.", error)
    throw error;
  }
};

export default getQuestions;