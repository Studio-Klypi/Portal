import type { HttpRequest } from "~/types/generics/http";
import { handleError, HttpCode } from "~/types/generics/http";
import type { ICreateUserPayload } from "~/types/user";
import * as userRepo from "~/server/database/repositories/user";
import * as authRepo from "~/server/database/repositories/auth";
import { ConflictError, NotFoundError, UnauthorizedError } from "~/types/generics/error";
import { setAuthCookies } from "~/server/services/cookies";

export async function createAccount(event: HttpRequest, payload: ICreateUserPayload) {
  return handleError(
    event,
    async () => {
      const user = await userRepo.create(payload);

      const session = await authRepo.create(user.uuid);
      setAuthCookies(event, session.token, session.userUuid);

      event.node.res.statusCode = HttpCode.Created;
      return user;
    },
    (e) => {
      if (e instanceof ConflictError)
        return {
          code: HttpCode.Conflict,
          message: "This email is already in use.",
        };
    },
  );
}
export async function loginAccount(event: HttpRequest, payload: { email: string; password: string }) {
  return handleError(
    event,
    async () => {
      await userRepo.verifyPassword(payload.email, payload.password);
      const user = await userRepo.getByEmail(payload.email);

      const session = await authRepo.create(user.uuid);
      setAuthCookies(event, session.token, session.userUuid);

      event.node.res.statusCode = HttpCode.Accepted;
      return user;
    },
    (e) => {
      if (e instanceof NotFoundError)
        return {
          code: HttpCode.NotFound,
          message: "This email doesn't belong to any known user!",
        };
      if (e instanceof UnauthorizedError)
        return {
          code: HttpCode.Unauthorized,
          message: "Wrong credentials used!",
        };
    },
  );
}
