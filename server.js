import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import sequelize from "./db.js";
import jobsRouter from "./routes/jobs.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Allowed origins
const allowedOrigins = [
  "http://localhost:5173", // Local frontend (Vite dev server)
  "https://job-frontend-app.onrender.com" // Render frontend
];

// Middleware
app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    } else {
      return callback(new Error("Not allowed by CORS"));
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

app.use(express.json());

// Routes
app.use("/api/jobs", jobsRouter);

// DB connection
sequelize.sync({ alter: true })
  .then(() => {
    console.log("Database connected & synced");
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => console.error("DB connection failed:", err));
