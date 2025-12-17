// src/types/group.ts
export type BackendColor =
    | "RED"
    | "BLUE"
    | "GREEN"
    | "YELLOW"
    | "PURPLE"
    | "ORANGE"
    | "PINK"
    | "CYAN";

export interface CreateGroupPayload {
    groupName: string;
    readingPeriod: number;
    nickname: string;
    color: BackendColor;
}

export interface CreateGroupResponse {
    groupId: number;
    groupName: string;
    inviteCode: string;
    readingPeriod: number;
    memberId: number;
}

/* =========================
 * 초대 코드 검증 응답
 * ========================= */

export type ValidateInviteCodeResponse = {
    groupId: number;
    groupName: string;
    readingPeriod: number;
    members: {
        nickname: string;
        color: "RED" | "BLUE" | "GREEN" | "YELLOW" | "PURPLE" | "ORANGE" | "PINK" | "CYAN";
    }[];
};
