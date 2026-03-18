import Layout from '../components/common/Layout';
import CardFrame from '../components/common/CardFrame';
import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getSubject } from '../apis/subjects/getSubject';

export default function Answer() {
  const { id } = useParams();
  const [profile, setProfile] = useState(null);

  const [deleteSignal, setDeleteSignal] = useState(0);
  const [questionCount, setQuestionCount] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const subjectData = JSON.parse(localStorage.getItem('subjectId'));
    const subjectId = subjectData?.id;

    if (!subjectId) {
      navigate('/');
    }
  }, [navigate]);

  const handleDeleteAll = () => {
    const confirmed = window.confirm('삭제하시겠습니까?');
    if (confirmed) {
      setDeleteSignal((prev) => prev + 1);
    }
  };

  useEffect(() => {
    if (!id) return;
    const fetchProfile = async () => {
      try {
        const data = await getSubject(id);
        setProfile(data);
      } catch (err) {
        console.error('프로필 불러오기 실패', err);
      }
    };

    fetchProfile();
  }, [id]);

  return (
    <Layout profile={profile}>
      <AnswerContainer>
        {questionCount > 0 && (
          <DeleteButton onClick={handleDeleteAll}>삭제하기</DeleteButton>
        )}
      </AnswerContainer>

      <CardFrame
        subjectID={id}
        profile={profile}
        showMenu={true}
        showAnswerForm={true}
        deleteSignal={deleteSignal}
        setQuestionCount={setQuestionCount}
      />
    </Layout>
  );
}

const AnswerContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const DeleteButton = styled.button`
  display: flex;
  margin-bottom: 14px;
  width: 100px;
  height: 35px;
  padding: 12px 22px;
  justify-content: center;
  align-items: center;
  gap: 8px;
  border-radius: 200px;
  background: var(--brown-40, #542f1a);
  box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.25);
  color: var(--grayScale-10, #fff);
  font-size: 15px;
  font-weight: 400;
  line-height: 25px;
`;
