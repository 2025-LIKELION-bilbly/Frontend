// // src/api/user.api.ts
// import { apiFetch } from "../services/apiClient";

// export type CreateUserResponse = {
//   userId: string;
// };

// export const createUser = (): Promise<CreateUserResponse> => {
//   return apiFetch("/api/users", {
//     method: "POST",
//   });
// };
// src/api/user.api.ts
import { apiFetch } from "../services/apiClient";

export type CreateUserResponse = {
  userId: string;
};

export const createUser = (): Promise<CreateUserResponse> => {
  return apiFetch("/users", { method: "POST" }); // 🔥 /api 제거
};

