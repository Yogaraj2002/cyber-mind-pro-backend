import { DataTypes } from "sequelize";
import sequelize from "../db.js";

const Job = sequelize.define("Job", {
  jobTitle: { type: DataTypes.STRING, allowNull: false },
  companyName: { type: DataTypes.STRING, allowNull: false },
  location: { type: DataTypes.STRING, allowNull: false },
  jobType: { type: DataTypes.STRING, allowNull: false },
  salaryMin: { type: DataTypes.INTEGER, allowNull: true },
  salaryMax: { type: DataTypes.INTEGER, allowNull: true },
  description: { type: DataTypes.TEXT, allowNull: true },
  experience: { type: DataTypes.STRING, allowNull: true },
  applicationDeadline: { type: DataTypes.DATE, allowNull: true }
});

export default Job;
