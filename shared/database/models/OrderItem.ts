import { DataTypes, Model } from "sequelize";
import { sequelize } from "../sequelize";
import { makeModelOptions } from "../../helpers/makeModelOption";

class OrderItem extends Model {
    public uuid: string;
    public total: number;
    public price: number;
    public quantity: number;
    public groceryItemUuid: string;
    public status: string;
    public readonly createdAt?: Date;
    public readonly updatedAt?: Date;
    public readonly deletedAt?: Date;
}

OrderItem.init({
    uuid: {
        allowNull: false,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
        type: DataTypes.UUID,
    },
  price: {
    allowNull: false,
    type: DataTypes.INTEGER
},
  total: {
    allowNull: false,
    type: DataTypes.INTEGER
},
quantity: {
  allowNull: false,
  type: DataTypes.INTEGER
},
status: {
  allowNull: false,
  type: DataTypes.ENUM("PENDING", "IN_TRANSIT", "CANCELLED","REFUND", "DELIVERED", "COMPLETED"),
},
groceryItemUuid: {
  allowNull: false,
  type: DataTypes.UUID,
}

}, makeModelOptions(sequelize, "OrderItem"));

export default OrderItem;
