const Dependency = require("../models/Dependency");

const calculateBlastRadius = async (
  failedServiceId
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

  const impacted = [];

  const visited = new Set();

  const queue = [failedServiceId];

  visited.add(failedServiceId);

  while (queue.length > 0) {
    const current = queue.shift();

    const neighbors = graph[current] || [];

    for (const neighbor of neighbors) {
      if (!visited.has(neighbor)) {
        visited.add(neighbor);

        impacted.push(neighbor);

        queue.push(neighbor);
      }
    }
  }

  return impacted;
};

module.exports = {
  calculateBlastRadius,
};