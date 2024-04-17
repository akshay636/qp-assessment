import { Options, Sequelize, PoolOptions } from "sequelize";
import { logger } from "../lib/logger";
import mysql2 from "mysql2";
interface PoolParams extends PoolOptions {
  handleDisconnects: boolean;
}

interface PoolParams extends PoolOptions {
  handleDisconnects: boolean;
}

interface OptionsParams extends Options {
  port: number | any;
}
const poolOption: PoolParams = {
  max: 40,
  min: 0,
  acquire: 100000,
  idle: 10000,
  evict: 20000,
  handleDisconnects: true,
};
// Options for the database connection
const options: OptionsParams = {
  database:
    process.env.SERVER_ENV
      ? process.env.DEV_DATABASE
      : process.env.PROD_DATABASE,
  dialect: "mysql",
  port: process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,

  timezone: "+05:30",
  pool: poolOption,


  retry: {
    max: 3, 
  },
};
if (options.dialect === "mysql") {
  options.dialectModule = mysql2;
}
new Sequelize(options);
export const sequelize = new Sequelize(
  process.env.DB_DATABASE,
  process.env.DB_USERNAME,
  process.env.DB_PASSWORD,
  options
);

sequelize
  .authenticate()
  .then(() => {
    logger.info("Connection has been established successfully.");
  })
  .catch((error) => {
    logger.error("Unable to connect to the database: ", error);
  });
