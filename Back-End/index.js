require("dotenv").config({ path: "./config.env" });
const express = require("express");
const connectDB = require("./config/db");
const errorHandler = require("./middleware/error");
const ApplicationRoutes = require("./routes/applicationRoutes");
const BasicInformationsRoutes = require("./routes/basicInformationsRoutes");
const MenuRoutes = require("./routes/menuRoutes");
const MaintenanceRoutes = require("./routes/maintenanceRoutes");
const cors = require("cors");
// express app
const app = express();

// Configure CORS
app.use(cors());

// Connect DB
connectDB();

// Middleware
app.use(express.json());

app.use("/api/basicInfo", BasicInformationsRoutes);
app.use("/api/menu", MenuRoutes);
app.use("/api/maintenance", MaintenanceRoutes);
app.use("/api/application", ApplicationRoutes);

// Port
const PORT = 8000 ||  process.env.PORT;

const server = app.listen(PORT , () =>
  console.log(`Server running on port ${PORT}`)
);
