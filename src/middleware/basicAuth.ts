import { Request, Response, NextFunction } from "express";
import { getUsers } from "../routes/utils/users";

const basicAuth = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: "Authorization header is missing." });
  }

  const [email, password] = Buffer.from(authHeader.split(" ")[1] || "", "base64")
    .toString()
    .split(":");

  if (!email || !password) {
    return res.status(401).json({ message: "Invalid authorization credentials." });
  }

  const users = getUsers();
  const user = users.find((u: any) => u.email === email && u.password === password);

  if (!user) {
    return res.status(401).json({ message: "Invalid email or password." });
  }

  req.userId = user.id; // Attach user ID to the request
  next();
};

export default basicAuth;
