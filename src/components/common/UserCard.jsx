// /src/components/UserCard.jsx
import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';
import MessagesIcon from '../../assets/icons/icon-messages.svg?react';
import profileImage from '../../assets/images/image-profile.svg';

const MOBILE = '768px';

const SIZE = {
  large: css`
    --card-height: 187px;
    --padding: 20px;
    --image: 60px;
    --name-font: 20px;
    --label-font: 16px;
    --icon: 18px;
    --count-font: 16px;
  `,
  small: css`
    --card-height: 168px;
    --padding: 16px;
    --image: 48px;
    --name-font: 18px;
    --label-font: 14px;
    --icon: 16px;
    --count-font: 14px;
  `,
};

function UserCard({
  size = 'large',
  responsive = false,
  id = 1,
  name = '아초는고양이',
  count = 9,
  profileSrc = profileImage,
}) {
  return (
    <ProfileCard $size={size} $responsive={responsive}>
      <CardLink
        to={`/post/${id}/answer`}
        aria-label={`${name}님의 질문 답변 페이지로 이동`}
      >
        <ProfileBox>
          <ProfileImage src={profileSrc} alt={`${name} 프로필 이미지`} />
          <ProfileName>{name}</ProfileName>
        </ProfileBox>

        <QuestionInfo>
          <QuestionLabel>
            <MessagesIcon />
            받은 질문
          </QuestionLabel>

          <CountBox>
            <Count>{count}</Count>개
          </CountBox>
        </QuestionInfo>
      </CardLink>
    </ProfileCard>
  );
}

const ProfileCard = styled.div`
  ${({ $size }) => SIZE[$size] ?? SIZE.large};

  ${({ $responsive }) =>
    $responsive &&
    css`
      @media (max-width: ${MOBILE}) {
        ${SIZE.small}
      }
    `}

  width: 100%;
  min-width: 155px;
  height: var(--card-height);
  overflow: hidden;

  border: 1px solid var(--grayScale-40);
  border-radius: 16px;
`;

const CardLink = styled(Link)`
  padding: var(--padding);

  display: flex;
  flex-direction: column;
  justify-content: space-between;

  width: 100%;
  height: 100%;
`;

const ProfileBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const ProfileImage = styled.img`
  width: var(--image);
  height: var(--image);

  object-fit: cover;
  border-radius: 50%;

  background-color: var(--grayScale-30);
`;

const ProfileName = styled.span`
  font-size: var(--name-font);
  line-height: 1.25;

  color: var(--grayScale-60);

  max-width: 100%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const QuestionInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const QuestionLabel = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;

  font-size: var(--label-font);
  color: var(--grayScale-40);

  svg {
    width: var(--icon);
    height: var(--icon);

    path {
      fill: var(--grayScale-40);
    }
  }
`;

const CountBox = styled.div`
  font-size: var(--count-font);
  color: var(--grayScale-40);
`;

const Count = styled.span``;

export default UserCard;
