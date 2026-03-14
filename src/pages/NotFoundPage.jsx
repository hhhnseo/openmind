import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Button from '../components/common/Button';

function NotFoundPage() {
  return (
    <Container>
      <Info>
        <h2>PAGE NOT FOUND😅</h2>
        <Notice>
          죄송합니다. 페이지를 찾을 수 없습니다.
          <br />
          존재하지않는 주소를 입력하셨거나
          <br />
          요청하신 페이지의 주소가 변경, 삭제되어 찾을 수 없습니다.
        </Notice>
      </Info>
      <Link to="/">
        <Button>홈으로 가기</Button>
      </Link>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  gap: 50px;
`;

const Info = styled.div`
  text-align: center;

  > h2 {
    font-size: 50px;
  }
`;

const Notice = styled.p`
  margin-top: 20px;
  line-height: 1.5em;
`;

export default NotFoundPage;
