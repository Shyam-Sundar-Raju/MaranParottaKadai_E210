const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/auth.middleware");
const {
  createProject,
  getProjects
} = require("../controllers/project.controller");

// Protected routes
router.post("/", authMiddleware, createProject);
router.get("/", authMiddleware, getProjects);

module.exports = router;
