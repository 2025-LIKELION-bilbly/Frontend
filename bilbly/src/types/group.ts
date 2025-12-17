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
