// src/api/user.api.ts
import { apiFetch } from "../services/apiClient"; // 👈 이 부분이 빠져서 오류가 난 것입니다!

// 1. 유저 생성 응답 타입
export type CreateUserResponse = {
  userId: string;
};

// 2. 내 모임 목록 응답 타입
export type UserGroupResponse = {
  userId: string;
  groups: {
    groupId: number;
    groupName: string;
    // 필요한 다른 필드들이 있다면 추가
  }[];
};

// 유저 생성 함수
export const createUser = (): Promise<CreateUserResponse> => {
  // 회원가입은 보통 바디가 필요하므로 빈 객체라도 전송
  return apiFetch("/users", {
    method: "POST",
    body: JSON.stringify({}) 
  });
};

// 내 모임 목록 조회 함수
export const getUserGroups = (): Promise<UserGroupResponse> => {
  // 내 모임 정보를 가져옵니다. 
  // (API 경로가 /users/groups 가 맞는지 Swagger에서 한 번 더 확인해보세요. 만약 404가 뜨면 경로 문제일 수 있습니다.)
  return apiFetch("/users/groups", {
    method: "GET",
  });
};