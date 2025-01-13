import type { FetchError } from "ofetch";
import { useUser } from "~/composables/user";
import { key_AuthToken, key_UserUuid } from "~/server/services/cookies";
import type { IUser } from "~/types/user";
import { useLocalePath } from "#i18n";
import { HttpCode } from "~/types/generics/http";

export default defineNuxtRouteMiddleware(async () => {
  const token = useCookie(key_AuthToken);
  const userUuid = useCookie(key_UserUuid);

  if (!token || !userUuid)
    return;

  const user = useUser();
  if (user.value)
    return;

  try {
    const { data } = await useFetch<IUser>("/api/user/whoami", {
      headers: useRequestHeaders(["cookie"]),
    });
    if (!data.value)
      return;
    user.value = data.value;
  }
  catch (e) {
    switch ((e as FetchError).statusCode) {
      case HttpCode.Gone: {
        await navigateTo(useLocalePath()("/auth/login"));
        return;
      }
      default:
        return;
    }
  }
});
