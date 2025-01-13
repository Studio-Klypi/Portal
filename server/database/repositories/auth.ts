import prisma from "~/server/database";
import type { ISession } from "~/types/auth";

const expiresIn = 60 * 60 * 1000; // 1h

export async function create(uuid: string): Promise<ISession> {
  return prisma.session.create({
    data: {
      userUuid: uuid,
      expiresAt: new Date(Date.now() + expiresIn),
    },
  });
}

export async function verify(token: string, userUuid: string): Promise<boolean> {
  return !!await prisma.session.findUnique({
    where: {
      token_userUuid: {
        token,
        userUuid,
      },
      expiresAt: {
        gt: new Date(),
      },
      revokedAt: null,
    },
  });
}

export async function prune() {
  await prisma.session.deleteMany({
    where: {
      OR: [
        {
          NOT: {
            revokedAt: null,
          },
        },
        {
          expiresAt: {
            lte: new Date(),
          },
        },
      ],
    },
  });
}
