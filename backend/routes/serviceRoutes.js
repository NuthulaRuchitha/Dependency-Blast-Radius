const express = require("express");

const {
  createService,
  getServices,
  updateService,
  deleteService,
  toggleStatus,
} = require("../controllers/serviceController");

const router = express.Router();

router.post("/", createService);

router.get("/", getServices);

router.put("/:id", updateService);

router.patch("/:id/status", toggleStatus);

router.delete("/:id", deleteService);

module.exports = router;