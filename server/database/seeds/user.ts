import type { PrismaClient } from "@prisma/client";

const data = [
  {
    firstname: "Root",
    lastname: "ROOT",
    admin: true,
    email: "root@root.xyz",
    password: "$argon2i$v=19$m=16,t=2,p=1$bXlmdWNraW5na2V5$sMALdny5V3whwCddTsscRQ",
  },
];

export default async function (prisma: PrismaClient) {
  console.log("");

  for (const el of data) {
    await prisma.user.upsert({
      where: {
        email: el.email,
      },
      create: {
        ...el,
      },
      update: {
        ...el,
      },
    });
  }

  console.log("🌱  Users seeded!");
}
