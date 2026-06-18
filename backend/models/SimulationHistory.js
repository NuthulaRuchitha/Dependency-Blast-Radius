const mongoose = require("mongoose");

const simulationHistorySchema = new mongoose.Schema(
  {
    failedServiceId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Service",
      required: true,
    },
    impactedCount: Number,
    severityScore: Number,
    impactLevel: String,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "SimulationHistory",
  simulationHistorySchema
);