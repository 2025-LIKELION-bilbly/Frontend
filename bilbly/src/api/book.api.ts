// src/api/book.api.ts
import { apiFetch } from "../services/apiClient";

// 1. 책 리스트용 간략 정보 (기존)
export interface Book {
  bookId: number;
  title: string;
  author: string;
  coverImageUrl: string;
  isTaken?: boolean; 
  takenBy?: string;
}

// ✅ [추가됨] 2. 책 상세 정보 (API 명세 기준)
export interface BookDetail {
  bookId: number;
  title: string;
  author: string;
  genre: string;
  pageCount: number | null;
  publishedAt: string; // "1797-01-01T00:00:00"
  publisher: string;
  isbn: string;
  description: string;
  coverUrl: string;
}

// 응답 타입들
export interface GetBookListResponse {
  success: boolean;
  data: Book[];
  timestamp: string;
}

// ✅ [추가됨] 상세 조회 응답
export interface GetBookDetailResponse {
  success: boolean;
  data: BookDetail;
  timestamp: string;
}

export interface SelectBookResponse {
  selectedMemberId: number;
  selectedBookId: number;
  selectedBookTitle: string;
  message: string;
  members: any[];
}

// --- API 함수들 ---

// 새로 나온 책
export const getNewBooks = async (): Promise<GetBookListResponse> => {
  return await apiFetch("/v1/books/new", { method: "GET" });
};

// 인기 있는 책
export const getPopularBooks = async (): Promise<GetBookListResponse> => {
  return await apiFetch("/v1/books/popular", { method: "GET" });
};

// ✅ [추가됨] 책 상세 정보 조회 API
export const getBookDetail = async (bookId: number): Promise<GetBookDetailResponse> => {
  return await apiFetch(`/v1/books/${bookId}`, { method: "GET" });
};

// 책 선택
export const selectExchangeBook = async (bookId: number, groupId: number): Promise<SelectBookResponse> => {
  return await apiFetch(`/v1/books/${bookId}/select`, { 
    method: "POST",
    body: JSON.stringify({ groupId }),
  });
};