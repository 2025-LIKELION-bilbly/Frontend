// src/services/apiClient.ts

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

if (!BASE_URL) {
  throw new Error("VITE_API_BASE_URL is not defined");
}

/**
 * 공통 API fetch 함수
 * - baseURL 자동 적용
 * - X-User-Id 자동 첨부
 */
export const apiFetch = async (
  path: string,
  options: RequestInit = {}
) => {
  const userId = localStorage.getItem("userId");

  const res = await fetch(`${BASE_URL}${path}`, {
    method: options.method ?? "GET",
    credentials: "include", // 백엔드 설정에 따라 필요
    headers: {
      "Content-Type": "application/json",
      ...(userId && { "X-User-Id": userId }), // 🔥 핵심
      ...options.headers,
    },
    ...options,
  });

  if (!res.ok) {
    // 서버 에러 메시지까지 보고 싶으면 여기서 처리
    const errorBody = await res.text();
    throw new Error(`API Error ${res.status}: ${errorBody}`);
  }

  // 응답 body가 없는 경우 대비
  if (res.status === 204) {
    return null;
  }

  return res.json();
};
