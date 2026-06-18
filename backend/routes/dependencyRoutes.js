const express = require("express");

const {
  createDependency,
  getDependencies,
} = require("../controllers/dependencyController");

const router = express.Router();

router.post("/", createDependency);
router.get("/", getDependencies);

module.exports = router;