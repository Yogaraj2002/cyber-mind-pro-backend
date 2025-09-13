import { DataTypes } from "sequelize";
import sequelize from "../db.js";

const Job = sequelize.define("Job", {
  jobTitle: { type: DataTypes.STRING, allowNull: false },
  companyName: { type: DataTypes.STRING, allowNull: false },
  location: { type: DataTypes.STRING, allowNull: false },
  jobType: { type: DataTypes.STRING, allowNull: false },
  salaryMin: { type: DataTypes.INTEGER },
  salaryMax: { type: DataTypes.INTEGER },
  description: { type: DataTypes.TEXT },
  experience: { type: DataTypes.STRING },
  applicationDeadline: { type: DataTypes.DATE }
});

export default Job;
