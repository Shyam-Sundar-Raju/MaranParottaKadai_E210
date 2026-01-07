const Project = require("../models/Project");

// CREATE PROJECT
exports.createProject = async (req, res) => {
  try {
    const { name, level } = req.body;

    if (!name || !level) {
      return res.status(400).json({ message: "Name and level required" });
    }

    const project = new Project({
      name,
      level,
      userId: req.userId
    });

    await project.save();

    res.status(201).json(project);

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// LIST PROJECTS
exports.getProjects = async (req, res) => {
  try {
    const projects = await Project.find({ userId: req.userId })
      .sort({ createdAt: -1 });

    res.json(projects);

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
