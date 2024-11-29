import express from "express";
import { getUsers, saveUsers } from "../routes/utils/users";

const router = express.Router();

// Register a new user
router.post("/register", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
     res.status(400).json({ message: "Email and password are required." });
  }

  const users = getUsers();
  if (users.find((user: any) => user.email === email)) {
     res.status(400).json({ message: "User already exists." });
  }

  const newUser = { id: Date.now(), email, password };
  users.push(newUser);
  saveUsers(users);

  res.status(201).json({ message: "User registered successfully.", user: newUser });
});

// Login a user
router.post("/login", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).json({ message: "Email and password are required." });
  }

  const users = getUsers();
  const user = users.find((u: any) => u.email === email && u.password === password);

  if (!user) {
    res.status(401).json({ message: "Invalid email or password." });
  }

  res.json({ message: "Login successful.", user });
});

export default router;
