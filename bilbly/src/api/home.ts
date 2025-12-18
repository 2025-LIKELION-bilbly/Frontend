// src/api/home.ts
import { apiFetch } from '../services/apiClient';

// ✅ Swagger 데이터 구조와 100% 일치
export interface HomeDataResponse {
  currentGroupId: number;
  currentGroupName: string;
  groupMemberNicknames: string[];
  
  // 현재 읽고 있는 책 정보
  currentReadingBookInfo: {
    bookId: number;
    coverImageUrl: string;
    daysRemaining: number;
    nextExchangeDate: string;
    currentPage: number;
    progressPercent: number;
    upcomingBooks: {
      bookId: number;
      coverImageUrl: string;
      cycleNumber: number;
    }[];
  };

  // 흔적(하이라이트/코멘트) 그룹
  traceGroups: {
    progressRange: string;
    count: number;
    traces: {
      highlightId: number;
      textSentence: string;
      color: string;
      highlightedPage: number;
      progressPercentage: number;
      createdAt: string;
      memberId: number;
      isBlurred: boolean;
      comments: {
        commentId: number;
        content: string;
        visibility: string;
        createdAt: string;
        memberId: number;
        parentCommentId: number;
      }[];
    }[];
  }[];

  // 최근 흔적들
  recentTraceItems: {
    highlightId: number;
    textSentence: string;
    color: string;
    highlightedPage: number;
    progressPercentage: number;
    createdAt: string;
    memberId: number;
    isBlurred: boolean;
    comments: any[];
  }[];

  // 최근 북마크
  recentBookmarks: {
    bookmarks: {
      bookmarkId: number;
      sessionId: number;
      memberId: number;
      bookMarkPage: number;
      createdAt: string;
    }[];
  }[];
}

// 데이터 조회 함수
export const getHomeData = async (memberId: string, groupId: number): Promise<HomeDataResponse> => {
  try {
    const queryParams = new URLSearchParams({
      memberId: memberId, // 문자열 그대로 사용
      groupId: groupId.toString(),
    }).toString();

    // apiFetch를 사용하여 요청 (BaseURL, Header 등 공통 설정 자동 적용)
    // apiFetch 내부에서 res.json()을 반환하므로 바로 response로 받습니다.
    const response = await apiFetch(`/home?${queryParams}`, {
      method: 'GET',
    });
    
    return response as HomeDataResponse;
  } catch (error) {
    console.error('홈 데이터 조회 실패:', error);
    throw error;
  }
};