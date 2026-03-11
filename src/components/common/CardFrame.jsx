import styled from "styled-components";
import MsgIcon from "../../assets/icons/icon-messages.svg?react";
import EmptyIcon from "../../assets/images/image-empty.svg?react";
import FeedCard from "./FeedCard";
import { useEffect, useState } from "react";
import getQuestions from "../../apis/questions/getQuestions";
import deleteQuestion from "../../apis/questions/deleteQuestion";

export default function CardFrame({
  showMenu = true,
  showAnswerForm = false,
  deleteSignal
}) {

  const [cardList, setCardList] = useState([]);
  const [isDeleting, setIsDeleting] = useState(false);

  const count = cardList.length;
  const isEmpty = cardList.length === 0;

  useEffect(() => {

    if (isDeleting) return;

    const fetchQuestions = async () => {

      try {

        const subjectId = localStorage.getItem("subjectId");

        const res = await getQuestions(subjectId);

        const results = res?.results ?? [];

        const converted = results.map((q) => ({
          id: q.id,
          question: q.content,
          author: "익명",
          date: q.createdAt,
          like: q.like,
          dislike: q.dislike,
          answers: q.answer ? [q.answer] : []
        }));

        setCardList(converted);

      } catch (error) {
        console.error(error);
      }
    };

    fetchQuestions();
  }, [isDeleting]);

  const handleDelete = async (id) => {
    try {
      await deleteQuestion(id);

      setCardList((prev) =>
        prev.filter((q) => q.id !== id)
      );
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {

    if (!deleteSignal) return;

    const deleteAll = async () => {

      try {

        setIsDeleting(true);
        for (const q of cardList) {
          await deleteQuestion(q.id);
        }
        
        setCardList([]);

      } catch (error) {
        console.error(error);
      }
    };
    deleteAll();
    
  }, [deleteSignal]);

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
          {cardList.map((q) => (
            <FeedCard
              key={q.id}
              data={q}
              showMenu={showMenu}
              showAnswerForm={showAnswerForm}
              onDelete={handleDelete}
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