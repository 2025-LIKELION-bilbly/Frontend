// bilbly/src/pages/HomePage.tsx

import React from 'react';
import * as S from './HomePage.styles';
import Header from '../components/Header';
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