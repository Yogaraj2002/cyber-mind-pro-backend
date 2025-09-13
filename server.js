import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import sequelize from "./db.js";
import jobsRouter from "./routes/jobs.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/jobs", jobsRouter);


sequelize.sync({ alter: true })
  .then(() => {
    console.log("Database connected & synced");
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => console.error("DB connection failed:", err));
