import { useEffect, useState } from 'react';
import styled from 'styled-components';
import InputTextArea from '../common/InputTextArea';

const AnswerForm = ({
  onSubmit,
  defaultValue = '',
  type = 'answer',
}) => {
  const [text, setText] = useState(defaultValue);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setText(defaultValue);
  }, [defaultValue]);

  const isQuestion = type === 'question';
  const placeholder = `${isQuestion ? '질문' : '답변'}을 입력해주세요`;
  const buttonText = isQuestion ? '질문 보내기' : '답변 완료';
  const isDisabled = !text.trim() || loading;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isDisabled) return;

    try {
      setLoading(true);
      await onSubmit?.(text);
      setText('');
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <FormContainer onSubmit={handleSubmit}>
      <InputTextArea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder={placeholder}
      />

      <SubmitButton type="submit" disabled={isDisabled}>
        {loading ? '처리 중...' : buttonText}
      </SubmitButton>
    </FormContainer>
  );
};

const FormContainer = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
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
  border: none;
  background: ${({ disabled }) =>
    disabled ? 'var(--brown-30)' : 'var(--brown-40)'};
  color: var(--grayScale-10);
  cursor: ${({ disabled }) => (disabled ? 'default' : 'pointer')};
`;

export default AnswerForm;