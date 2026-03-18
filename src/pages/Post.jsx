import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Layout from '../components/common/Layout';
import CardFrame from '../components/common/CardFrame';
import { getSubject } from '../apis/subjects/getSubject';
import Modal from '../components/common/Modal';

export default function Post() {
  const { id } = useParams();
  const [profile, setProfile] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false); // 모달 상태 추가
  const [refreshSignal, setRefreshSignal] = useState(false); // 새로고침 신호

  const handleOpenModal = () => setModalOpen(true);
  const handleCloseModal = () => setModalOpen(false);

  const handleQuestionSuccess = () => {
    setRefreshSignal((prev) => !prev);
  };
  // id 기준으로 프로필 호출
  useEffect(() => {
    const fetchProfile = async () => {
      if (!id) return;

      try {
        const data = await getSubject(id);
        setProfile(data);
      } catch (error) {
        console.error('프로필 불러오기 실패', error);
      }
    };

    fetchProfile();
  }, [id]);

  console.log('Post 페이지에서 파악한 ID:', id);

  return (
    <Layout profile={profile} handleOpenModal={handleOpenModal}>
      <CardFrame
        profile={profile} //테스트
        subjectID={id}
        showMenu={false}
        showAnswerForm={false}
        refreshSignal={refreshSignal}
      />
      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        subjectId={id}
        profile={profile} // 모달에 프로필 정보 전달 (MOCK 대체용)
        onSuccess={handleQuestionSuccess} // 성공 콜백 전달
      />
    </Layout>
  );
}
