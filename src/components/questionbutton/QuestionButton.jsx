import styled from "styled-components";

function QuestionButton({ handleOpenModal }) {

  const handleClick = () => {
    handleOpenModal();
  };

  return (
    <FloatingButton onClick={handleClick}>
      <DesktopText>질문 작성하기</DesktopText>
      <MobileText>질문 작성</MobileText>
    </FloatingButton>
  );
}

export default QuestionButton;

const FloatingButton = styled.button`
  position: fixed;
  left: 32px;
  bottom: 32px;

  width: 208px;
  height: 54px;

  padding: 12px 24px;
  border-radius: 200px;
  border: none;

  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;

  background: #542f1a;
  color: white;
  font-size: 20px;
  font-weight: 400;

  cursor: pointer;

  box-shadow: 0px 6px 12px rgba(0,0,0,0.15);
  z-index: 1000;

  &:hover {
    opacity: 0.9;
  }

  /* 모바일에서 (태블릿에선 pc화면과 동일하게 출력됩니다!) */
  @media (max-width: 768px) {
    width: 123px;
    height: 54px;

    left: 16px;
    bottom: 20px;
  }
`;

const DesktopText = styled.span`
    display: block;
    
    @media (max-width: 768px) {
        display: none;
    }
`;

const MobileText = styled.span`
    display: none;

    @media (max-width: 768px) {
        display: block;
    }
`;