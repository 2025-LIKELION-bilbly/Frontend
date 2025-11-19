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


function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/main" />} />
          <Route path="/main" element={<HomePage />} />
          <Route path="/meeting" element={<MeetingSelectPage />} />
          <Route path="/meeting/create/1" element={<Step1NamePage />} />
          <Route path="/meeting/create/2" element={<Step2PeriodPage />} />
          <Route path="/meeting/create/3" element={<Step3NicknamePage />} />
          <Route path="/meeting/create/4" element={<Step4ColorPage />} />
          <Route path="/meeting/create/code" element={<CodeDisplayPage />} /> 
          <Route path="/meeting/create/selectbook/laterselect" element={<div>404 Not Found</div>} /> // 추후 구현: meeting-create 책 선택 페이지 [나중에] 
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;