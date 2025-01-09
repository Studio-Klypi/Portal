import { loginAccount } from "~/server/services/user";

export default defineEventHandler(async event =>
  await loginAccount(event, await readBody<{ email: string; password: string }>(event)));
