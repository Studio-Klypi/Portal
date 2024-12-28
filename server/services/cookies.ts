import type { HttpRequest } from "~/types/generics/http";

export const key_AuthToken = "auth-token";
export const key_UserUuid = "user-uuid";
export const authCookiesOptions = {
  httpOnly: true,
  secure: false,
};

export function setAuthCookies(event: HttpRequest, token: string, userUuid: string) {
  setAuthTokenCookie(event, token);
  setUserUuidCookie(event, userUuid);
}
export function clearAuthCookies(event: HttpRequest) {
  clearAuthTokenCookie(event);
  clearUserUuidCookie(event);
}

export function setAuthTokenCookie(event: HttpRequest, value: string) {
  setCookie(event, key_AuthToken, value);
}
export function clearAuthTokenCookie(event: HttpRequest) {
  deleteCookie(event, key_AuthToken);
}
export function setUserUuidCookie(event: HttpRequest, value: string) {
  setCookie(event, key_UserUuid, value);
}
export function clearUserUuidCookie(event: HttpRequest) {
  deleteCookie(event, key_UserUuid);
}
