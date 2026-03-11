import { useState } from 'react';
import styled from 'styled-components';
import InputTextArea from '../common/InputTextArea';

const AnswerForm = ({
  onSubmit,
  defaultValue = "",
  type = "answer",
}) => {
  const [text, setText] = useState(defaultValue);

  const isQuestion = type === "question";

  const placeholder = `${isQuestion ? "질문" : "답변"}을 입력해주세요`;
  const buttonText = isQuestion ? "질문 보내기" : "답변 완료";

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!text.trim()) return;

    onSubmit?.(text);
    setText("");
  };

  return (
    <FormContainer onSubmit={handleSubmit}>
      <InputTextArea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder={placeholder}
      />

      <SubmitButton type="submit">
        {buttonText}
      </SubmitButton>
    </FormContainer>
  )
}

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 490px;
  margin: 0 auto;
  gap: 8px;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 22px;
`;

const SubmitButton = styled.button`
  display: flex;
  width: 100%;
  height: 46px;
  padding: 12px 24px;
  justify-content: center;
  align-items: center;
  gap: 8px;
  align-self: stretch;
  border-radius: 8px;
  background: ${({ disabled }) =>
    disabled ? "var(--brown-30)" : "var(--brown-40)"};
  color: var(--grayScale-10);
  cursor: ${({ disabled }) =>
    disabled ? "default" : "pointer"};
`;

export default AnswerForm;