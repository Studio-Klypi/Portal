import { usersPerPage } from "assets/config";
import type { FetchError } from "ofetch";
import type { IUser } from "~/types/user";
import { HttpCode } from "~/types/generics/http";

export const useUser = () => useState<IUser | null>("user", () => null);
export const useUserList = () => useState<IUser[]>("usersList", () => []);
export const useUserCount = () => useState<number>("usersCount", () => 0);

export async function virtualLogout() {
  navigateTo(useLocalePath()("/auth/login"));
  useUser().value = null;
}

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
      headers: useRequestHeaders(["cookie"]),
      body: payload,
    });

    console.log("created", user);
  }
  catch (e) {
    state = false;

    switch ((e as FetchError).statusCode) {
      case HttpCode.Gone:
        await virtualLogout();
        break;
      default:
        break;
    }
  }

  return state;
}

export async function getUsersList(page: number = 1) {
  try {
    const res = await $fetch<{
      usersCount: number;
      data: IUser[];
    }>(`/api/user/list?offset=${(page - 1) * usersPerPage}&limit=${usersPerPage}`, {
      headers: useRequestHeaders(["cookie"]),
    });
    const { usersCount, data: list } = res;

    if (!res) {
      useUserList().value = [];
      return;
    }

    useUserCount().value = usersCount;
    useUserList().value = list;
  }
  catch (e) {
    switch ((e as FetchError).statusCode) {
      case HttpCode.Gone:
        await virtualLogout();
        break;
      default:
        break;
    }
  }
}
export async function searchUsers(search: string) {
  try {
    const res = await $fetch<{
      usersCount: number;
      data: IUser[];
    }>(`/api/user/list?search=${search}`, {
      headers: useRequestHeaders(["cookie"]),
    });
    const { usersCount, data: list } = res;

    if (!res) {
      useUserList().value = [];
      return;
    }

    useUserCount().value = usersCount;
    useUserList().value = list;
  }
  catch (e) {
    switch ((e as FetchError).statusCode) {
      case HttpCode.Gone:
        await virtualLogout();
        break;
      default:
        break;
    }
  }
}

export async function sendUpdatePassword(uuid: string, password: string) {
  try {
    const user = await $fetch<IUser>(`/api/user/${uuid}/password`, {
      method: "PATCH",
      headers: useRequestHeaders(["cookie"]),
      body: {
        password,
      },
    });

    console.log("updated", user);
    // todo: toast
    return user;
  }
  catch (e) {
    switch ((e as FetchError).statusCode) {
      case HttpCode.Gone:
        await virtualLogout();
        break;
      default:
        break;
    }
  }
}
export async function sendUpdateAdmin(uuid: string, state: boolean) {
  try {
    const user = await $fetch<IUser>(`/api/user/${uuid}/admin`, {
      method: "PATCH",
      headers: useRequestHeaders(["cookie"]),
      body: {
        admin: state,
      },
    });

    console.log("updated", user);
    // todo: toast
    return user;
  }
  catch (e) {
    switch ((e as FetchError).statusCode) {
      case HttpCode.Gone:
        await virtualLogout();
        break;
      default:
        break;
    }
  }
}
export async function sendDelete(uuid: string) {
  try {
    const user = await $fetch<IUser>(`/api/user/${uuid}/delete`, {
      method: "DELETE",
      headers: useRequestHeaders(["cookie"]),
    });

    console.log("deleted", user);
    // todo: toast
    return user;
  }
  catch (e) {
    switch ((e as FetchError).statusCode) {
      case HttpCode.Gone:
        await virtualLogout();
        break;
      default:
        break;
    }
  }
}
