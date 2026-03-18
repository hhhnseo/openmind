import styled from 'styled-components';
import ProfileImg from '../../assets/images/image-profile.svg';
import LikeButton from './LikeButton';
import Badge from './Badge';
import { useState } from 'react';
import AnswerForm from '../answer/AnswerForm';
import KebabMenu from '../answer/KebabMenu';
import postAnswer from '../../apis/answers/postAnswer';
import patchAnswer from '../../apis/answers/patchAnswer';

export default function FeedCard({
  data,
  profile, //프로필 데이터 추가 (테스트)
  showMenu = true,
  showAnswerForm = true,
  onDelete,
}) {
  const [editMode, setEditMode] = useState(false);
  const [answer, setAnswer] = useState(data?.answer ?? null);

  const isRejected = answer?.isRejected === true;
  const hasAnswer = !!answer && !isRejected;

  let status = 'none';
  if (answer) {
    status = isRejected ? 'rejected' : 'answered';
  }

  const answerContent = answer?.content ?? '';

  const formatDate = (dateString) => {
    if (!dateString) return '';

    const created = new Date(dateString);
    if (Number.isNaN(created.getTime())) return '';

    const now = new Date();
    const diff = now - created;

    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const weeks = Math.floor(days / 7);
    const months = Math.floor(days / 30);

    if (minutes < 1) return '방금 전';
    if (minutes < 60) return `${minutes}분 전`;
    if (hours < 24) return `${hours}시간 전`;
    if (days === 1) return '어제';
    if (days < 7) return `${days}일 전`;
    if (weeks < 5) return `${weeks}주 전`;
    return `${months}개월 전`;
  };

  const handleEdit = () => {
    setEditMode(true);
  };

  const handleDelete = () => {
    onDelete?.(data.id);
  };

  const handleReject = async () => {
    try {
      if (answer?.id) {
        const response = await patchAnswer(answer.id, {
          content: answer.content || "답변 거절",
          isRejected: true,
        });

        setAnswer(response);
        setEditMode(false);
        return;
      }

      const response = await postAnswer(data.id, "답변 거절", true);

      setAnswer(response);
      setEditMode(false);
    } catch (error) {
      console.error("답변 거절 실패", error.response?.data || error);
    }
  };

  const handleSubmitAnswer = async (text) => {
    try {
      // 기존 답변이 있으면 수정
      if (answer?.id) {
        const response = await patchAnswer(answer.id, {
          content: text,
          isRejected: false,
        });

        setAnswer(response);
        setEditMode(false);
        return;
      }

      // 기존 답변이 없으면 새로 생성
      const response = await postAnswer(data.id, text, false);

      setAnswer(response);
      setEditMode(false);
    } catch (error) {
      console.error("답변 등록 실패", error.response?.data || error);
      throw error;
    }
  };

  return (
    <Container>
      <Header>
        <Badge $status={status} />

        {showMenu && (
          <KebabMenu
            onEdit={hasAnswer ? handleEdit : undefined}
            onDelete={handleDelete}
            onReject={handleReject}
          />
        )}
      </Header>

      <Question>
        <QuestionDate>
          질문 • {formatDate(data.createdAt)}
        </QuestionDate>
        {data.content}
      </Question>

      <Form>
        { /* <Profile src={ProfileImg} alt="프로필 이미지" />
        하단 테스트로 인해 잠시 주석 처리*/}
        <Profile
          src={profile?.imageSource || ProfileImg} // 이미지 불러오고, 없으면 기본 이미지
          alt="프로필 이미지"/>
        <Content>
          <UserInfo>
            { /* <Nickname>{data.author || '아초는 고양이'}</Nickname>
            하단 테스트로 인해 잠시 주석 처리 */}
            <Nickname >{profile?.name || data.author || '아초는 고양이'}</Nickname>
            <CreatedDateText>{formatDate(data.createdAt)}</CreatedDateText>
          </UserInfo>

          {showAnswerForm && (editMode || !answer) ? (
            <AnswerForm
              type="answer"
              defaultValue={answerContent}
              onSubmit={handleSubmitAnswer}
            />
          ) : isRejected ? (
            <RejectedText>답변 거절</RejectedText>
          ) : hasAnswer ? (
            <AnswerText>{answerContent}</AnswerText>
          ) : null}
        </Content>
      </Form>

      <Footer>
        <LikeButton
          questionId={data.id}
          initialLike={data.like}
          initialDislike={data.dislike}
        />
      </Footer>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 32px;
  background: var(--grayScale-10, #fff);
  border-radius: 16px;
  padding: 32px;
  box-shadow: var(--shadow-1pt);
`;

const Header = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
`;

const Form = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 12px;
  align-self: stretch;
`;

const Profile = styled.img`
  width: 36px;
  height: 36px;
  border-radius: 50%;
`;

const UserInfo = styled.div`
  display: flex;
  gap: 8px;
  font-size: 14px;
`;

const Nickname = styled.span`
  color: var(--grayScale-60, #000);
  font-weight: 400;
  font-size: 18px;
  line-height: 24px;
`;

const CreatedDateText = styled.span`
  color: var(--grayScale-40, #818181);
  font-size: 14px;
  font-weight: 500;
  line-height: 24px;
`;

const Question = styled.div`
  display: flex;
  flex-direction: column;
  font-weight: 400;
  font-size: 18px;
`;

const QuestionDate = styled.span`
  color: var(--grayScale-40, #818181);
  font-size: 14px;
  font-weight: 500;
  line-height: 18px;
`;

const RejectedText = styled.div`
  color: var(--red-50, #b93333);
  font-size: 16px;
  font-weight: 400;
  line-height: 22px;
`;

const Content = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  font-size: 16px;
  color: var(--grayScale-60, #000);
  font-weight: 400;
  line-height: 22px;
  gap: 4px;
`;

const Footer = styled.div`
  display: flex;
  width: 100%;
  gap: 16px;
  font-size: 14px;
  color: #666;
  border-top: 1px solid var(--grayScale-30);
  padding-top: 24px;
`;

const AnswerText = styled.div`
  font-size: 16px;
  color: var(--grayScale-60, #000);
  font-weight: 400;
  line-height: 22px;
`;