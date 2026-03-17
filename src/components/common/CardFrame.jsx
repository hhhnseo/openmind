import styled from "styled-components";
import MsgIcon from "../../assets/icons/icon-messages.svg?react";
import EmptyIcon from "../../assets/images/image-empty.svg?react";
import FeedCard from "./FeedCard";
import { useEffect, useRef, useState } from "react";
import getQuestions from "../../apis/questions/getQuestions";
import deleteQuestion from "../../apis/questions/deleteQuestion";

export default function CardFrame({
  subjectID, //테스트 추가
  profile, //테스트 추가
  showMenu = true,
  showAnswerForm = false,
  deleteSignal,
}) {
  const [cardList, setCardList] = useState([]);
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [totalCount, setTotalCount] = useState(0);

  const observerRef = useRef(null);

  const isEmpty = cardList.length === 0;

  const requestedOffsetsRef = useRef(new Set());

  const fetchQuestions = async () => {
    if (loading || !hasMore) return;

    if (requestedOffsetsRef.current.has(offset)) return;

    try {
      requestedOffsetsRef.current.add(offset);
      setLoading(true);

      // const subjectData = JSON.parse(localStorage.getItem("subjectId"));
      // const subjectId = subjectData.id;
      // 위 코드는 localStorage에 저장된 내 id 가져오는 코드라 임시 주석 처리

      const targetId = subjectID ?? myId; 
      // URL id가 있으면 URL id 사용
      // 없으면 localStorage id 사용

      if (!targetId) return; // 둘 다 없으면 api 요청 스탑
      
      const res = await getQuestions(targetId, 3, offset);
      const results = res?.results ?? [];

      setTotalCount(res?.count ?? 0);

      setCardList((prev) => {
        const map = new Map();

        [...prev, ...results].forEach((item) => {
          map.set(item.id, item);
        });

        return Array.from(map.values());
      });

      setOffset((prev) => prev + 3);

      if (res?.next === null) {
        setHasMore(false);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuestions();
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      const target = entries[0];

      if (target.isIntersecting && hasMore && !loading) {
        fetchQuestions();
      }
    });

    const currentRef = observerRef.current;

    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [hasMore, loading, offset]);

  const handleDelete = async (id) => {
    try {
      await deleteQuestion(id);

      setCardList((prev) => prev.filter((q) => q.id !== id));
      setTotalCount((prev) => Math.max(prev - 1, 0));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (!deleteSignal) return;

    const deleteAll = async () => {
      try {
        for (const q of cardList) {
          await deleteQuestion(q.id);
        }

        setCardList([]);
        setTotalCount(0);
        setHasMore(false);
        requestedOffsetsRef.current.clear();
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
          {totalCount}개의 질문이 있습니다
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
        <>
          <CardList>
            {cardList.map((q) => (
              <FeedCard
                key={q.id}
                data={q}
                showMenu={showMenu}
                showAnswerForm={showAnswerForm}
                onDelete={handleDelete}
                profile={profile} //테스트
              />
            ))}
          </CardList>

          {hasMore && <Observer ref={observerRef}>{loading ? "불러오는 중..." : ""}</Observer>}
        </>
      )}
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  border-radius: 16px;
  border: 1px solid var(--brown-30, #c7bbb5);
  background: var(--brown-10, #f5f1ee);
  padding: 16px;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 16px;
  gap: 8px;
  color: var(--brown-40, #542f1a);
  font-size: 20px;
  font-weight: 400;
  line-height: 25px;

  svg path {
    fill: currentColor;
  }
`;

const CardList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const EmptyWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;
  padding: 16px 24px;
`;

const Observer = styled.div`
  height: 40px;
`;