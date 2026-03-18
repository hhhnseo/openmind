import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Layout from '../components/common/Layout';
import CardFrame from '../components/common/CardFrame';
import { getSubject } from '../apis/subjects/getSubject';
import Modal from '../components/common/Modal';

export default function Post() {
  const { id } = useParams();
  const [profile, setProfile] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const [refreshSignal, setRefreshSignal] = useState(false);

  const handleOpenModal = () => setModalOpen(true);
  const handleCloseModal = () => setModalOpen(false);

  const handleQuestionSuccess = () => {
    setRefreshSignal((prev) => !prev);
  };
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

  return (
    <Layout profile={profile} handleOpenModal={handleOpenModal}>
      <CardFrame
        profile={profile}
        subjectID={id}
        showMenu={false}
        showAnswerForm={false}
        refreshSignal={refreshSignal}
      />
      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        subjectId={id}
        profile={profile}
        onSuccess={handleQuestionSuccess}
      />
    </Layout>
  );
}
