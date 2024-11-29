import express from "express";
import bodyParser from "body-parser";
import authRoutes from "./routes/auth";
import postRoutes from "../src/routes/utils/posts";

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.json());

// Routes
app.use("/auth", authRoutes);
app.use("/posts", postRoutes);

// Default Route
app.get("/", (req, res) => {
  res.send("Welcome to the Social Media API!");
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
