import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from './pages/HomePage';
import MeetingSelectPage from './features/meeting/pages/MeetingSelectPage';
import GlobalStyle from './styles/GlobalStyle';
import Step1NamePage from "./features/meeting/pages/meeting-create-page/Step1NamePage";

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
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;