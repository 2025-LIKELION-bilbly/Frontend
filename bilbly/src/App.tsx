import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState } from 'react'
import { ThemeProvider } from 'styled-components'; 

import GlobalStyle from './styles/GlobalStyle';
import { theme } from './styles/theme'; // theme 불러오기

import { useEffect } from "react";
import { createUser } from "./api/user.api"; // 로컬스토리지-사용자 userid 확보

// 모임 시작전 페이지
import LandingPage from './features/landing/pages/LandingPage';
// 모임장용 2번째 페이지 (교환독서 시작)
import StartExchangePage from './features/landing/pages/StartExchangePage';
//모임원용 페이지
import StartExchangeMemberPage from './features/landing/pages/StartExchangeMemberPage';
//교환독서 시작
import ReadingTestStart from './features/landing/pages/ReadingTestStart';
// 교환 페이지 
import ExchangePage from './features/exchange/pages/ExchangePage';
// 교환 결과 페이지
import ExchangeResultPage from './features/exchange/pages/ExchangeResultPage';
//교환 새로 선택 페이지
import ExchangeNewStartPage from './features/exchange/pages/ExchangeNewStartPage';
//책 선택 페이지1
import SelectBookPage from './features/select-book/pages/SelectBookPage';
//책 선택 페이지 2
import SelectBookResultPage from './features/select-book/pages/SelectBookResultPage';
//책 선택 페이지 마지막
import ExchangeStatusPage from './features/select-book/pages/ExchangeStatusPage';
// home-page 홈 페이지
import HomePage from './features/home/pages/HomePage';

// meeting-select 페이지
import MeetingSelect from './features/meeting/pages/MeetingSelectPage';

// meeting-create 페이지
import MeetingCreateFlow from './features/meeting/pages/meeting-create-page/MeetingCreateFlow';

// meeting-join 페이지
import MeetingJoinFlow from './features/meeting/pages/meeting-join-page/MeetingJoinFlow';

import BottomNavBar from './components/BottomNavBar';


// 책 읽기 페이지
import ReadingBookPage from "./features/reading-book/pages/ReadingBookPage";

const ensureUser = async () => {
  const storedUserId = localStorage.getItem("userId");

  if (!storedUserId) {
    try {
      const res = await createUser();
      localStorage.setItem("userId", res.userId);
    } catch (error: any) {
      // 409 에러(이미 존재)가 나면 무시하고 다음 단계로 진행하게 함
      if (error.response?.status === 409) {
        console.log("이미 등록된 사용자입니다. 기존 정보를 사용합니다.");
        // 서버에서 받아온 ID가 있다면 저장, 없다면 로직에 따라 처리
      } else {
        console.error("사용자 생성 실패:", error);
      }
    }
  }
};


function App() {
  const [ready, setReady] = useState(false);


  useEffect(() => {
    const init = async () => {
      await ensureUser();
      setReady(true);
    };
    init();
  }, []);

  if (!ready) {
    return null; 
  }

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <BrowserRouter>
        <Routes>
          {/* 기본 경로: 모임 선택 부분 */}
          <Route path="/" element={<MeetingSelect />} />
          
          {/* 모임장용 페이지 */}
          <Route path="/exchange/start" element={<StartExchangePage />} />
          
          {/*모임원용 페이지  */}
          <Route path="/exchange/start/member" element={<StartExchangeMemberPage />} />
          {/*교환독서 시작 페이지  */}
          <Route path="/reading-test-start" element={<ReadingTestStart />} />
          {/*교환 페이지  */}
          <Route path="/exchange" element={<ExchangePage />} />
          {/* 교환 결과 페이지 */}
          <Route path="/exchange/result" element={<ExchangeResultPage />} />
          {/* 교환 새로 선택 페이지 */}
          <Route path="/exchange/new-start" element={<ExchangeNewStartPage />} />
          
          {/* 새로 추가한 책 고르기 페이지 경로 */}
          <Route path="/select-book" element={<SelectBookPage />} />
          {/* 책 고르기 두 번째 */}
          <Route path="/select-book/result" element={<SelectBookResultPage />} />
          {/* 책 선택 마지막 페이지 */}
          <Route path="/exchange/status" element={<ExchangeStatusPage />} />

          {/* 홈 페이지 */}
          <Route path="/main" element={<HomePage />} />
          <Route path="/meeting" element={<MeetingSelect />} />

          {/* 모임 새로 생성하기 경로 */}
          <Route path="/meeting/create/:step" element={<MeetingCreateFlow />} />

          {/* 기존 모임 참여하기 경로  - 모임 코드 받아야 함*/}
          <Route path="/meeting/join/:code/:step" element={<MeetingJoinFlow />} />

          

          {/* 책 읽기 경로 */}
          <Route path="/reading/:bookId/:pageNumber" element={<ReadingBookPage />} />

        </Routes>
        
        {/* 하단 네비게이션 바 (모든 페이지에 보임) */}
        <BottomNavBar />
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;