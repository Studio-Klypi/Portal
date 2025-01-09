import { protectRoute } from "~/server/services/protection";
import { whoAmI } from "~/server/services/user";

export default defineEventHandler(async event =>
  await protectRoute(event, async uuid =>
    await whoAmI(event, uuid)));
