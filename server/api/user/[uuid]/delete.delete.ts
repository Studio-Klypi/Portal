import { protectRoute } from "~/server/services/protection";
import { deleteUser } from "~/server/services/user";

export default defineEventHandler(async event =>
  await protectRoute(event, async () =>
    await deleteUser(event), { admin: true }));
