// server.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import sequelize from "./db.js";
import jobsRouter from "./routes/jobs.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// CORS
const allowedOrigins = [
  "https://job-frontend-app.onrender.com",
  "http://localhost:5173",
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) return callback(null, true);
      return callback(new Error("Not allowed by CORS"));
    },
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(express.json());

// Routes
app.use("/api/jobs", jobsRouter);

// Connect to DB and start server
sequelize
  .authenticate()
  .then(() => {
    console.log("Database connected successfully!");
    return sequelize.sync({ alter: true });
  })
  .then(() => {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => {
    console.error("Failed to connect to database:", err);
    process.exit(1);
  });
