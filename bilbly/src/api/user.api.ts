import api from "../api/apiClient";

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
  }[];
};

// 
export const createUser = async (): Promise<CreateUserResponse> => {
  const res = await api.post<CreateUserResponse>("/users");
  return res.data;
};

// 
export const getUserGroups = async (): Promise<UserGroupResponse> => {
  const res = await api.get<UserGroupResponse>("/users/groups");
  return res.data;
};
