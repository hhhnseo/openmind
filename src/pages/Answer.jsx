import Layout from '../components/common/Layout';
import CardFrame from '../components/common/CardFrame';
import styled from 'styled-components';
import { useState, useEffect } from 'react'; //useEffect 추가
import { useParams } from 'react-router-dom';
import { getSubject } from "../apis/subjects/getSubject";

export default function Answer() {
  const { id } = useParams(); // url에서 post id 가져오기
  const [deleteSignal, setDeleteSignal] = useState(0);
  const [profile, setProfile] = useState(null); // 프로필 상태

  const handleDeleteAll = () => {
    const confirmed = window.confirm("삭제하시겠습니까?");
    if (confirmed) {
      setDeleteSignal((prev) => prev + 1);
    }
  };

 // post id 기준으로 바로 프로필 가져오기
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
        <DeleteButton onClick={handleDeleteAll}>
          삭제하기
        </DeleteButton>
      </AnswerContainer>

      <CardFrame
        subjectID={id}
        profile={profile}
        showMenu={true}
        showAnswerForm={true}
        deleteSignal={deleteSignal}
      />
    </Layout>
  )
};

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
  background: var(--brown-40, #542F1A);
  box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.25);
  color: var(--grayScale-10, #fff);
  font-size: 15px;
  font-weight: 400;
  line-height: 25px;
`;