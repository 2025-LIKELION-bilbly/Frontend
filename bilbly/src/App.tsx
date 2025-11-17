import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from './pages/HomePage';
import MeetingSelectPage from './features/meeting/pages/MeetingSelectPage';
import GlobalStyle from './styles/GlobalStyle';
import Step1NamePage from "./features/meeting/pages/meeting-create-page/Step1NamePage";
import Step2PeriodPage from "./features/meeting/pages/meeting-create-page/Step2PeriodPage";
import Step3NicknamePage from "./features/meeting/pages/meeting-create-page/Step3NickNamePage";

// function App() {
//   return (
//     <>
//       <GlobalStyle /> {/* 1. 앱 전체에 공통 스타일 적용 */}
//       <HomePage />  {/* 2. 우리가 만든 홈 페이지 보여주기 */}  
//     </>
//   );
// }



function App() {
  return (
    <>
      <GlobalStyle />
      
      <BrowserRouter>
        <Routes>
          <Route path="/meeting" element={<MeetingSelectPage />} />
          <Route path="/main" element={<HomePage />} />
          <Route path="/meeting/create/1" element={<Step1NamePage />} />
          <Route path="/meeting/create/2" element={<Step2PeriodPage />} />
          <Route path="/meeting/create/3" element={<Step3NicknamePage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;