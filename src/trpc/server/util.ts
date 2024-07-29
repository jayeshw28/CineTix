import { Role } from "@/utils/types";
import { TRPCError } from "@trpc/server";
import { prisma } from "@/db/prisma";

export const getUserRoles = async (id: string): Promise<Role[]> => {
  const [adminExists, managerExists] = await Promise.all([
    prisma?.admin.findUnique({ where: { id } }),
    prisma?.manager.findUnique({ where: { id } }),
  ]);

  const roles: Role[] = [];
  if (adminExists) roles.push("admin");
  if (managerExists) roles.push("manager");

  return roles;
};

export const authorizeUser = async (
  uid: string,
  roles: Role[],
): Promise<void> => {
  if (!roles || roles.length === 0) return; //access is granted if no roles are provided

  const userRoles = await getUserRoles(uid);

  if (!userRoles.some((role) => roles.includes(role))) {
    throw new TRPCError({
      code: "FORBIDDEN",
      message: "User does not have the required role",
    });
  }
};
