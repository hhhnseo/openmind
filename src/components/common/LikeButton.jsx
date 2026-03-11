import styled from "styled-components";
import ThumbUp from "../../assets/icons/icon-thumbs-up.svg?react";
import ThumbDown from "../../assets/icons/icon-thumbs-down.svg?react";
import { useState } from "react";
import { postReaction } from "../../apis/questions/postReaction";

export default function LikeButton({
  questionId,
  initialLike = 0,
  initialDislike = 0
}) {
  const [likeCount, setLikeCount] = useState(initialLike);
  const [dislikeCount, setDislikeCount] = useState(initialDislike);
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleLike = async () => {
    if (loading || selected === "like") return;

    try {
      setLoading(true);

      await postReaction(questionId, "like");

      setLikeCount((prev) => prev + 1);
      setSelected("like");

    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDislike = async () => {
    if (loading || selected === "dislike") return;

    try {
      setLoading(true);

      await postReaction(questionId, "dislike");

      setDislikeCount((prev) => prev + 1);
      setSelected("dislike");

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
      >
        <Icon>
          <ThumbUp />
        </Icon>
        좋아요 {likeCount}
      </Button>

      <DislikeButton
        onClick={handleDislike}
        $active={selected === "dislike"}
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

  &:hover {
    ${({ $active }) =>
      !$active &&
      `
        color: var(--grayScale-60);
        svg {
          color: var(--grayScale-60);
        }
      `}
  }
`;

const DislikeButton = styled(Button)`
  ${({ $active }) =>
    $active &&
    `
      color: var(--blue-50);
      svg {
        color: var(--blue-50);
      }
    `}

  &:hover {
    ${({ $active }) =>
      !$active &&
      `
        color: var(--grayScale-60);
        svg {
          color: var(--grayScale-60);
        }
      `}
  }
`;

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