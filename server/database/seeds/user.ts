import type { PrismaClient } from "@prisma/client";

const data = [
  {
    firstname: "Root",
    lastname: "ROOT",
    admin: true,
    email: "root@root.xyz",
    password: "$argon2id$v=19$m=65536,t=3,p=4$QJRHh3MXRqIq2IXXHWw8CQ$iBdIiJGWCTMp2E+CzaPnH6Nui3Mt6X91MafToKmfKig",
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
