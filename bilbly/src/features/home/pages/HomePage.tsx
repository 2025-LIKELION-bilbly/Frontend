// bilbly/src/features/home/pages/HomePage.tsx

import React from 'react';
// 1. 스타일 파일은 같은 폴더에 있으므로 ./ 로 시작해야 합니다.
import * as S from './HomePage.styles'; 

// 2. Header는 공통 컴포넌트(src/components)에 있으므로 3단계 위로 올라가야 합니다.
import Header from '../../../components/Header'; 

// 3. 나머지 컴포넌트들은 같은 기능(home)의 components 폴더에 있으므로 1단계 위로 올라갑니다.
import MeetingSelector from '../components/MeetingSelector';
import CategoryTabs from '../components/CategoryTabs';
import BookCarousel from '../components/BookCarousel';
import BookmarkGraph from '../components/BookmarkGraph';
import MoreMeetings from '../components/MoreMeetings';

function HomePage() {
  return (
    <S.Container>
      <Header />
      <MeetingSelector />
      <CategoryTabs />
      <BookCarousel />
      <BookmarkGraph />
      <MoreMeetings />
    </S.Container>
  );
}

export default HomePage;