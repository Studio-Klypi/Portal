import type { H3Event } from "h3";

export type HttpRequest = H3Event<Request>;

export enum HttpCode {
  // 200
  Ok = 200,
  Created = 201,
  Accepted = 202,
  NoContent = 204,
  PartialContent = 206,
  // 400
  BaqRequest = 400,
  Unauthorized = 401,
  Forbidden = 403,
  NotFound = 404,
  Conflict = 409,
  // 500
  ServerError = 500,
}
export interface HttpError {
  code?: HttpCode;
  message?: string;
}

export const error = (event: HttpRequest, payload?: HttpError) => sendError(event, createError({
  statusCode: payload?.code ?? HttpCode.ServerError,
  statusMessage: payload?.message ?? "An error occurred!",
  message: payload?.message ?? "An error occurred!",
}));
export const handleError = async (event: HttpRequest, init: () => Promise<unknown>, err: (e: unknown) => HttpError | undefined) => {
  try {
    return await init();
  }
  catch (e) {
    return error(event, err(e));
  }
};
