const mongoose = require("mongoose");

const dependencySchema = new mongoose.Schema(
  {
    sourceService: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Service",
      required: true,
    },
    targetService: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Service",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "Dependency",
  dependencySchema
);