const SimulationHistory = require(
  "../models/SimulationHistory"
);

exports.getHistory = async (req, res) => {
  try {
    const history =
      await SimulationHistory.find()
        .populate(
          "failedServiceId",
          "name"
        )
        .sort({ createdAt: -1 });

    res.json(history);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};