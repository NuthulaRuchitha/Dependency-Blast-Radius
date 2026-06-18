const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();
const serviceRoutes = require("./routes/serviceRoutes");
const dependencyRoutes = require("./routes/dependencyRoutes");
const simulationRoutes = require("./routes/simulationRoutes");
const historyRoutes = require("./routes/historyRoutes");

app.use(cors());
app.use(express.json());
app.use("/api/services", serviceRoutes);
app.use("/api/dependencies", dependencyRoutes);
app.use("/api/simulate", simulationRoutes);
app.use("/api/history",historyRoutes);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

app.get("/", (req, res) => {
  res.send("Backend Running");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});