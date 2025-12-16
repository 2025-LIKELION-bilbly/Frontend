// src/api/group.api.ts
import api from "./apiClient";
import type { CreateGroupPayload, CreateGroupResponse } from "../types/group";

export async function createGroup(
    payload: CreateGroupPayload
): Promise<CreateGroupResponse> {
    const res = await api.post("/api/v1/groups", payload);
    return res.data;
}
