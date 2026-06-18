const express = require("express");

const {
  simulateFailure,
} = require("../controllers/simulationController");

const router = express.Router();

router.post("/", simulateFailure);

module.exports = router;