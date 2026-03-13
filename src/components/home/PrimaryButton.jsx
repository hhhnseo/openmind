import styled from 'styled-components';

const PrimaryButton = (type, disabled) => {
  return (
    <Button type={type} disabled={disabled}>
      질문 받기
    </Button>
  );
};

export default PrimaryButton;

const Button = styled.button`
  background-color: var(--brown-40);
  border-radius: 8px;
  width: 100%;
  padding: 12px 138px;
  color: var(--grayScale-10);
  font-weight: 200;

  @media (max-width: 375px) {
    padding: 12px 98px;
  }
`;
