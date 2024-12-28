import type { IUser } from "~/types/user";

export const useUser = () => useState<IUser | null>("user", () => null);

export async function sendLogin(payload: { email: string; password: string }) {
  let state = true;

  try {
    useUser().value = await $fetch<IUser>("/api/user/login", {
      method: "POST",
      body: payload,
    });
  }
  catch (e) {
    state = false;
    console.error(e);
  }

  return state;
}
