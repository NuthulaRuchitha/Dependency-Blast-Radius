const Service = require("../models/Service");
const Dependency = require("../models/Dependency");

const createService = async (req, res) => {
  try {
    const service = await Service.create(req.body);

    res.status(201).json(service);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getServices = async (req, res) => {
  try {
    const services = await Service.find();

    res.status(200).json(services);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const updateService = async (req, res) => {
  try {
    const service =
      await Service.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );

    res.status(200).json(service);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const deleteService = async (req, res) => {
  try {

    // Delete all dependencies related to this service
    await Dependency.deleteMany({
      $or: [
        { sourceService: req.params.id },
        { targetService: req.params.id },
      ],
    });

    // Delete the service
    await Service.findByIdAndDelete(
      req.params.id
    );

    res.status(200).json({
      message: "Service deleted successfully",
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  createService,
  getServices,
  updateService,
  deleteService,
};