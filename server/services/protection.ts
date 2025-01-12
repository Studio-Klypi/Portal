import type { HttpRequest } from "~/types/generics/http";
import { getAuthCookies } from "~/server/services/cookies";
import { error, HttpCode } from "~/types/generics/http";
import * as authRepo from "~/server/database/repositories/auth";
import * as userRepo from "~/server/database/repositories/user";
import type { BackRouteProtectionConfig } from "~/types/generics/protection";

export async function protectRoute(event: HttpRequest, callback: (uuid: string) => Promise<unknown>, config?: BackRouteProtectionConfig) {
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

  const user = await userRepo.get(userUuid);
  if (config?.admin && !user.admin)
    return error(event, {
      code: HttpCode.Forbidden,
      message: "You don't have enough rights!",
    });

  return callback(userUuid);
}
