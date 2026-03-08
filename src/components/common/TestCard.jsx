import styled from "styled-components";
import ProfileImg from "../../assets/images/image-profile.svg";
import LikeButton from "./LikeButton";
import Badge from "./Badge";
import KebabMenu from "../Answer/KebabMenu";
import { useState } from "react";

export default function TestCard({ data }) {

  const [rejected, setRejected] = useState(false);
  const isAnswerd = data.answers?.length > 0;
  const badgeActive = isAnswerd || rejected;

  const handleReject = () => {
    setRejected(true);
  };

  return (
    <Container>
      
      <Header>
        <Badge $answerd={badgeActive} />
        <KebabMenu onReject={handleReject} />
      </Header>

      <Question>
        <QuestionDate>질문 • {data.date || "2주전"}</QuestionDate>
        {data.question}
      </Question>

      <Form>
        <Profile src={ProfileImg} />
        <Content>
          <UserInfo>
            <Nickname>{data.author || "아초는 고양이"}</Nickname>
            <Date>{data.date || "2주전"}</Date>
          </UserInfo>
          {rejected ? (
            <RejectedText>답변 거절</RejectedText>
          ) : (
            data.answers || "내용"
          )}
        </Content>
      </Form>

      <Footer>
        <LikeButton />
      </Footer>
    </Container>
  )
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 32px;
  background: var(--grayScale-10, #fff);
  border-radius: 16px;
  padding: 32px;
  box-shadow: var(--shadow-1pt);
`;

const Header = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
`;

const Form = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 12px;
  align-self: stretch;
`;

const Profile = styled.img`
  width: 36px;
  height: 36px;
  border-radius: 50%;
`;

const UserInfo = styled.div`
  display: flex;
  gap: 8px;
  font-size: 14px;
`;

const Nickname = styled.span`
  color: var(--grayScale-60, #000);
  font-weight: 400;
  font-size: 18px;
  line-height: 24px;
`;

const Date = styled.span`
  color: var(--grayScale-40, #818181);
  font-size: 14px;
  font-weight: 500;
  line-height: 18px;
`;

const Question = styled.div`
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  font-weight: 400;
  font-size: 18px;
`;

const QuestionDate = styled.span`
  color: var(--grayScale-40, #818181);
  font-size: 14px;
  font-weight: 500;
  line-height: 18px;
`;

const RejectedText = styled.div`
  color: var(--red-50, #B93333);
  font-size: 16px;
  font-weight: 400;
  line-height: 22px;
`

const Content = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 16px;
  color: var(--garyScale-60, #000);
  font-weight: 400;
  line-height: 22px;
  gap: 4px;
`;

const Footer = styled.div`
  display: flex;
  width: 100%;
  gap: 16px;
  font-size: 14px;
  color: #666;
  border-top: 1px solid var(--grayScale-30);
  padding-top: 24px;
`;