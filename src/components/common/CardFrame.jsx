import styled from 'styled-components';
import MsgIcon from '../../assets/icons/icon-messages.svg?react';
import EmptyIcon from '../../assets/images/image-empty.svg?react';
import FeedCard from './FeedCard';
import { useEffect, useRef, useState, useCallback } from 'react'; // useCallback 추가
import getQuestions from '../../apis/questions/getQuestions';
import deleteQuestion from '../../apis/questions/deleteQuestion';

export default function CardFrame({
  subjectID,
  profile,
  showMenu = true,
  showAnswerForm = false,
  deleteSignal,
  refreshSignal,
  setQuestionCount,
}) {
  const [cardList, setCardList] = useState([]);
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [totalCount, setTotalCount] = useState(0);

  const observerRef = useRef(null);
  const requestedOffsetsRef = useRef(new Set());
  const isEmpty = cardList.length === 0;

  const fetchQuestions = useCallback(
    async (isRefresh = false) => {
      if (!isRefresh && (loading || !hasMore)) return;

      const currentOffset = isRefresh ? 0 : offset;

      if (requestedOffsetsRef.current.has(currentOffset)) return;

      try {
        setLoading(true);
        requestedOffsetsRef.current.add(currentOffset);

        if (!subjectID) return;

        const res = await getQuestions(subjectID, 3, currentOffset);
        const results = res?.results ?? [];

        setTotalCount(res?.count ?? 0);

        setCardList((prev) => {
          if (isRefresh) return results;

          const map = new Map();
          [...prev, ...results].forEach((item) => map.set(item.id, item));
          return Array.from(map.values());
        });

        setOffset(currentOffset + 3);

        if (res?.next === null) {
          setHasMore(false);
        } else {
          setHasMore(true);
        }
      } catch (error) {
        console.error('데이터 로드 실패:', error);
      } finally {
        setLoading(false);
      }
    },
    [loading, hasMore, offset, subjectID]
  );

  useEffect(() => {
    const handleRefresh = async () => {
      requestedOffsetsRef.current.clear();
      setHasMore(true);
      await fetchQuestions(true);
    };

    handleRefresh();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refreshSignal, subjectID]);

  useEffect(() => {
    if (setQuestionCount) {
      setQuestionCount(totalCount);
    }
  }, [totalCount, setQuestionCount]);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      const target = entries[0];
      if (target.isIntersecting && hasMore && !loading) {
        fetchQuestions();
      }
    });

    const currentRef = observerRef.current;
    if (currentRef) observer.observe(currentRef);

    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, [fetchQuestions, hasMore, loading]);

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
  }, [deleteSignal, cardList]);

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
                profile={profile}
              />
            ))}
          </CardList>

          {hasMore && (
            <Observer ref={observerRef}>
              {loading ? '불러오는 중...' : ''}
            </Observer>
          )}
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
