import styled, { css } from 'styled-components';

function StatusMessage({ children, type = 'default' }) {
  return (
    <Container
      role={type === 'loading' ? 'status' : undefined}
      aria-live="polite"
    >
      {type === 'loading' && <Spinner aria-hidden="true" />}
      <BlindText $type={type}>{children}</BlindText>
      {type !== 'loading' && <VisibleText $type={type}>{children}</VisibleText>}
    </Container>
  );
}

export default StatusMessage;

const Container = styled.div`
  min-height: 300px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;
`;

const Spinner = styled.div`
  width: 42px;
  height: 42px;
  border: 4px solid #e5e5e5;
  border-top-color: var(--brown-40);
  border-radius: 50%;
  animation: spin 0.8s linear infinite;

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;

const typeStyles = {
  default: css`
    color: var(--grayScale-60);
  `,
  error: css`
    color: var(--red-50);
  `,
};

const BlindText = styled.span`
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip-path: inset(50%);
  margin: -1px;
`;

const VisibleText = styled.div`
  font-size: 18px;
  font-weight: 500;
  ${({ $type }) => typeStyles[$type] || typeStyles.default}
`;
