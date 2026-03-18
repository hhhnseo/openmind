import { createPortal } from 'react-dom';
import styled from 'styled-components';
import closeIcon from '../../assets/icons/icon-close.svg';
import messagesIcon from '../../assets/icons/icon-messages.svg';
import AnswerForm from '../answer/AnswerForm';
import postQuestion from '../../apis/questions/postQuestion';

const Modal = ({ isOpen, onClose, profile, subjectId, onSuccess }) => {
  if (!isOpen) {
    return null;
  }

  const handlePost = async (content) => {
    try {
      await postQuestion(subjectId, content);
      onSuccess();
      onClose();
    } catch (error) {
      console.error('상세 에러 내용:', error);
    }
  };

  return createPortal(
    <Wrapper onClick={onClose}>
      <FinalContainer onClick={(e) => e.stopPropagation()}>
        <MiddleContainer>
          <Top>
            <TitleContainer>
              <img src={messagesIcon} alt="" />
              <Title>질문을 작성하세요</Title>
            </TitleContainer>
            <Button onClick={onClose}>
              <img src={closeIcon} alt="모달 닫기" />
            </Button>
          </Top>
          <UserContainer>
            To.
            <Image src={profile?.imageSource} alt="프로필 이미지" />
            <Name>{profile?.name}</Name>
          </UserContainer>
        </MiddleContainer>
        <AnswerForm type="question" onSubmit={handlePost} />
      </FinalContainer>
    </Wrapper>,

    document.getElementById('modal-root')
  );
};

export default Modal;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.56);
  z-index: 1000;
`;

const FinalContainer = styled.div`
  border-radius: 24px;
  background-color: var(--grayScale-10);
  height: 454px;
  max-width: 612px;
  width: 100%;
  padding: 40px;
`;

const MiddleContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 40px;
  margin-bottom: 12px;
`;

const Top = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

const TitleContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
`;

const Title = styled.h1`
  color: var(--grayScale-60);
  font-size: 24px;
  font-weight: 300;
`;

const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const UserContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  width: 100%;
  color: var(--grayScale-60);
  font-size: 18px;
`;

const Image = styled.img`
  border-radius: 50%;
  object-fit: cover;
  width: 28px;
  height: 28px;
`;

const Name = styled.p`
  line-height: 22px;
  font-size: 16px;
`;
