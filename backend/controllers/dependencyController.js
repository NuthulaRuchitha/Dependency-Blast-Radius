const Dependency = require("../models/Dependency");

const createsCycle = async (
  sourceService,
  targetService
) => {
  const dependencies = await Dependency.find();

  const graph = {};

  dependencies.forEach((dep) => {
    const source = dep.sourceService.toString();
    const target = dep.targetService.toString();

    if (!graph[source]) {
      graph[source] = [];
    }

    graph[source].push(target);
  });

  const start = targetService;
  const destination = sourceService;

  const visited = new Set();

  const dfs = (node) => {
    if (node === destination) {
      return true;
    }

    visited.add(node);

    const neighbors = graph[node] || [];

    for (const neighbor of neighbors) {
      if (!visited.has(neighbor)) {
        if (dfs(neighbor)) {
          return true;
        }
      }
    }

    return false;
  };

  return dfs(start);
};

const createDependency = async (req, res) => {
  try {
    const {
      sourceService,
      targetService,
    } = req.body;

    const cycleFound =
      await createsCycle(
        sourceService,
        targetService
      );

    if (cycleFound) {
      return res.status(400).json({
        message:
          "Circular dependency detected",
      });
    }

    const dependency =
      await Dependency.create(req.body);

    res.status(201).json(dependency);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getDependencies = async (req, res) => {
  try {
    const dependencies =
      await Dependency.find()
        .populate("sourceService")
        .populate("targetService");

    res.status(200).json(dependencies);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  createDependency,
  getDependencies,
};