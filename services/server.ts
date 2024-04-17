/**
 * This will be the starting point of the application.
 */
import app from ".";
import { sequelize } from "../shared/database/sequelize";
import { logger } from "../shared/lib/logger";
import appRoutes from "./api";
// Instantiating the port variable from env if available else 3000
const PORT = process.env.PORT || 8080;
// If sync option is true then synchronizing the database with the models
if (process.env.SYNC === "true") {
  sequelize.sync();
}
// Initializing the Application Routes
appRoutes(app);

// Adding listener to the app
app.listen(PORT, () => logger.info(`listening on port. ${PORT}!`));

