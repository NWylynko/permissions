export const createDatabase = () => {
  const users = new Map<string, { name: string; role: "admin" | "user" | "public"; }>();

  users.set("123", { name: "nick", role: "admin" });
  users.set("234", { name: "bob", role: "user" });

  return {
    getUser: async (userId: string) => users.get(userId)
  };
};
