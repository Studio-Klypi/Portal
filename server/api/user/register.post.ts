import { createAccount } from "~/server/services/user";
import type { ICreateUserPayload } from "~/types/user";

export default defineEventHandler(async event =>
  await createAccount(event, await readBody<ICreateUserPayload>(event)));
