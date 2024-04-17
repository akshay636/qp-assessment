import { json, urlencoded } from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import { Application } from "express";
import morgan from "morgan";


// Instantiating the default express application
const app: Application|any = express();

//establising database connection !


// Log Http requests
app.use(morgan("combined"));

// Parse JSON Body
app.use(json({limit: "50mb"}));

// Parse query string and url encoded form
app.use(urlencoded({ limit: "50mb",extended: true }));

// Parse cookie
app.use(cookieParser());

// Add cors related headers
app.use(cors());
/**
 * This is the express application instance with the configurations.
 */
export const expressApp = app;
