import { PrismaClient } from "@prisma/client";
import seedUsers from "./seeds/user";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱  Seeding database...");

  await seedUsers(prisma);
}

main().then(async () => {
  await prisma.$disconnect();
}).catch(async (e) => {
  console.error(e);
  await prisma.$disconnect();
});
