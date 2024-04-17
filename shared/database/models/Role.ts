import { DataTypes, Model } from "sequelize";
import { makeModelOptions } from "../../helpers/makeModelOption"; 
import { sequelize } from "../sequelize";

class Role extends Model {
    public uuid: string;
    public userType: string;
    public name: string;
    public description: string;
    public privileges: Array<string>;
    public isDefault: boolean;
    public createdBy: string;
    public updatedBy: string;

    public readonly createdAt?: Date;
    public readonly updatedAt?: Date;
    public readonly deletedAt?: Date;
}

Role.init(
    {
        uuid: {
            allowNull: false,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4,
            type: DataTypes.UUID,
        },
        name: {
            allowNull: false,
            type: DataTypes.STRING(64),
        },
        description: {
            type: DataTypes.STRING(100),
        },
        privileges: {
            allowNull: false,
            type: DataTypes.JSON,
        },
        userType: {
            allowNull: false,
            type: DataTypes.ENUM("ADMIN", "CUSTOMER"),
        },
        isDefault: {
            defaultValue: false,
            type: DataTypes.BOOLEAN,
        },
        createdBy: {
            type: DataTypes.UUID,
        },
        updatedBy: {
            type: DataTypes.UUID,
        },
    },
    makeModelOptions(sequelize, "Role")
);

export default Role;
