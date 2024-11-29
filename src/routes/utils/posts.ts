import express, { Request, Response } from "express";
import { getPosts, savePosts } from "../posts";

const router = express.Router();

// Create a new post
router.post("/", (req: Request, res: Response) => {
  const { content, author } = req.body;

  if (!content || !author) {
     res.status(400).json({ message: "Content and author are required." });
  }

  const posts = getPosts();
  const newPost = { id: Date.now(), content, author, likes: 0, comments: [] };
  posts.push(newPost);
  savePosts(posts);

  res.status(201).json({ message: "Post created successfully.", post: newPost });
});

// Like a post
router.post("/:id/like", (req, res) => {
  const postId = parseInt(req.params.id);
  const posts = getPosts();
  const post = posts.find((p: any) => p.id === postId);

  if (!post) {
     res.status(404).json({ message: "Post not found." });
  }

  post.likes += 1;
  savePosts(posts);

  res.json({ message: "Post liked.", post });
});

export default router;
