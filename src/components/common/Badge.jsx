import styled from "styled-components";

const Badge = styled.div`
  display: inline-flex;
  padding: 4px 12px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  border-radius: 8px;
  background: var(--Grayscale-10, #FFF);
  border: 1px solid
    ${({ $status }) => {
      if ($status === "rejected") return "var(--grayScale-40)";
      if ($status === "answered") return "var(--brown-40)";
      return "var(--grayScale-40)";
    }};
  color: ${({ $status }) => {
    if ($status === "rejected") return "var(--grayScale-40)";
    if ($status === "answered") return "var(--brown-40)";
    return "var(--grayScale-40)";
  }};
  font-feature-settings: 'liga' off, 'clig' off;
  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 18px; /* 128.571% */

  &::before {
    content: "${({ $status }) => {
      if ($status === "rejected") return "답변 거절";
      if ($status === "answered") return "답변 완료";
      return "미답변";
    }}";
  }
`;

export default Badge;