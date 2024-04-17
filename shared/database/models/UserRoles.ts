import { DataTypes, Model } from "sequelize";
import { sequelize } from "../sequelize";
import { makeModelOptions } from "../../helpers/makeModelOption";

class UserRoles extends Model {
    public roleUuid: string;
    public userUuid: string;

    public readonly createdAt?: Date;
    public readonly updatedAt?: Date;
    public readonly deletedAt?: Date;
}

UserRoles.init({
    roleUuid: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
    },
    userUuid: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
    }
}, makeModelOptions(sequelize, "UserRoles"));

export default UserRoles;
