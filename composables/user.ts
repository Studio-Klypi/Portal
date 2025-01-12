import type { IUser } from "~/types/user";

export const useUser = () => useState<IUser | null>("user", () => null);
export const useUserList = () => useState<IUser[]>("usersList", () => []);

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
export async function sendCreateUser(payload: {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  admin?: boolean;
}) {
  let state = true;

  try {
    const user = await $fetch<IUser>("/api/user/register", {
      method: "POST",
      body: payload,
    });

    console.log("created", user);
  }
  catch (e) {
    state = false;
    console.error(e);
  }

  return state;
}
