import styled from 'styled-components';
import Button from '../components/common/Button';
import Logo from '../components/common/Logo';
import UserCard from '../components/common/UserCard';
import LikeButton from '../components/common/LikeButton';

function Ranking() {
  const bestUser = [
    {
      id: 1,
      question: '안녕하세요',
      date: '2주전',
    },
    {
      id: 2,
      question:
        '유튜브 재생시 자동으로 음소거가 되어있는데 이거 푸는방법 아실까요? 처음 메인화면에서 구독하고 있는 영상들 클릭하고 재생하려고 하면 처음부터 음소거가 자동으로 설정 되어있습니다. 매번 음소거 버튼을 눌러서 음소거를 풀어야 하는데 이거 왜이러는지 아실까요?',
      date: '2주전',
    },
    {
      id: 3,
      question:
        '갤럭시 S26 프라이버시 화면, 어떻게 설정하나요? 갤럭시 S26 울트라에 새로 추가된 프라이버시 화면 기능, 정말 유용해 보이는데요. 이 기능을 활성화하려면 어떻게 해야 하는지 궁금합니다. 설정 메뉴 어디에 있는지, 혹은 특정 앱을 지정해서 그 앱에서만 프라이버시를 강화할 수 있는지 알고 싶어요. 혹시 이 기능을 사용하면서 주의해야 할 점이나 팁이 있다면 함께 알려주세요!',
      date: '2주전',
    },
  ];

  return (
    <Container>
      <Header>
        <Logo size="small" />
        <Button $variant="outline">질문하러 가기</Button>
      </Header>
      <RankingWrap>
        <div>
          <Title>인기 질문자 순위</Title>
          <BestUser>
            <UserCard />
            <UserCard />
            <UserCard />
          </BestUser>
        </div>

        <div>
          <Title>인기 질문 순위</Title>
          <BestCard>
            {bestUser.map((item, ranking) => (
              <QuestionList>
                <div key={item.id}>
                  <ItemNum>👍 BEST {ranking + 1}</ItemNum>
                  <ItemContent>{item.question}</ItemContent>
                </div>
                <Count>
                  <LikeButton />
                </Count>
              </QuestionList>
            ))}
          </BestCard>
        </div>
      </RankingWrap>
    </Container>
  );
}

export default Ranking;

const Container = styled.div`
  max-width: 934px;
  margin: 0 auto;

  @media only screen and (max-width: 1200px) {
    width: 100%;
    padding: 0 32px;
  }

  @media only screen and (max-width: 375px) {
    width: 100%;
    padding: 0 24px;
  }
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 40px 0 46px;
  @media only screen and (max-width: 375px) {
    flex-direction: column;
  }
`;

const RankingWrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 40px;
`;

const Title = styled.h3`
  font-size: 20px;
  font-weight: 500;
  margin-bottom: 16px;
`;

const BestUser = styled.div`
  display: flex;
  gap: 20px;

  > div {
    max-width: initial;
  }
  > div:first-child > a > div > img {
    border:3px solid #FFBB00;
  }
    > div:nth-child(2n) > a > div > img {
    border:3px solid #cccccc;
  }
    > div:nth-child(3n) > a > div > img {
    border:3px solid #d3a69a;
  }

  > div:first-child > a > div > span:before {
    content:'🥇';
  }

  @media only screen and (max-width: 375px) {
    
      flex-direction: column;

`;

const BestCard = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 16px;
  background: var(--brown-10);
  border: 1px solid var(--brown-30);
  border-radius: 16px;
  padding: 16px;
`;

const QuestionList = styled.div`
  background: var(--grayScale-10);
  box-shadow: var(--shadow-1pt);
  padding: 20px;
  border-radius: 16px;
`;

const ItemNum = styled.div`
  color: #e6a900;
  font-weight: 500;
  font-size: 16px;
`;

const ItemContent = styled.div`
  margin-top: 8px;
  font-size: 18px;
  line-height: 24px;
  // text-overflow: ellipsis;
  // overflow: hidden;
  // display: -webkit-box;
  // -webkit-box-orient: vertical;
  // -webkit-line-clamp: 3;
  &:hover {
    text-decoration: underline;
    cursor: pointer;
  }
`;

const Count = styled.div`
  border-top: 1px solid var(--grayScale-30);
  margin-top: 16px;
  padding: 14px 0 0 0;
`;
