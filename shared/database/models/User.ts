import { DataTypes, Model } from "sequelize";
import { makeModelOptions } from "../../helpers/makeModelOption";
import { sequelize } from "../sequelize";

class User extends Model {
    public uuid: string;
    public email: string;
    public phone: string;
    public password: string;
    public firstName: string;
    public lastName: string;
    public type: string;
    public address: string;
    public createdBy: string;
    public updatedBy: string;
    public verifiedOn: Date;
    public readonly createdAt?: Date;
    public readonly updatedAt?: Date;
    public readonly deletedAt?: Date;
}

User.init({
    uuid: {
        allowNull: false,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
        type: DataTypes.UUID,
    },
    email: {
        allowNull: false,
        // unique: true,
        type: DataTypes.STRING(100),
    },
    phone: {
        // unique: true,
        type: DataTypes.STRING(10),
    },
    password: {
        allowNull: true,
        type: DataTypes.STRING(100),
    },
    firstName: {
        allowNull: true,
        type: DataTypes.STRING(64),
    },
    lastName: {
        allowNull: true,
        type: DataTypes.STRING(64),
    },
    address: {
        // unique: true,
        type: DataTypes.STRING,
    },
    type: {
        allowNull: false,
        type: DataTypes.ENUM("ADMIN", "CUSTOMER"),
    },
    createdBy: {
        type: DataTypes.UUID,
    },
    updatedBy: {
        type: DataTypes.UUID,
    }
}, makeModelOptions(sequelize, "Users"));

export default User;
