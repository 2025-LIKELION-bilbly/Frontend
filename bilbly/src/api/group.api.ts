import axios from "axios";
import type { CreateGroupPayload, CreateGroupResponse } from "../types/group";

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

  return res.data;
};
