import { useEffect, useState, useRef } from "react"; // useRef 추가
import styled from "styled-components";
import LinkIcon from "../../assets/icons/icon-link.svg";
import KakaoIcon from "../../assets/icons/icon-kakaotalk.svg";
import FacebookIcon from "../../assets/icons/icon-facebook.svg";

function ShareButton() {
  const [toast, setToast] = useState(false);
  const kakaoLoaded = useRef(false); // SDK 로드 완료 여부
  const url = window.location.href;

  // 카카오 SDK
  useEffect(() => {
    const loadKakaoSDK = () => {
      const script = document.createElement("script");
      script.src = "https://developers.kakao.com/sdk/js/kakao.js";
      script.async = true;

      script.onload = () => {
        if (window.Kakao && !window.Kakao.isInitialized()) {
          window.Kakao.init(import.meta.env.VITE_KAKAO_KEY);
          //위의 키값은 env 참고, 추후 공유 예정
          console.log("카카오 sdk 초기화 완료");
        }
        kakaoLoaded.current = true;
      };
      document.body.appendChild(script);
    };

    if (!window.Kakao) loadKakaoSDK();
    else if (!window.Kakao.isInitialized()) {
      window.Kakao.init(import.meta.env.VITE_KAKAO_KEY);
      kakaoLoaded.current = true;
    } else {
      kakaoLoaded.current = true;
    }
  }, []);

  // 링크 복사
  const handleCopyLink = async () => {
    await navigator.clipboard.writeText(url);
    setToast(true);
    setTimeout(() => setToast(false), 5000);
  };

  // 카카오 공유
const handleKakaoShare = () => {
    console.log("카카오 클릭 됨")
  if (!window.Kakao || !window.Kakao.isInitialized()) {
    console.warn("카카오 SDK 아직 준비되지 않음");
    return;
  }

  window.Kakao.Link.sendDefault({
    objectType: "feed",
    content: {
      title: `OpenMind 질문 페이지`,
      description: "질문에 답변하세여",
      imageUrl: "https://developers.kakao.com/assets/img/about/logos/kakaolink/kakaolink_btn_medium.png",
      link: { mobileWebUrl: url, webUrl: url },
    },
  });
};

  // 페이스북 공유
  const handleFacebookShare = () => {
    const shareUrl = "https://www.facebook.com/sharer/sharer.php?u=" + encodeURIComponent(url);
    window.open(shareUrl, "_blank");
  };

  return (
    <>
      <Wrapper>
        <Icon brown onClick={handleCopyLink}>
          <img src={LinkIcon} alt="링크" />
        </Icon>
        <Icon yellow onClick={handleKakaoShare}>
          <img src={KakaoIcon} alt="카카오톡" />
        </Icon>
        <Icon blue onClick={handleFacebookShare}>
          <img src={FacebookIcon} alt="페이스북" />
        </Icon>
      </Wrapper>

      <Toast $visible={toast}>URL이 복사되었습니다</Toast>
    </>
  );
}

export default ShareButton;

const Wrapper = styled.div`
  display: flex;
  gap: 14px;
  justify-content: center;
  margin-top: 12px;
`;

const Icon = styled.button`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;

  background: ${(props) =>
    props.brown ? "#542F1A"
    : props.yellow ? "#FEE500"
    : props.blue ? "#1877F2"
    : "#f0f0f0"};

  img {
    display: block;
    width: 18px;
    height: 18px;

    /* 노란 배경이면 검정 아이콘 */
    filter: ${(props) => (props.yellow ? "none" : "invert(1)")};
  }
`;

const Toast = styled.div`
  position: fixed;
  bottom: 40px;
  left: 50%;
  transform: translateX(-50%);
  background: black;
  color: white;
  padding: 10px 18px;
  border-radius: 6px;
  font-size: 14px;
  max-width: 90vw;
  text-align: center;
  opacity: ${(props) => (props.$visible ? 1 : 0)};
  transition: opacity 0.5s ease;
  pointer-events: none;

  @media (max-width: 768px) {
    bottom: 80px;
    font-size: 13px;
    padding: 9px 16px;
  }
`;