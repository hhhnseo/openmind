import axiosInstance from '../axiosInstance';

const postQuestion = async (subjectId, content) => {
  try {
    console.log('전송되는 subjectId:', subjectId); // 이게 14174로 찍히는지 확인!
    console.log('전송되는 content:', content);
    const res = await axiosInstance.post(`/subjects/${subjectId}/questions/`, {
      content,
    });

    return res.data;
  } catch (error) {
    console.error('질문 등록 실패', error);
    throw error;
  }
};

export default postQuestion;
