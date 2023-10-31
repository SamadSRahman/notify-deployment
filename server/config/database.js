// config/database.js
import {Sequelize} from "sequelize"
import dotenv from "dotenv";
dotenv.config();


const sequelize = new Sequelize({
  dialect: "postgres" || process.env.Dialect,
  host: "localhost" || process.env.Host,
  username: "postgres" ||  process.env.User,
  password: "Gautam@12" || process.env.Password,
  database: "practise_sql" || process.env.Database
});

export default sequelize
