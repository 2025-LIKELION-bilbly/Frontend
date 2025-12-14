import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from 'styled-components'; 

import GlobalStyle from './styles/GlobalStyle';
import { theme } from './styles/theme'; // theme 불러오기
//home-page 홈 페이지
import HomePage from './features/home/pages/HomePage';

// meeting-select 페이지
import MeetingSelect from './features/meeting/pages/MeetingSelectPage';

// meeting-create 페이지
import MeetingCreateFlow from './features/meeting/pages/meeting-create-page/MeetingCreateFlow';

//meeting-join 페이지
import MeetingJoinCode from './features/meeting/pages/meeting-join-page/MeetingJoinCodePage'
import MeetingJoinNickname from './features/meeting/pages/meeting-join-page/MeetingJoinNicknamePage'
import MeetingJoinColor from './features/meeting/pages/meeting-join-page/MeetingJoinColorPage'
import SelectBookShow from './features/meeting/pages/meeting-join-page/SelectBookShowPage'

// 책 고르기 페이지
import SelectBookListPage from './features/SelectBookListPage';
import BottomNavBar from './components/BottomNavBar';

// 테스트용 - 책 시작 버튼 페이지
import ReadingTestStart from './features/ReadingTestStart';

// 책 읽기 페이지
import ReadingBookPage from "./features/reading-book/pages/ReadingBookPage";



function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/main" />} />
          <Route path="/main" element={<HomePage />} />
          <Route path="/meeting" element={<MeetingSelect />} />

          {/* 모임 새로 생성하기 경로 */}
          <Route path="/meeting/create/:step" element={<MeetingCreateFlow />} />

          {/* 기존 모임 참여하기 경로 */}
          <Route path="/meeting/join/1" element={<MeetingJoinCode />} />
          <Route path="/meeting/join/:code/2" element={<MeetingJoinNickname />} />
          <Route path="/meeting/join/:code/3" element={<MeetingJoinColor />} />
          <Route path="/meeting/join/:code/selectbookshow" element={<SelectBookShow />} /> 

      
          {/* 책 고르기 경로 */}
          <Route path="/:code/selectbooklist" element={<SelectBookListPage />}/> // 책 선택 - 책 리스트 임시 경로
          
          {/* 테스트용-책 시작 버튼 경로 */}
          <Route path="/reading-test-start" element={<ReadingTestStart />} />

          {/* 책 읽기 경로 */}
          <Route path="/reading/:bookId/:pageNumber" element={<ReadingBookPage />} />

        </Routes>
        <BottomNavBar />
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;