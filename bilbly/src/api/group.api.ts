import axios from "axios";
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