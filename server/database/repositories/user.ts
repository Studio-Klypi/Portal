import type { PrismaClientKnownRequestError } from "@prisma/client/runtime/binary";
import argon2 from "argon2";
import prisma from "~/server/database";
import type { IBackUser, ICreateUserPayload, IUser } from "~/types/user";
import { ConflictError, NotFoundError, UnauthorizedError } from "~/types/generics/error";

export async function create(payload: ICreateUserPayload): Promise<IUser> {
  try {
    const dbUser = await prisma.user.create({
      data: {
        ...payload,
        password: await argon2.hash(payload.password),
      },
    }) as IBackUser;
    const user = { ...dbUser } as Partial<IBackUser>;
    delete user.password;

    return user as IUser;
  }
  catch (e) {
    switch ((e as PrismaClientKnownRequestError).code) {
      case "P2002":
        throw new ConflictError();
      default:
        throw e;
    }
  }
}

export async function get(uuid: string): Promise<IUser> {
  const dbUser = await prisma.user.findUnique({
    where: {
      uuid,
    },
  });
  if (!dbUser)
    throw new NotFoundError();

  const user = { ...dbUser } as Partial<IBackUser>;
  delete user.password;

  return user as IUser;
}
export async function getBack(email: string): Promise<IBackUser> {
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });
  if (!user)
    throw new NotFoundError();
  return user as IBackUser;
}
export async function getByEmail(email: string): Promise<IUser> {
  const dbUser = await getBack(email);
  const user = { ...dbUser } as Partial<IBackUser>;
  delete user.password;

  return user as IUser;
}
export async function getList(offset: number, limit: number): Promise<IUser[]> {
  const list = await prisma.user.findMany({
    skip: offset,
    take: limit,
    orderBy: {
      createdAt: "asc",
    },
  });
  return list.map((dbUser) => {
    const user = { ...dbUser } as Partial<IBackUser>;
    delete user.password;
    return user as IUser;
  });
}
export async function search(search: string): Promise<IUser[]> {
  const list = await prisma.user.findMany({
    where: {
      OR: [
        {
          firstname: {
            contains: search,
          },
        },
        {
          lastname: {
            contains: search,
          },
        },
        {
          email: {
            contains: search,
          },
        },
      ],
    },
    orderBy: {
      createdAt: "asc",
    },
  });
  return list.map((dbUser) => {
    const user = { ...dbUser } as Partial<IBackUser>;
    delete user.password;
    return user as IUser;
  });
}
export async function count(): Promise<number> {
  return prisma.user.count();
}

export async function verifyPassword(email: string, password: string): Promise<boolean> {
  const user = await getBack(email);
  if (!await argon2.verify(user.password, password))
    throw new UnauthorizedError();
  return true;
}
