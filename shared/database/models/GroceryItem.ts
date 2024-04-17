import { DataTypes, Model } from "sequelize";
import { sequelize } from "../sequelize";
import { makeModelOptions } from "../../helpers/makeModelOption";

class GroceryItem extends Model {
    public uuid: string;
    public name: string;
    public price: number;
    public quantity: number;
    public description: string;
    public createdBy: string;
    public readonly createdAt?: Date;
    public readonly updatedAt?: Date;
    public readonly deletedAt?: Date;
}

GroceryItem.init({
    uuid: {
        allowNull: false,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
        type: DataTypes.UUID,
    },
    name: {
      allowNull: false,
      type: DataTypes.STRING
  },
  price: {
    allowNull: false,
    type: DataTypes.INTEGER
},
quantity: {
  allowNull: false,
  type: DataTypes.INTEGER
},
description: {
  allowNull: true,
  type: DataTypes.STRING
},
    createdBy: {
        allowNull: false,
        type: DataTypes.UUID,
    }
}, makeModelOptions(sequelize, "GroceryItem"));

export default GroceryItem;
