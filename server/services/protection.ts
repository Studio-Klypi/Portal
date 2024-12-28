import type { HttpRequest } from "~/types/generics/http";
import { getAuthCookies } from "~/server/services/cookies";
import { error, HttpCode } from "~/types/generics/http";
import * as authRepo from "~/server/database/repositories/auth";

export async function protectRoute(event: HttpRequest, callback: (uuid: string) => Promise<unknown>) {
  const { token, userUuid } = getAuthCookies(event);
  if (!token || !userUuid)
    return error(event, {
      code: HttpCode.Unauthorized,
      message: "Invalid session info provided!",
    });

  if (!await authRepo.verify(token, userUuid))
    return error(event, {
      code: HttpCode.Forbidden,
      message: "Your session expired!",
    });

  return callback(userUuid);
}
