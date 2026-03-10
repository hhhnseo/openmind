import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Logo from '../components/common/Logo';
import Button from '../components/common/Button';
import Dropdown from '../components/questionlist/Dropdown';
import UserCard from '../components/common/UserCard';
import Pagination from '../components/questionlist/Pagination';

const TABLET = '950px';
const MOBILE = '768px';

const userList = [
  { id: 1, name: '아초는 고양이1', count: 1 },
  { id: 2, name: '아초는 고양이2', count: 2 },
  { id: 3, name: '아초는 고양이3', count: 3 },
  { id: 4, name: '아초는 고양이4아초는 고양이4', count: 4 },
  { id: 5, name: '아초는 고양이5', count: 5 },
  { id: 6, name: '아초는 고양이6', count: 60 },
  { id: 7, name: '아초는 고양이7', count: 700 },
  { id: 8, name: '아초는 고양이8', count: 8000 },
];

function QuestionList() {
  return (
    <Page>
      <Inner>
        <HeaderSection>
          <LogoArea>
            <LogoLink to="/">
              <Logo size="small" />
            </LogoLink>
          </LogoArea>
          <ButtonArea>
            <Button as={Link} to="/answer" variant="outline">
              답변하러 가기
            </Button>
            <Button as={Link} to="/ranking" variant="outline">
              랭킹보러 가기
            </Button>
          </ButtonArea>
        </HeaderSection>

        <ContentSection>
          <TitleArea>
            <Title>누구에게 질문할까요?</Title>
            <Dropdown />
          </TitleArea>
          <CardArea>
            {userList.map((user) => (
              <UserCard
                key={user.id}
                id={user.id}
                name={user.name}
                count={user.count}
                responsive
              />
            ))}
          </CardArea>
          <Pagination responsive />
        </ContentSection>
      </Inner>
    </Page>
  );
}

export default QuestionList;

const Page = styled.div`
  padding: 40px 0 100px;
  display: flex;
  align-items: center;
  width: 100%;
  min-width: 360px;
  min-height: 100vh;
  background-color: var(--grayScale-20);

  @media (max-width: ${MOBILE}) {
    padding: 40px 0 50px;
  }
`;
const Inner = styled.div`
  padding: 0 24px;
  max-width: 988px;
  margin: 0 auto;
`;
const HeaderSection = styled.div`
  margin-bottom: 40px;
  display: flex;
  justify-content: space-between;

  @media (max-width: ${MOBILE}) {
    flex-direction: column;
    align-items: center;
    gap: 20px;
  }
`;
const LogoArea = styled.div``;
const LogoLink = styled(Link)`
  display: block;
`;
const ButtonArea = styled.div`
  margin-top: 5px;
  display: flex;
  flex-direction: column;
  gap: 10px;

  @media (max-width: ${MOBILE}) {
    gap: 5px;

    a {
      padding: 0px 12px;
      font-size: 14px;
      height: 34px;
    }
  }
`;
const ContentSection = styled.div``;
const TitleArea = styled.div`
  margin-bottom: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;

  @media (max-width: ${MOBILE}) {
    margin-bottom: 18px;
    flex-direction: row;
    justify-content: space-between;
  }
`;
const Title = styled.h1`
  font-size: 40px;
  font-weight: 400;

  @media (max-width: ${MOBILE}) {
    font-size: 24px;
  }
`;
const CardArea = styled.div`
  margin-bottom: 40px;
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 20px;

  @media (max-width: ${TABLET}) {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
  @media (max-width: ${MOBILE}) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 16px;
  }
`;
