import styled from "styled-components";
import ThumbUp from "../../assets/icons/icon-thumbs-up.svg?react";
import ThumbDown from "../../assets/icons/icon-thumbs-down.svg?react";
import { useEffect, useState } from "react";
import { postReaction } from "../../apis/questions/postReaction";

export default function LikeButton({
  questionId,
  initialLike = 0,
  initialDislike = 0
}) {
  const storageKey = `reaction-${questionId}`;

  const [likeCount, setLikeCount] = useState(initialLike);
  const [dislikeCount, setDislikeCount] = useState(initialDislike);
  const [selected, setSelected] = useState(null); // null | "like" | "dislike"
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const savedReaction = localStorage.getItem(storageKey);

    if (savedReaction === "like" || savedReaction === "dislike") {
      setSelected(savedReaction);
    }
  }, [storageKey]);

  const handleLike = async () => {
    
    if (loading || selected !== null) return;

    try {
      setLoading(true);

      await postReaction(questionId, "like");

      setLikeCount((prev) => prev + 1);
      setSelected("like");
      localStorage.setItem(storageKey, "like");
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDislike = async () => {
    
    if (loading || selected !== null) return;

    try {
      setLoading(true);

      await postReaction(questionId, "dislike");

      setDislikeCount((prev) => prev + 1);
      setSelected("dislike");
      localStorage.setItem(storageKey, "dislike");
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Wrapper>
      <Button
        onClick={handleLike}
        $active={selected === "like"}
        disabled={loading || selected !== null}
      >
        <Icon>
          <ThumbUp />
        </Icon>
        좋아요 {likeCount}
      </Button>

      <DislikeButton
        onClick={handleDislike}
        $active={selected === "dislike"}
        disabled={loading || selected !== null}
      >
        <Icon>
          <ThumbDown />
        </Icon>
        싫어요 {dislikeCount}
      </DislikeButton>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  gap: 11px;
`;

const Button = styled.button`
  display: flex;
  align-items: center;
  gap: 6px;

  background: white;
  cursor: pointer;
  color: var(--grayScale-40);

  svg {
    width: 16px;
    height: 16px;
  }

  ${({ $active }) =>
    $active &&
    `
      color: var(--blue-50);
      svg {
        color: var(--blue-50);
      }
    `}

  &:disabled {
    cursor: default;
  }

  &:hover {
    ${({ $active, disabled }) =>
      !$active && !disabled &&
      `
        color: var(--grayScale-60);
        svg {
          color: var(--grayScale-60);
        }
      `}
  }
`;

const DislikeButton = styled(Button)``;

const Icon = styled.span`
  display: flex;

  svg path {
    fill: currentColor;
  }

  svg {
    width: 16px;
    height: 16px;
  }
`;