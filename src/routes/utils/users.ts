import fs from "fs";
import path from "path";

const usersFilePath = path.resolve(__dirname, "../../data/users.json");

export const getUsers = (): any[] => {
  if (!fs.existsSync(usersFilePath)) {
    return [];
  }
  const data = fs.readFileSync(usersFilePath, "utf8");
  return JSON.parse(data);
};

export const saveUsers = (users: any[]) => {
  fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2), "utf8");
};
