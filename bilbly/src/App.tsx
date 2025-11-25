import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from 'styled-components'; 

import GlobalStyle from './styles/GlobalStyle';
import { theme } from './styles/theme'; // theme 불러오기

import HomePage from './features/home/pages/HomePage';

// meeting-select 페이지
import MeetingSelect from './features/meeting/pages/MeetingSelectPage';

// meeting-create 페이지
import MeetingCreateName from "./features/meeting/pages/meeting-create-page/MeetingCreateNamePage";
import MeetingCreatePeriod from "./features/meeting/pages/meeting-create-page/MeetingCreatePeriodPage";
import MeetingCreateNickname from "./features/meeting/pages/meeting-create-page/MeetingCreateNicknamePage";
import MeetingCreateColor from "./features/meeting/pages/meeting-create-page/MeetingCreateColorPage";
import CodeDisplayPage from './features/meeting/pages/meeting-create-page/CodeDisplayPage';
import SelectBookIntroPage from './features/meeting/pages/meeting-create-page/SelectBookIntroPage';

//meeting-join 페이지
import MeetingJoinCode from './features/meeting/pages/meeting-join-page/MeetingJoinCodePage'
import MeetingJoinNickname from './features/meeting/pages/meeting-join-page/MeetingJoinNicknamePage'
import MeetingJoinColor from './features/meeting/pages/meeting-join-page/MeetingJoinColorPage'
import SelectBookShow from './features/meeting/pages/meeting-join-page/SelectBookShowPage'

// 책 고르기 페이지
import SelectBookListPage from './features/SelectBookListPage';




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
          <Route path="/meeting/create/1" element={<MeetingCreateName />} />
          <Route path="/meeting/create/2" element={<MeetingCreatePeriod />} />
          <Route path="/meeting/create/3" element={<MeetingCreateNickname />} />
          <Route path="/meeting/create/4" element={<MeetingCreateColor />} />
          <Route path="/meeting/create/code" element={<CodeDisplayPage />} /> 
          <Route path="/meeting/create/complete" element={<SelectBookIntroPage />} />

          {/* 기존 모임 참여하기 경로 */}
          <Route path="/meeting/join/1" element={<MeetingJoinCode />} />
          <Route path="/meeting/join/:code/2" element={<MeetingJoinNickname />} />
          <Route path="/meeting/join/:code/3" element={<MeetingJoinColor />} />
          <Route path="/meeting/join/:code/selectbookshow" element={<SelectBookShow />} /> 

      


          {/* 책 고르기 경로 */}
          <Route path="/meeting/join/:code/selectbooklist" element={<SelectBookListPage />}/> // 📚 책 선택 - 책 리스트 임시 경로
          
          
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;