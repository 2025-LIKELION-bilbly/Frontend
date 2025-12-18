import React, { useState, useEffect } from 'react';
import * as S from './HomePage.styles'; 

import Header from '../../../components/Header'; 

// Home Components
import MeetingSelector from './MeetingSelector'; 
import CategoryTabs from './CategoryTabs';
import BookCarousel from './BookCarousel';
import BookmarkGraph from './BookmarkGraph';
import MoreMeetings from './MoreMeetings';

// API
import { getMyGroups } from '../../../api/group.api';
import { getHomeData, type HomeDataResponse } from '../../../api/home';
import { getBookDetail, type BookDetail } from '../../../api/book.api';

function HomePage() {
  // 1. 상태 관리
  const [currentBookId, setCurrentBookId] = useState<number>(1); // 초기값 1 (첫 번째 화면)
  const [myGroups, setMyGroups] = useState<any[]>([]); // 내 모임 목록
  const [homeData, setHomeData] = useState<HomeDataResponse | null>(null);
  const [bookInfo, setBookInfo] = useState<BookDetail | null>(null);
  const [loading, setLoading] = useState(true);

  // 2. 초기 데이터 로딩 (내 그룹 및 홈 데이터 조회)
  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const userId = localStorage.getItem('userId');
        if (!userId) return;

        // (1) 내 모든 모임 정보 조회
        const groups = await getMyGroups();
        if (groups && groups.length > 0) {
          setMyGroups(groups);
          const firstGroupId = groups[0].groupId;

          // (2) 선택된 모임의 홈 데이터(현황) 조회
          try {
            const data = await getHomeData(userId, firstGroupId);
            setHomeData(data);
          } catch (homeError: any) {
            // 404 에러 시 독서 시작 전임을 알림 (화면은 유지)
            console.log("ℹ️ 아직 독서 데이터가 없는 모임입니다.");
          }
        }
      } catch (error) {
        console.error("초기 데이터 로딩 실패:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchInitialData();
  }, []);

  // 3. 슬라이더가 넘어갔을 때(currentBookId가 1보다 클 때)만 상세 정보 로딩
  useEffect(() => {
    const fetchBookDetail = async () => {
      // currentBookId가 1(첫 화면)이 아닐 때만 API 호출
      if (currentBookId <= 1) {
        setBookInfo(null);
        return;
      }

      try {
        const bookRes = await getBookDetail(currentBookId);
        if (bookRes.success) {
          setBookInfo(bookRes.data);
        }
      } catch (error) {
        console.error("책 상세 정보 로딩 실패:", error);
      }
    };

    fetchBookDetail();
  }, [currentBookId]);

  // 최근 흔적(한줄평) 매핑
  const reviews = homeData?.recentTraceItems?.slice(0, 3).map((trace) => ({
    id: trace.highlightId,
    content: trace.textSentence,
    source: "모임원"
  })) || [];

  // 현재 표시할 모임 이름 결정
  const currentGroupName = myGroups.length > 0 
    ? (myGroups[0].groupName || myGroups[0].name) 
    : "가입된 모임 없음";

  if (loading) {
    return (
      <S.Container>
        <Header />
        <div style={{ padding: '100px 0', textAlign: 'center' }}>데이터 로딩 중...</div>
      </S.Container>
    );
  }

  return (
    <S.Container>
      <Header />
      
      {/* 실제 모임 이름을 넘겨줍니다 */}
      <MeetingSelector groupName={currentGroupName} />
      
      {/* 수정된 부분: CategoryTabs에 내 그룹 정보를 전달합니다. 
        CategoryTabs 내부에서는 이 데이터를 받아 '강강강강' 대신 실제 닉네임을 띄우게 됩니다.
      */}
      <CategoryTabs members={myGroups} />
      
      {/* 슬라이더 변경 시 ID 업데이트 */}
      <BookCarousel onSlideChange={setCurrentBookId} />
      
      {/* currentBookId가 1보다 클 때 상세 정보 표시 */}
      {currentBookId > 1 ? (
        <S.IntroContainer>
          <S.BookDetailContainer>
            <S.Divider />
            
            {/* API에서 가져온 책 제목 표시 */}
            <S.BookTitlePlaceholder>
                {bookInfo?.title || "책 정보를 불러오는 중..."}
            </S.BookTitlePlaceholder>
            
            <S.BookMetaInfo>
              <S.MetaRow>
                <S.MetaLabel>저자</S.MetaLabel>
                <S.MetaValue>{bookInfo?.author || "-"}</S.MetaValue>
              </S.MetaRow>
              <S.MetaRow>
                <S.MetaLabel>장르</S.MetaLabel>
                <S.MetaValue>{bookInfo?.genre || "-"}</S.MetaValue>
              </S.MetaRow>
            </S.BookMetaInfo>
            
            <S.BookSummaryPlaceholder>
              {bookInfo?.description || "줄거리 정보가 없습니다."}
            </S.BookSummaryPlaceholder>

            <S.SectionTitle>한줄평 (최근 흔적)</S.SectionTitle>
            
            {reviews.length > 0 ? (
                reviews.map((review) => (
                <S.ReviewTable key={review.id}>
                    <S.ReviewContentCell>{review.content}</S.ReviewContentCell>
                    <S.VerticalLine />
                    <S.ReviewInfoCell>{review.source}</S.ReviewInfoCell>
                </S.ReviewTable>
                ))
            ) : (
                <div style={{ padding: '20px', textAlign: 'center', color: '#999', fontSize: '14px' }}>
                    등록된 흔적이 없습니다.
                </div>
            )}
          </S.BookDetailContainer>
        </S.IntroContainer>
      ) : (
        /* 첫 번째 화면에서는 원래대로 그래프와 추가 모임 정보를 보여줌 */
        <>
          <S.Divider />
          <BookmarkGraph />
          {/* MoreMeetings에도 전체 그룹 데이터를 전달하여 연동할 수 있습니다 */}
          <MoreMeetings groups={myGroups} />
        </>
      )}
      
    </S.Container>
  );
}

export default HomePage;