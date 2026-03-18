import { useNavigate, useParams, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import heroImg from '../../assets/images/image-hero.svg';
import Logo from '../common/Logo';
import profileImg from '../../assets/images/image-profile.svg';
import ShareButton from '../profile/ShareButton';
import QuestionButton from '../questionbutton/QuestionButton';

const Layout = ({ children, profile, handleOpenModal }) => {
  const navigate = useNavigate();

  const { id } = useParams();
  const location = useLocation();

  const isAnswerPage = location.pathname.endsWith('/answer');

  return (
    <Final>
      <BannerSection>
        <HeroImg src={heroImg} alt="배너 배경" />
        <ProfileOverlay>
          <button
            onClick={() => {
              const subjectId = localStorage.getItem('subjectId');

              if (subjectId) {
                navigate('/list');
              } else {
                navigate('/');
              }
            }}
          >
            <Logo size="small" />
          </button>
          <ProfileImage
            src={profile?.imageSource || profileImg}
            alt="프로필 이미지"
            onClick={() => {
              if (!id) return;
              const target = `/post/${id}`;

              if (location.pathname !== target) {
                navigate(target);
              }
            }}
          />

          <Username>{profile?.name || '사용자'}</Username>
          <SNSContainer>
            <ShareButton />
          </SNSContainer>
        </ProfileOverlay>
      </BannerSection>
      <MainContent>
        <QuestionContainer>{children}</QuestionContainer>
      </MainContent>
      {!isAnswerPage && (
        <>
          <QuestionButton handleOpenModal={handleOpenModal} />
        </>
      )}
    </Final>
  );
};

export default Layout;

const Final = styled.div`
  width: 100%;
  min-height: 100vh;
  background-color: #f9f9f9;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-x: hidden;
`;

const BannerSection = styled.div`
  position: relative;
  width: 100%;
  height: 234px;
  display: flex;
  justify-content: center;
`;

const HeroImg = styled.img`
  width: 1400px;
  height: 100%;
  object-fit: cover;
  flex-shrink: 0;
`;

const ProfileOverlay = styled.div`
  position: absolute;
  top: 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
`;

const ProfileImage = styled.img`
  width: 136px;
  height: 136px;
  border-radius: 50%;
  cursor: pointer;
  transition: transform 0.2s;

  &:hover {
    transform: scale(1.05);
  }
`;

const Username = styled.h1`
  color: var(--grayScale-60);
  font-size: 32px;
  font-weight: 400;
`;

const SNSContainer = styled.div`
  display: flex;
  gap: 8px;
`;

const Img = styled.img`
  width: 40px;
  height: 40px;
`;

const MainContent = styled.main`
  width: 100%;
  max-width: 700px;
  margin-top: 189px;
  padding: 0 32px;

  @media (max-width: 375px) {
    padding: 0 24px;
  }
`;

const QuestionContainer = styled.div`
  width: 100%;
  margin-bottom: 50px;
`;
