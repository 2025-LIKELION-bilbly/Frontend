import axios from "axios";
import { apiFetch } from "../services/apiClient"; // 추가했습니다!
import type { CreateGroupPayload, CreateGroupResponse, ValidateInviteCodeResponse } from "../types/group";


// 모임생성 api
export const createGroup = async (
  payload: CreateGroupPayload
): Promise<CreateGroupResponse> => {
  const userId = localStorage.getItem("userId");

  const res = await axios.post("http://bib-ly.kro.kr/api/v1/groups",
    payload,
    {
      headers: {
        "X-User-Id": userId, // ⭐ 필수
      },
    }
  );

  return res.data.data;
};

// 모임참여 api
export type JoinGroupPayload = {
  nickname: string;
  color: "RED" | "BLUE" | "GREEN" | "YELLOW" | "PURPLE" | "ORANGE" | "PINK" | "CYAN";
};

export type JoinGroupResponse = {
  memberId: number;
  groupId: number;
  groupName: string;
  nickname: string;
  color: JoinGroupPayload["color"];
  members: {
    nickname: string;
    color: JoinGroupPayload["color"];
    selectedBookId: number | null;
    selectedBookTitle: string | null;
    hasSelectedBook: boolean;
  }[];
};

export const joinGroup = async (
  groupId: number,
  payload: JoinGroupPayload
): Promise<JoinGroupResponse> => {
  const userId = localStorage.getItem("userId");

  const res = await axios.post(
    `http://bib-ly.kro.kr/api/v1/groups/${groupId}/members`,
    payload,
    {
      headers: {
        "X-User-Id": userId,
      },
    }
  );

  // 핵심: data 안의 data
  return res.data.data;
};

export const validateInviteCode = async (
  inviteCode: string
): Promise<ValidateInviteCodeResponse> => {
  const res = await axios.get(
    `http://bib-ly.kro.kr/api/v1/groups/invite/${inviteCode}`
  );

  // 핵심: 항상 data 안의 data
  return res.data.data;
};
// --------------------------------------------------------
//[추가됨] 내 모임 목록 조회 함수
// --------------------------------------------------------
export const getMyGroups = async () => {
  // apiFetch가 자동으로 BaseURL과 X-User-Id를 처리합니다.
  const response = await apiFetch("/v1/groups/my-groups", {
    method: "GET",
  });
  
  // API 응답 구조가 { success: true, data: [...] } 형태라면 .data를 반환
  return response.data || response;
};
// ✅ [추가] 배정 현황 응답 타입 (Swagger 기준)
export interface CurrentAssignmentResponse {
  groupId: number;
  groupName: string;
  currentCycle: number;
  memberAssignments: {
    memberId: number;
    nickname: string;
    color: string;
    assignmentId: number;
    bookId: number;
    bookTitle: string;
    coverImageUrl: string;
  }[];
}

// ✅ [추가] 현재 배정 현황 조회 API
export const getCurrentAssignments = async (groupId: number): Promise<CurrentAssignmentResponse> => {
  return await apiFetch(`/v1/groups/${groupId}/assignments/current`, {
    method: "GET",
  });
};