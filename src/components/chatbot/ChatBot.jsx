import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import OpenAI from 'openai';
import styled from 'styled-components';
import messageIcon from '../../assets/icons/icon-messages.svg';
import closeIcon from '../../assets/icons/icon-close.svg';

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true,
});

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'bot',
      text: '안녕하세요! OpenMind에 대해 궁금한 점이 있으신가요?',
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef();

  const location = useLocation();
  const currentPath = location.pathname;

  const systemPrompt = `
  [역할]
  너는 'OpenMind' 프로젝트 가이드야.

  [현재 상황]
  사용자는 지금 '${currentPath}' 페이지를 보고 있어.

  [프로젝트 정보]
  - 서비스명: OpenMind (오픈마인드)
  - 핵심 가치: 누구나 질문 페이지를 만들고, 지인들과 익명으로 소통하는 플랫폼.
  - 주요 기능:
    1. 메인 페이지(/): 
      - 이름를 입력한 뒤 질문 받기 버튼 클릭 시, 본인의 질문 받는 페이지 생성 가능.
      - 질문하러 가기 버튼 클릭 시, 익명으로 질문 목록 페이지(/list)로 이동하여 ID를 가진 누군가에게
        질문 가능.

    2. 질문 목록 페이지(/list):
      - 이름를 가진 누군가의 리스트를 볼 수 있는 페이지.
      - 이름순, 최신순으로 대상 정렬 가능.
      - 로그아웃 버튼 클릭 시, 로그아웃 후 메인페이지(/)로 이동.
      - 랭킹 보러가기 버튼 클릭 시, 랭킹페이지(/ranking)으로 이동.
      - 답변하러 가기 버튼 클릭 시, 본인 이름으로 온 질문에 대한 답변 작성 가능
        로그인을 했으면 답변하기페이지(/post/{id}/answer) 로 이동
        로그인을 안했으면 메인페이지(/)로 이동.
      - 프로필 카드를 눌러 개별 피드(/post/{id})로 이동하여 익명으로 질문 작성 가능.

    3. 개별 피드 페이지(/post/{id}):
      - 다른 사람에 대해 질문을 익명으로 남길 수 있는 페이지.
      - 좋아요 버튼, 싫어요 버튼을 눌러 리액션 가능.
      - 질문 작성하기 버튼 클릭 시, 모달창이 뜨고 질문 작성 가능.

    4. 답변하기 페이지(/post/{id}/answer):
      - 본인에게 들어온 질문을 확인하고 답변 작성할 수 있는 페이지.
      - 메인 페이지(/)에서 이름을 입력하여 ID를 생성해야 들어올 수 있음.
      - 삭제하기 버튼 클릭 시, 모든 질문 삭제.
      - 미트볼 버튼 클릭 시, 해당 개별 질문에 대한 수정, 삭제 가능.
      - 답변 완료 버튼 클릭 시, 답변 저장 가능.

    5. 랭킹 페이지(/ranking):
      - 받은 질문이 제일 많은 사람과 좋아요가 가장 많은 질문을 확인할 수 있는 페이지.

  [목표]
  사용자가 서비스 이용 방법을 물어보면 위 [프로젝트 정보]를 바탕으로 친절하게 답해줘.

  [규칙]
  1. 답변은 한국어로, 상냥한 말투(~해요, ~예요)를 사용해.
  2. 한 번에 너무 긴 답변은 지양하고, 핵심 위주로 3문장 내외로 답해.
  3. 질문에 답변을 할 수 없을 때는 정중하게 사과하고 도움을 줄 수 있는 다른 방향을 제시해.
  4. 답변할 때 주소창 경로(/list, /answer 등)나 기술 용어(ID, 파라미터 등)를 **절대 직접 언급하지 마.**
  5. 대신 사용자가 화면에서 볼 수 있는 **'메뉴 이름'**이나 **'버튼 이름'**으로 순화해서 표현해.
    - (X) "/list 페이지로 가세요" -> (O) "**질문 목록**으로 이동해 보세요"
    - (X) "ID를 입력하세요" -> (O) "**이름**을 입력해 주세요"
  6. 사용자가 현재 있는 경로('${currentPath}')에 맞는 기능부터 우선적으로 안내해줘.

  [출력 형식]
  1. 문장이 끝나는 모든 마침표(.) 뒤에는 반드시 줄바꿈 문자 두 번('\\n\\n')을 추가해서 다음 문장과 줄을 나눠줘.
  2. 답변이 마무리 되는 곳은 줄바꿈 문자를 추가하지마.
  `;

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isOpen, isTyping]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!inputValue.trim() || isTyping) return;

    const userText = inputValue;
    const userMsg = { id: Date.now(), sender: 'user', text: userText };

    setMessages((prev) => [...prev, userMsg]);
    setInputValue('');
    setIsTyping(true);

    try {
      const history = messages.slice(-6).map((msg) => ({
        role: msg.sender === 'user' ? 'user' : 'assistant',
        content: msg.text,
      }));

      const response = await openai.chat.completions.create({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: systemPrompt },
          ...history,
          { role: 'user', content: userText },
        ],
        max_tokens: 150,
      });

      const botAnswer = response.choices[0].message.content;
      setMessages((prev) => [
        ...prev,
        { id: Date.now() + 1, sender: 'bot', text: botAnswer },
      ]);
    } catch (error) {
      console.error('AI 응답 에러', error);
      setMessages((prev) => [
        ...prev,
        { id: Date.now() + 1, sender: 'bot', text: '지금은 대화가 어려워요.' },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <FloatingWrapper>
      {isOpen && (
        <ChatWindow>
          <Header>
            <span>OpenMind</span>
            <CloseBtn onClick={() => setIsOpen(false)}>X</CloseBtn>
          </Header>

          <MessageList ref={scrollRef}>
            {messages.map((msg) => (
              <MessageRow key={msg.id} $isUser={msg.sender === 'user'}>
                <Bubble $isUser={msg.sender === 'user'}>{msg.text}</Bubble>
              </MessageRow>
            ))}
            {isTyping && (
              <MessageRow $isUser={false}>
                <TypingBubble>
                  <span>●</span>
                  <span>●</span>
                  <span>●</span>
                  <em style={{ marginLeft: '8px', fontStyle: 'normal' }}>
                    OpenMind 매니저가 생각 중...
                  </em>
                </TypingBubble>
              </MessageRow>
            )}
          </MessageList>

          <InputArea onSubmit={handleSend}>
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder={isTyping ? '답변 대기 중...' : '질문하기...'}
              disabled={isTyping}
            />
          </InputArea>
        </ChatWindow>
      )}

      <ToggleButton onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? (
          <img src={closeIcon} alt="챗봇 닫기" />
        ) : (
          <img src={messageIcon} alt="챗봇 열기" />
        )}
      </ToggleButton>
    </FloatingWrapper>
  );
};

