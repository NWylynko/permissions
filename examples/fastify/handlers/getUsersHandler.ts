import { type FastifyRequest } from 'fastify';
import { perm } from "../permissions";

const checkAccess = perm("user.list");

export const getUsersHandler = async (req: FastifyRequest) => {
  await checkAccess(req);

  return {
    hello: "world"
  };
};
