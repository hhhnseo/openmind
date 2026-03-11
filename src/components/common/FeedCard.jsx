import styled from 'styled-components';
import ProfileImg from '../../assets/images/image-profile.svg';
import LikeButton from './LikeButton';
import Badge from "./Badge";
import { useState } from "react";
import AnswerForm from '../answer/AnswerForm';
import KebabMenu from '../answer/KebabMenu';
import postAnswer from '../../apis/answers/postAnswer';
import deleteQuestion from '../../apis/questions/deleteQuestion';
import deleteAnswer from '../../apis/answers/deleteAnswer';

export default function FeedCard({
  data,
  showMenu = true,
  showAnswerForm = true,
  onDelete
}) {
  
  const [editMode, setEditMode] = useState(false);

  const answer = data.answers?.[0];

  const isRejected = answer?.isRejected;
  const isAnswered = answer && !isRejected;

  let status = "none";

  if (answer) {
    status = answer.isRejected ? "rejected" : "answered";
  }

  const answerContent = answer?.content || "";

  const formatDate = (dateString) => {
    const now = new Date();
    const created = new Date(dateString);

    const diff = now - created;

    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const weeks = Math.floor(days / 7);
    const months = Math.floor(days / 30);

    if (minutes < 1) return "방금 전";
    if (minutes < 60) return `${minutes}분 전`;
    if (hours < 24) return `${hours}시간 전`;
    if (days === 1) return "어제";
    if (days < 7) return `${days}일 전`
    if (weeks < 5) return `${weeks}주 전`;
    return `${months}개월 전`;
  };

  const handleEdit = () => {
    setEditMode(true);
  };

  const handleDelete = async () => {
    try {
      await deleteQuestion(data.id);
      onDelete?.(data.id);
    } catch (error) {
      console.error(error);
    }
  };

  const handleReject = async () => {
    try {

      if (answer?.id) {
        await deleteAnswer(answer.id);
      }

      window.location.reload();

    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmitAnswer = async (text) => {
    try {

      if (answer?.id) {
        await deleteAnswer(answer.id);
      }

      await postAnswer(data.id, text);

      window.location.reload();

    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Container>

      <Header>
        <Badge $status={status} />

        {showMenu && (
          <KebabMenu
            onEdit={answer ? handleEdit : undefined}
            onDelete={handleDelete}
            onReject={answer ? handleReject : undefined}
          />
        )}

      </Header>

      <Question>
        <QuestionDate>
          질문 • {data.createdAt ? formatDate(data.createdAt) : ""}
        </QuestionDate>
        {data.content}
      </Question>

      <Form>
        <Profile src={ProfileImg} />

        <Content>

          <UserInfo>
            <Nickname>{data.author || "아초는 고양이"}</Nickname>
            <Date>{data.createdAt ? formatDate(data.createdAt) : ""}</Date>
          </UserInfo>

          {showAnswerForm && (editMode || !isAnswered) ? (
            <AnswerForm
              type="answer"
              defaultValue={answerContent}
              onSubmit={handleSubmitAnswer}
            />
          ) : isRejected ? (
            <RejectedText>답변 거절</RejectedText>
          ) : (
            isAnswered && <AnswerText>{answerContent}</AnswerText>
          )}

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
  )
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

const Date = styled.span`
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
  color: var(--red-50, #B93333);
  font-size: 16px;
  font-weight: 400;
  line-height: 22px;
`;

const Content = styled.div`
  display: flex;
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