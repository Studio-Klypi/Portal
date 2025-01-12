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
export async function whoAmI(event: HttpRequest, uuid: string) {
  return handleError(
    event,
    async () => await userRepo.get(uuid),
    (e) => {
      if (e instanceof NotFoundError)
        return {
          code: HttpCode.NotFound,
          message: "User not found!",
        };
    },
  );
}

export async function getUsersList(event: HttpRequest) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const params = getQuery(event) as any;
  const offset = Number(params.offset ?? 0);
  const limit = Number(params.limit ?? 20);
  const search = params.search as string | undefined;

  let list;

  if (search)
    list = await userRepo.search(search);
  else
    list = await userRepo.getList(offset, limit);

  if (!list.length)
    event.node.res.statusCode = HttpCode.NoContent;

  return {
    usersCount: await userRepo.count(),
    data: list,
  };
}
