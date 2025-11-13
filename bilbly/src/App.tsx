import React from 'react';
import HomePage from './pages/HomePage';
import GlobalStyle from './styles/GlobalStyle';

function App() {
  return (
    <>
      <GlobalStyle /> {/* 1. 앱 전체에 공통 스타일 적용 */}
      <HomePage />  {/* 2. 우리가 만든 홈 페이지 보여주기 */}
    </>
  );
}

export default App;