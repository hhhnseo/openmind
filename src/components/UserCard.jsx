// /src/components/UserCard.jsx
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import MessagesIcon from '../assets/icons/icon-messages.svg?react';
import profileImage from '../assets/images/image-profile.svg';

const SIZE = {
  large: {
    cardHeight: '187px',
    padding: '20px',
    image: '60px',
    nameFont: '20px',
    labelFont: '16px',
    icon: '18px',
    countFont: '16px',
    hoverScale: 1.03,
  },
  small: {
    cardHeight: '168px',
    padding: '16px',
    image: '48px',
    nameFont: '18px',
    labelFont: '14px',
    icon: '16px',
    countFont: '14px',
    hoverScale: 1,
  },
};

const getSize = (size) => SIZE[size] ?? SIZE.large;

const ProfileCard = styled.div`
  width: 100%;
  max-width: 220px;
  height: ${({ $size }) => getSize($size).cardHeight};
  overflow: hidden;
  border: 1px solid var(--grayScale-40);
  border-radius: 16px;
`;

const CardLink = styled(Link)`
  padding: ${({ $size }) => getSize($size).padding};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  height: 100%;

  transition: transform 0.3s ease-in-out;

  &:hover {
    transform: scale(${({ $size }) => getSize($size).hoverScale});
  }
`;

const ProfileBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const ProfileImage = styled.img`
  width: ${({ $size }) => getSize($size).image};
  height: ${({ $size }) => getSize($size).image};
  object-fit: cover;
  border-radius: 50%;
  background-color: var(--grayScale-30);
`;

const ProfileName = styled.span`
  font-size: ${({ $size }) => getSize($size).nameFont};
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

  font-size: ${({ $size }) => getSize($size).labelFont};
  color: var(--grayScale-40);

  svg {
    width: ${({ $size }) => getSize($size).icon};
    height: ${({ $size }) => getSize($size).icon};

    path {
      fill: var(--grayScale-40);
    }
  }
`;

const CountBox = styled.div`
  font-size: ${({ $size }) => getSize($size).countFont};
  color: var(--grayScale-40);
`;

const Count = styled.span``;

function UserCard({
  size = 'large',
  id = 1,
  name = '아초는고양이',
  count = 9,
  profileSrc = profileImage,
}) {
  return (
    <ProfileCard $size={size}>
      <CardLink
        $size={size}
        to={`/post/${id}/answer`}
        aria-label={`${name}님의 질문 답변 페이지로 이동`}
      >
        <ProfileBox $size={size}>
          <ProfileImage
            $size={size}
            src={profileSrc}
            alt={`${name} 프로필 이미지`}
          />
          <ProfileName $size={size}>{name}</ProfileName>
        </ProfileBox>

        <QuestionInfo>
          <QuestionLabel $size={size}>
            <MessagesIcon />
            받은 질문
          </QuestionLabel>

          <CountBox $size={size}>
            <Count>{count}</Count>개
          </CountBox>
        </QuestionInfo>
      </CardLink>
    </ProfileCard>
  );
}

export default UserCard;