// --- Styled Components ---

const FloatingWrapper = styled.div`
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 1100;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 10px;
`;

const ToggleButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 60px;
  height: 60px;
  border-radius: 30px;
  background-color: var(--brown-10);
  color: white;
  font-size: 30px;
  border: 1px solid var(--brown-40);
  cursor: pointer;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  transition: transform 0.2s;
  &:hover {
    transform: scale(1.05);
  }
`;

const ChatWindow = styled.div`
  width: 320px;
  height: 450px;
  background-color: var(--grayScale-10);
  border-radius: 15px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  border: 1px solid #eee;
`;

const Header = styled.div`
  background-color: var(--brown-10);
  color: var(--brown-40);
  padding: 12px 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: bold;
`;

const CloseBtn = styled.button`
  background: none;
  border: none;
  color: var(--grayScale-40);
  cursor: pointer;
`;

const MessageList = styled.div`
  flex: 1;
  padding: 15px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 10px;
  background-color: var(--grayScale-20);
`;

const MessageRow = styled.div`
  display: flex;
  justify-content: ${(props) => (props.$isUser ? 'flex-end' : 'flex-start')};
`;

const Bubble = styled.div`
  max-width: 80%;
  padding: 8px 12px;
  font-size: 14px;
  white-space: pre-wrap;
  word-break: break-all;

  border-radius: ${(props) =>
    props.$isUser ? '15px 15px 0 15px' : '15px 15px 15px 0'};
  background-color: ${(props) => (props.$isUser ? 'var(--brown-30)' : '#eee')};
  color: var(--grayScale-50);
`;

const TypingBubble = styled.div`
  background-color: #eee;
  color: #888;
  padding: 8px 12px;
  border-radius: 15px 15px 15px 0;
  font-size: 13px;
  display: flex;
  align-items: center;

  span {
    font-size: 10px;
    margin: 0 1px;
    animation: blink 1s infinite;
  }
  span:nth-child(2) {
    animation-delay: 0.2s;
  }
  span:nth-child(3) {
    animation-delay: 0.4s;
  }

  @keyframes blink {
    0% {
      opacity: 0.2;
    }
    50% {
      opacity: 1;
    }
    100% {
      opacity: 0.2;
    }
  }
`;

const InputArea = styled.form`
  padding: 10px;
  border-top: 1px solid #eee;
`;

const Input = styled.input`
  width: 100%;
  padding: 8px 12px;
  border-radius: 20px;
  border: 1px solid #ddd;
  outline: none;
  box-sizing: border-box;
  &:focus {
    border-color: var(--brown-40);
  }
`;

export default Chatbot;
