import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from './pages/HomePage';
import MeetingSelectPage from './features/meeting/pages/MeetingSelectPage';
import GlobalStyle from './styles/GlobalStyle';

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
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;