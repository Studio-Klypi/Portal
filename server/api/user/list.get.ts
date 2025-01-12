import { protectRoute } from "~/server/services/protection";
import * as userService from "~/server/services/user";

export default defineEventHandler(async event =>
  await protectRoute(event, async () =>
    await userService.getUsersList(event), { admin: true }));
