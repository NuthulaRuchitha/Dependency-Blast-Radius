const Service = require("../models/Service");
const {
  calculateBlastRadius,
} = require("../services/blastRadiusService");

const SimulationHistory = require(
  "../models/SimulationHistory"
);

const simulateFailure = async (req, res) => {
  try {
    const { failedServiceId } = req.body;

    const {
      impacted,
      parent,
    } = await calculateBlastRadius(
      failedServiceId
    );

    const impactedIds = impacted;

    const impactedServices = await Service.find({
      _id: { $in: impactedIds },
    });

    const allServices = await Service.find();

    const serviceMap = {};

    allServices.forEach((service) => {
      serviceMap[service._id.toString()] =
        service.name;
    });

    const paths = {};

    impactedServices.forEach((service) => {
      const path = [];

      let current = service._id.toString();

      while (current) {
        path.unshift(
          serviceMap[current]
        );

        if (current === failedServiceId) {
          break;
        }

        current = parent[current];
      }

      paths[service.name] = path;
    });

    const impactedCount = impactedServices.length;

    // Severity Score
    const severityScore = impactedCount * 20;

    // Impact Level
    let impactLevel = "LOW";

    if (severityScore >= 40) {
      impactLevel = "HIGH";
    } else if (severityScore >= 20) {
      impactLevel = "MEDIUM";
    }

    await SimulationHistory.create({
      failedServiceId,
      impactedCount,
      severityScore,
      impactLevel,
    });

    res.status(200).json({
      failedServiceId,
      impactedServices,
      impactedCount,
      severityScore,
      impactLevel,
      paths,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  simulateFailure,
};