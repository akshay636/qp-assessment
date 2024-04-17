import { InitOptions, Sequelize } from "sequelize";

/**
 * Generate default model options from the passed in object.
 * @param sequelize
 * @param tableName
 */
export const makeModelOptions = (sequelize: Sequelize, tableName: string): InitOptions => ({
    charset: "utf8",
    paranoid: true,
    sequelize,
    tableName,
});
