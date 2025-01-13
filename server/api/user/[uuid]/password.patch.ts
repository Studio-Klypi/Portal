import { protectRoute } from "~/server/services/protection";
import { updatePassword } from "~/server/services/user";

export default defineEventHandler(async event =>
  await protectRoute(event, async () =>
    updatePassword(event), { admin: true }));
