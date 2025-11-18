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
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;