import { DataTypes, Model } from "sequelize";
import { sequelize } from "../sequelize";
import { makeModelOptions } from "../../helpers/makeModelOption";

class Order extends Model {
    public uuid: string;
    public total: number;
    public quantity: number;
    public userUuid: string;
    public status: string;
    public additionalNote: string;
    public readonly createdAt?: Date;
    public readonly updatedAt?: Date;
    public readonly deletedAt?: Date;
}

Order.init({
    uuid: {
        allowNull: false,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
        type: DataTypes.UUID,
    },
  total: {
    allowNull: false,
    type: DataTypes.INTEGER
},
additionalNote: {
  allowNull: true,
  type: DataTypes.STRING
},
quantity: {
  allowNull: false,
  type: DataTypes.INTEGER
},
status: {
  allowNull: false,
  type: DataTypes.ENUM("PENDING", "IN_TRANSIT", "CANCELLED","REFUND", "DELIVERED", "COMPLETED"),
},
userUuid: {
  allowNull: false,
  type: DataTypes.UUID,
},

}, makeModelOptions(sequelize, "Order"));

export default Order;
