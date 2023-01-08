import { type FastifyRequest } from "fastify";
import { createPermissions } from "./createPermissions";
import { database } from "./database";

// define the roles and the permissions the role holds
const perms = {
  admin: [
    "user.get",
    "user.list"
  ],
  user: [
    "user.getMyself",
    "user.updateMyself"
  ],
  public: [
    "user.create"
  ]
} as const;

// define a function to get the users role
const getRoleForUser = async (req: FastifyRequest) => {

  const userId = req.headers["x-userid"] as string;
  const user = await database.getUser(userId);

  if (!user) {
    throw new Error(`User does not exist`);
  }

  return user.role;
};

// export out the permission functions
export const { perm } = createPermissions(perms, getRoleForUser);
