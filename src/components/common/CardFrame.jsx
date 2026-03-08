import styled from "styled-components";
import MsgIcon from "../../assets/icons/icon-messages.svg?react";
import EmptyIcon from "../../assets/images/image-empty.svg?react";
import TestCard from "./TestCard";

export default function CardFrame({
  questions = [],
  showMenu = true,
  showAnswerForm = false
}) {
  const count = questions?.length ?? 0;
  const isEmpty = !questions || questions.length === 0;

  return (
    <Container>
      {!isEmpty && (
        <Header>
          <MsgIcon />
          {count}개의 질문이 있습니다
        </Header>
      )}

      {isEmpty ? (
        <EmptyWrapper>
          <Header>
            <MsgIcon />
            아직 질문이 없습니다
          </Header>
          <EmptyIcon />
        </EmptyWrapper>
      ) : (
        <CardList>
          {questions.map((q) => (
            <TestCard
              key={q.id}
              data={q}
              showMenu={showMenu}
              showAnswerForm={showAnswerForm}
            />
          ))}
        </CardList>
      )}
    </Container>
  )
}

const Container = styled.div`
  width: 100%;
  border-radius: 16px;
  border: 1px solid var(--brown-30, #C7BBB5);
  background: var(--brown-10, #F5F1EE);
  padding: 16px;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 16px;
  gap: 8px;
  color: var(--brown-40, #542F1A);
  font-size: 20px;
  font-weight: 400;
  line-height: 25px;
  svg path {
    fill: currentColor;
  }
`

const CardList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`

const EmptyWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;
  padding: 16px 24px;
`;