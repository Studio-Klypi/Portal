import { useScheduler } from "#scheduler";
import * as authRepo from "~/server/database/repositories/auth";

export default defineNitroPlugin(() => {
  const scheduler = useScheduler();

  scheduler.run(async () => {
    await authRepo.prune();
  }).dailyAt(0, 0);
});
