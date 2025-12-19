import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { useState, useEffect } from 'react';
import { ThemeProvider } from 'styled-components'; 
import axios from 'axios';

import GlobalStyle from './styles/GlobalStyle';
import { theme } from './styles/theme'; 
import { createUser } from "./api/user.api"; 

console.log("API BASE URL:", import.meta.env.VITE_API_BASE_URL);

// 페이지 컴포넌트 임포트
import LandingPage from './features/landing/pages/LandingPage';
import StartExchangePage from './features/landing/pages/StartExchangePage';
import StartExchangeMemberPage from './features/landing/pages/StartExchangeMemberPage';
import ReadingTestStart from './features/landing/pages/ReadingTestStart';
import ExchangePage from './features/exchange/pages/ExchangePage';
import ExchangeResultPage from './features/exchange/pages/ExchangeResultPage';
import ExchangeNewStartPage from './features/exchange/pages/ExchangeNewStartPage';
import SelectBookPage from './features/select-book/pages/SelectBookPage';
import SelectBookResultPage from './features/select-book/pages/SelectBookResultPage';
import ExchangeStatusPage from './features/select-book/pages/ExchangeStatusPage';
import HomePage from './features/home/pages/HomePage';
import BookShelfPage from './features/bookshelf/pages/BookShelfPage'; // [해결] 미사용 에러 방지
import MeetingSelect from './features/meeting/pages/MeetingSelectPage';
import MeetingCreateFlow from './features/meeting/pages/meeting-create-page/MeetingCreateFlow';
import MeetingJoinFlow from './features/meeting/pages/meeting-join-page/MeetingJoinFlow';
import ReadingBookPage from "./features/reading-book/pages/ReadingBookPage";

// 공통 컴포넌트
import BottomNavBar from './components/BottomNavBar';

const ensureUser = async () => {
  const storedUserId = localStorage.getItem("userId");

  if (!storedUserId) {
    try {
      const res = await createUser();
      localStorage.setItem("userId", res.userId);
    } catch (error: unknown) {
      // 💡 [해결] any 대신 unknown 사용 및 axios 타입 가드 적용으로 빌드 에러 해결
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 409) {
          console.log("이미 등록된 사용자입니다. 기존 정보를 사용합니다.");
        } else {
          console.error("사용자 생성 실패:", error.response?.data?.message || error.message);
        }
      } else {
        console.error("알 수 없는 에러 발생:", error);
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
          {/* 기본 경로 */}
          <Route path="/" element={<MeetingSelect />} />
          
          <Route path="/landing" element={<LandingPage />} />
          <Route path="/exchange/start" element={<StartExchangePage />} />
          
          {/* 💡 [해결] TS2739 에러 해결: 필수 Props(groupId, passedGroupName) 전달 */}
          <Route 
            path="/exchange/start/member" 
            element={<StartExchangeMemberPage groupId={0} passedGroupName="기본모임" />} 
          />
          
          <Route path="/reading-test-start" element={<ReadingTestStart />} />
          <Route path="/exchange" element={<ExchangePage />} />
          <Route path="/exchange/result" element={<ExchangeResultPage />} />
          <Route path="/exchange/new-start" element={<ExchangeNewStartPage />} />
          
          <Route path="/select-book" element={<SelectBookPage />} />
          <Route path="/select-book/result" element={<SelectBookResultPage />} />
          <Route path="/exchange/status" element={<ExchangeStatusPage />} />

          <Route path="/main" element={<HomePage />} />
          <Route path="/meeting" element={<MeetingSelect />} />

          <Route path="/meeting/create/:step" element={<MeetingCreateFlow />} />
          <Route path="/meeting/join/:code/:step" element={<MeetingJoinFlow />} />

          {/* 💡 [해결] 서재 페이지 라우트 연결로 네비바 이동 가능하게 수정 */}
          <Route path="/bookshelf" element={<BookShelfPage />} />

          <Route path="/reading/:bookId/:pageNumber" element={<ReadingBookPage />} />
        </Routes>
        
        <BottomNavBar />
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;