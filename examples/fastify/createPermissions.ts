export const createPermissions = <
  Definitions extends { [key: Readonly<string>]: Readonly<string[]>; },
  GetRoleArgs extends any[],
  GetRoleFn extends (...args: GetRoleArgs) => Promise<keyof Definitions>
>(definitions: Definitions, getRole: GetRoleFn) => {

  type Role = keyof Definitions;
  type Permission = Definitions[Role][number];

  const perm = (key: Permission) => {
    return async (...args: GetRoleArgs) => {
      const role = await getRole(...args);
      const allowed = definitions[role].includes(key);

      if (!allowed) {
        throw new Error("You do not have permission to call this endpoint");
      }

      return {
        role,
        key,
        allowed
      };
    };
  };

  return {
    perm
  };
};
