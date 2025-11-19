import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from 'styled-components'; 

import GlobalStyle from './styles/GlobalStyle';
import { theme } from './styles/theme'; // theme 불러오기

import HomePage from './features/home/pages/HomePage';
import MeetingSelectPage from './features/meeting/pages/MeetingSelectPage';
import Step1NamePage from "./features/meeting/pages/meeting-create-page/Step1NamePage";
import Step2PeriodPage from "./features/meeting/pages/meeting-create-page/Step2PeriodPage";
import Step3NicknamePage from "./features/meeting/pages/meeting-create-page/Step3NicknamePage";
import Step4ColorPage from "./features/meeting/pages/meeting-create-page/Step4ColorPage";
import CodeDisplayPage from './features/meeting/pages/meeting-create-page/CodeDisplayPage';
import SelectBookIntroPage from './features/meeting/pages/meeting-create-page/SelectBookIntroPage';
import SelectBookListPage from './features/SelectBookListPage';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/main" />} />
          <Route path="/main" element={<HomePage />} />

          {/* 모임 새로 생성하기 경로 */}
          <Route path="/meeting" element={<MeetingSelectPage />} />
          <Route path="/meeting/create/1" element={<Step1NamePage />} />
          <Route path="/meeting/create/2" element={<Step2PeriodPage />} />
          <Route path="/meeting/create/3" element={<Step3NicknamePage />} />
          <Route path="/meeting/create/4" element={<Step4ColorPage />} />
          <Route path="/meeting/create/code" element={<CodeDisplayPage />} /> 
          <Route path="/meeting/create/complete" element={<SelectBookIntroPage />} />

          {/* 책 고르기 경로 */}
          <Route path="/selectbooklist" element={<SelectBookListPage />} /> // 📚 책 선택 - 책 리스트 임시 경로
          
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;