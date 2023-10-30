// config/database.js
import {Sequelize} from "sequelize"
import dotenv from "dotenv";
dotenv.config();


const sequelize = new Sequelize({
  dialect: 'postgres',
  host: 'localhost',
  username: 'postgres',
  password: 'Gautam@12',
  database: 'practise_sql'
});

export default sequelize
