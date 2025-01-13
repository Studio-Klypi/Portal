import { protectRoute } from "~/server/services/protection";
import { updateAdminRole } from "~/server/services/user";

export default defineEventHandler(async event =>
  await protectRoute(event, async () =>
    await updateAdminRole(event), {
    admin: true,
  }));
