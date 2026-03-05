import styled, { css } from "styled-components";

const BUTTON_STYLE = {
  primary: css`
    background: #5a331a;
    color: white;

    &:hover {
      background: #542f1a;
      box-shadow: 0 0 0 2px #341909 inset;
    }

    &:active {
      background: #341909;
    }

    &:disabled {
      opacity: 0.5;
      cursor: default;
      pointer-events: none;
    }
  `,
  outline: css`
    background: #f5f1ee;
    color: #5a331a;
    box-shadow: 0 0 0 1px #542f1a inset;
    &:hover {
      background: #f5f1ee;
      box-shadow: 0 0 0 2px #542f1a inset;
    }

    &:active {
      background: #e4d5c9;
    }
    &:disabled {
      opacity: 0.5;
      background: #f5f1ee;
      cursor: default;
      pointer-events: none;
    }
    &::after {
      filter: invert(1);
    }
  `,
};

const Button = styled.button`
  font-family: "pretendard";
  border: none;
  padding: ${({ small }) => (small ? "8px 12px" : "12px 24px")};
  font-size: ${({ small }) => (small ? "14px" : "16px")};
  cursor: pointer;

  ${({ type }) => BUTTON_STYLE[type]}

  border-radius: ${({ round }) => (round ? "200px" : "8px")};
  ${({ arrow }) =>
    arrow &&
    css`
      &::after {
        content: "";
        display: inline-block;
        vertical-align: middle;
        width: 18px;
        height: 18px;
        margin-left: 8px;
        background-image: url("src/assets/arrowRight.svg");
      }
    `}
  ${({ large }) =>
    large &&
    css`
      padding: 14.5px 49.5px;
      font-size: 20px;
      box-shadow: 0 4px 5px 0px #949494;
    `}
`;

export default Button;
